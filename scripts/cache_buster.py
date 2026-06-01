import glob
import re

files = glob.glob(r'd:\BLOXTRADE - SITE\SITE BLOXTRADE\*.html')

count = 0
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()

    # Replace <link rel="stylesheet" href="./styles/main.css"> with <link rel="stylesheet" href="./styles/main.css?v=2">
    if 'href="./styles/main.css"' in content:
        new_content = content.replace('href="./styles/main.css"', 'href="./styles/main.css?v=2"')
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        count += 1
        print(f'Updated CSS cache buster: {f}')
    elif 'href="./styles/main.css?v=' in content:
        new_content = re.sub(r'href="\./styles/main\.css\?v=\d+"', 'href="./styles/main.css?v=3"', content)
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        count += 1
        print(f'Updated CSS cache buster: {f}')

print(f'Total files updated: {count}')
