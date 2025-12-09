import zipfile
import xml.etree.ElementTree as ET
import re

excel_path = r"C:\Users\Dee\Documents\pixel-prophet-92-2 - Copy\uploads\SoHo-Connect-Revenue-Calculator.xlsx"

def clean_tag(tag):
    return re.sub(r'\{.*\}', '', tag)

try:
    with zipfile.ZipFile(excel_path) as z:
        if 'xl/sharedStrings.xml' in z.namelist():
            xml_content = z.read('xl/sharedStrings.xml')
            tree = ET.fromstring(xml_content)
            print("Shared Strings:")
            for i, si in enumerate(tree.findall('{*}si')):
                texts = []
                for t in si.iter():
                    if clean_tag(t.tag) == 't' and t.text:
                        texts.append(t.text)
                print(f"{i}: {''.join(texts)}")
        else:
            print("No sharedStrings.xml found. Checking for inline strings in Sheet1...")
            
        # Check Sheet 1 for inlineStr
        if 'xl/worksheets/sheet1.xml' in z.namelist():
             content = z.read('xl/worksheets/sheet1.xml')
             root = ET.fromstring(content)
             print("\nSheet1 cell values:")
             for c in root.findall('.//{*}c'):
                 t = c.attrib.get('t')
                 r = c.attrib.get('r')
                 if t == 'inlineStr':
                     is_node = c.find('{*}is')
                     if is_node:
                         t_node = is_node.find('{*}t')
                         if t_node is not None and t_node.text:
                             print(f"{r}: {t_node.text}")

except Exception as e:
    print(e)
