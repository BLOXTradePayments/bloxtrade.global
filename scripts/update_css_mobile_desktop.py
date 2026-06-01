import os

css_path = r"d:\BLOXTRADE - SITE\SITE BLOXTRADE\styles\main.css"

with open(css_path, "r", encoding="utf-8") as f:
    content = f.read()

import re

# We will replace the .footer-nav-grid rules and media queries
# The previous rules were:
# .footer-nav-grid { ... }
# @media (min-width: 768px) { .footer-nav-grid { ... } }
# @media (min-width: 1024px) { .footer-nav-grid { ... } }

# We will inject the new ones where the old .footer-nav-grid starts

replacement = """
.footer-nav-desktop {
  display: none;
}

.footer-nav-mobile {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  width: 100%;
}

@media (min-width: 1024px) {
  .footer-nav-desktop {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2.5rem;
    width: 70%;
  }
  .footer-nav-mobile {
    display: none;
  }
}
"""

new_content = re.sub(
    r'\.footer-nav-grid\s*\{.*?\}\s*@media\s*\(min-width:\s*768px\)\s*\{\s*\.footer-nav-grid\s*\{.*?\}\s*\}\s*@media\s*\(min-width:\s*1024px\)\s*\{\s*\.footer-nav-grid\s*\{.*?\}\s*\}', 
    replacement, 
    content, 
    flags=re.DOTALL
)

with open(css_path, "w", encoding="utf-8") as f:
    f.write(new_content)
    
print("CSS updated with new mobile/desktop split.")
