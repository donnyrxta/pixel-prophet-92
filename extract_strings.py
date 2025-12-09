import zipfile
import xml.etree.ElementTree as ET
import re
import os

excel_path = r"C:\Users\Dee\Documents\pixel-prophet-92-2 - Copy\uploads\SoHo-Connect-Revenue-Calculator.xlsx"
word_path = r"C:\Users\Dee\Documents\pixel-prophet-92-2 - Copy\uploads\SoHo-Connect-WiFi-Audit-Template.docx"

def clean_tag(tag):
    return re.sub(r'\{.*\}', '', tag)

print("START_OF_OUTPUT")

print("\n=== WORD CONTENT ===")
try:
    if os.path.exists(word_path):
        with zipfile.ZipFile(word_path) as z:
            xml_content = z.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            paragraphs = []
            for p in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
                texts = [node.text for node in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text]
                if texts:
                    paragraphs.append("".join(texts))
            
            for i, text in enumerate(paragraphs):
                print(f"P{i}: {text}")
    else:
        print("Word file missing")
except Exception as e:
    print(f"Error Word: {e}")

print("\n=== EXCEL LABELS ===")
try:
    if os.path.exists(excel_path):
        with zipfile.ZipFile(excel_path) as z:
            # Shared Strings
            shared_strings = []
            if 'xl/sharedStrings.xml' in z.namelist():
                xml_content = z.read('xl/sharedStrings.xml')
                tree = ET.fromstring(xml_content)
                for si in tree.findall('{*}si'):
                    # simple extraction
                    t = si.find('{*}t')
                    if t is not None:
                        shared_strings.append(t.text)
                    else:
                        parts = [x.text for x in si.iter() if clean_tag(x.tag)=='t' and x.text]
                        shared_strings.append("".join(parts))
            
            # Sheets
            workbook_xml = z.read('xl/workbook.xml')
            wb_tree = ET.fromstring(workbook_xml)
            sheets = []
            for sheet in wb_tree.findall('.//{*}sheet'):
                sheets.append((sheet.attrib.get('name'), sheet.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')))
            
            # Find sheet XML paths from rels if needed, or guess
            # simple guess: xl/worksheets/sheetX.xml
            
            for i, (name, rid) in enumerate(sheets):
                print(f"\n--- Sheet: {name} ---")
                sheet_path = f'xl/worksheets/sheet{i+1}.xml'
                if sheet_path in z.namelist():
                    sheet_xml = z.read(sheet_path)
                    sheet_tree = ET.fromstring(sheet_xml)
                    
                    # Store cells in a dict for sorting? or just print
                    cells_found = []
                    for row in sheet_tree.findall('.//{*}row'):
                        for c in row.findall('{*}c'):
                            ref = c.attrib.get('r')
                            t = c.attrib.get('t')
                            v_node = c.find('{*}v')
                            val = v_node.text if v_node is not None else ""
                            
                            text_display = ""
                            if t == 's' and val:
                                try:
                                    text_display = shared_strings[int(val)]
                                except:
                                    text_display = f"STR#{val}"
                            elif t == 'str':
                                text_display = val
                            elif val:
                                text_display = f"NUM:{val}"
                            
                            if text_display:
                                cells_found.append(f"{ref}: {text_display}")
                    
                    for c in cells_found:
                        print(c)
    else:
        print("Excel file missing")
except Exception as e:
    print(f"Error Excel: {e}")
