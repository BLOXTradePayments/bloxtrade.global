import os

css_path = r"d:\BLOXTRADE - SITE\SITE BLOXTRADE\styles\main.css"

with open(css_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if "/* Footer */" in line:
        start_idx = i
    if "/* Responsive Overrides */" in line:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    new_css = """/* Footer - Premium Layout */
.footer {
  background: var(--color-bg-dark);
  color: var(--color-text-inverse);
  padding: 6rem 0 3rem;
}

.footer-top {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 4rem;
}

@media (min-width: 1024px) {
  .footer-top {
    flex-direction: row;
    justify-content: space-between;
    gap: 6rem;
  }
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 300px;
}

.footer-brand .logo {
  display: block;
  color: var(--color-text-inverse);
}

.social-links {
  display: flex;
  gap: 0.75rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text-inverse-muted);
  transition: all var(--transition-fast);
}

.social-link:hover {
  background: var(--color-accent);
  color: var(--color-bg-primary);
  transform: translateY(-2px);
}

.social-link svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.footer-nav-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
  width: 100%;
}

@media (min-width: 768px) {
  .footer-nav-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer-nav-grid {
    width: 70%;
  }
}

.footer-col-title {
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #61b12f; /* Olive Green from brand palette */
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-links a {
  color: #ffffff; /* White links for better contrast */
  font-size: 0.9375rem;
  font-weight: 500;
  transition: color var(--transition-fast), transform var(--transition-fast);
  display: inline-block;
  text-decoration: none;
}

.footer-links a:hover {
  color: #fff;
  transform: translateX(4px);
}

.footer-disclaimer {
  font-size: 0.75rem;
  color: var(--color-text-inverse-muted);
  line-height: 1.6;
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--color-border-inverse);
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
  }
}

.footer-copyright {
  font-size: 0.75rem;
  color: var(--color-text-inverse-muted);
}

.footer-legal-links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-legal-links a {
  color: var(--color-text-inverse-muted);
  transition: color var(--transition-fast);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: none;
}

.footer-legal-links a:hover {
  color: #fff;
}

"""
    new_lines = lines[:start_idx] + [new_css] + lines[end_idx:]
    with open(css_path, "w", encoding="utf-8") as f:
        f.writelines(new_lines)
    print("CSS replaced successfully!")
else:
    print(f"Indices not found. Start: {start_idx}, End: {end_idx}")
