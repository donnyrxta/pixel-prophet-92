import zipfile
import xml.etree.ElementTree as ET
import re
import os

excel_path = r"C:\Users\Dee\Documents\pixel-prophet-92-2 - Copy\uploads\SoHo-Connect-Revenue-Calculator.xlsx"
word_path = r"C:\Users\Dee\Documents\pixel-prophet-92-2 - Copy\uploads\SoHo-Connect-WiFi-Audit-Template.docx"

def clean_tag(tag):
    return re.sub(r'\{.*\}', '', tag)

print("=== WORD ANALYSIS (Native) ===")
try:
    if not os.path.exists(word_path):
        print(f"File not found: {word_path}")
    else:
        with zipfile.ZipFile(word_path) as z:
            xml_content = z.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            
            # recursive text extraction
            text_parts = []
            for elem in tree.iter():
                if clean_tag(elem.tag) == 't':
                    if elem.text:
                        text_parts.append(elem.text)
                elif clean_tag(elem.tag) == 'p':
                    text_parts.append('\n')
                elif clean_tag(elem.tag) == 'tab':
                    text_parts.append('\t')
            
            full_text = "".join(text_parts)
            print(full_text)

except Exception as e:
    print(f"Error reading Word: {e}")

print("\n=== EXCEL ANALYSIS (Native) ===")
try:
    if not os.path.exists(excel_path):
        print(f"File not found: {excel_path}")
    else:
        with zipfile.ZipFile(excel_path) as z:
            # Get shared strings
            shared_strings = []
            if 'xl/sharedStrings.xml' in z.namelist():
                xml_content = z.read('xl/sharedStrings.xml')
                tree = ET.fromstring(xml_content)
                for si in tree.findall('{*}si'):
                    t = si.find('{*}t')
                    if t is not None:
                        shared_strings.append(t.text)
                    else:
                        # Sometimes text is in r/t runs
                        parts = []
                        for t_tag in si.iter(): 
                            if clean_tag(t_tag.tag) == 't' and t_tag.text:
                                parts.append(t_tag.text)
                        shared_strings.append("".join(parts))
            
            print(f"Found {len(shared_strings)} shared strings.")
            
            # List sheets
            workbook_xml = z.read('xl/workbook.xml')
            wb_tree = ET.fromstring(workbook_xml)
            sheets = []
            for sheet in wb_tree.findall('.//{*}sheet'):
                sheets.append((sheet.attrib.get('name'), sheet.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')))
            
            print(f"Sheets: {sheets}")
            
            # We assume sheet1 is rId1 which maps to xl/worksheets/sheet1.xml usually, but need rels
            # For simplicity, just trying xl/worksheets/sheet1.xml, sheet2.xml etc
            
            for i in range(1, len(sheets) + 2):
                sheet_path = f'xl/worksheets/sheet{i}.xml'
                if sheet_path in z.namelist():
                    print(f"\n--- Reading {sheet_path} ---")
                    sheet_xml = z.read(sheet_path)
                    sheet_tree = ET.fromstring(sheet_xml)
                    
                    rows = []
                    for row in sheet_tree.findall('.//{*}row'):
                        row_data = []
                        r_idx = row.attrib.get('r')
                        for c in row.findall('{*}c'):
                            cell_ref = c.attrib.get('r')
                            t_type = c.attrib.get('t')
                            
                            val = ""
                            v_tag = c.find('{*}v')
                            f_tag = c.find('{*}f')
                            
                            if v_tag is not None and v_tag.text:
                                val = v_tag.text
                                if t_type == 's': # shared string
                                    try:
                                        val = shared_strings[int(val)]
                                    except:
                                        val = f"STR#{val}"
                            
                            formula = ""
                            if f_tag is not None:
                                formula = f" [FORMULA: ={f_tag.text}]"
                                if f_tag.text is None:
                                     # sometimes shared formula
                                     formula = " [SHARED_FORMULA]"
                            
                            row_data.append(f"{cell_ref}: {val}{formula}")
                        rows.append(" | ".join(row_data))
                    
                    # Print first 50 lines
                    for r in rows[:50]:
                        print(r)

except Exception as e:
    print(f"Error reading Excel: {e}")
