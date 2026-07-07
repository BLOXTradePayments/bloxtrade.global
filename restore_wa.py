import os

with open('styles/main.css', 'r', encoding='utf-8') as f:
    content = f.read()

old_str = """    display: none !important; /* Temporarily hidden until number is provided. Remove this and use flex to show. */
    /* display: flex; */"""
new_str = """    display: flex;
    justify-content: center;
    align-items: center;"""

content = content.replace(old_str, new_str)

with open('styles/main.css', 'w', encoding='utf-8') as f:
    f.write(content)

print("Restored WhatsApp button visibility")
