import os

css_path = r'd:\BLOXTRADE - SITE\SITE BLOXTRADE\styles\main.css'

with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I want to add .footer-bottom and .footer-brand-row styles right before the responsive overrides
new_css = """
/* Footer Brand Row */
.footer-brand-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
}
.footer-brand-row .logo {
  margin-bottom: 0;
}
.footer-brand-row .social-links {
  margin-top: 0;
}

/* Footer Bottom Bar */
.footer-bottom {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 2.5rem;
  padding-bottom: 3rem;
  border-top: 1px solid var(--color-border-inverse);
  margin-bottom: 3rem;
}

@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.footer-copyright {
  font-size: 0.875rem;
  color: var(--color-text-inverse-muted);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.footer-bottom-links {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.footer-bottom-links a {
  font-size: 0.875rem;
  color: var(--color-text-inverse-muted);
  text-transform: uppercase;
  letter-spacing: 0.02em;
  transition: color var(--transition-fast);
}

.footer-bottom-links a:hover {
  color: #fff;
}
"""

if '.footer-bottom {' not in content:
    content = content.replace('/* Responsive Overrides */', new_css + '\\n/* Responsive Overrides */')
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Added new CSS for footer.")
else:
    print("CSS already exists.")
