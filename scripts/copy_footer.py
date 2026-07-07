import re

with open('careers.html', 'r', encoding='utf-8') as f:
    content = f.read()
    # Match <footer class="footer"> ... </footer>
    footer = re.search(r'(    <footer class="footer">.*?</footer>)', content, re.DOTALL).group(1)

with open('privacy-policy.html', 'r', encoding='utf-8') as f:
    privacy_content = f.read()
    # If the file has a footer, replace it
    new_privacy_content = re.sub(r' *<footer class="footer">.*?</footer>', footer, privacy_content, flags=re.DOTALL)

with open('privacy-policy.html', 'w', encoding='utf-8') as f:
    f.write(new_privacy_content)
    print("Done copying footer to privacy-policy.html")
