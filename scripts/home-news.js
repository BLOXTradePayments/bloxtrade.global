import { supabase } from './supabase-config.js';

const homeNewsGrid = document.getElementById('home-news-grid');

async function loadHomeNews() {
  if (!homeNewsGrid) return;

  try {
    const { data: articles, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) throw error;

    if (!articles || articles.length === 0) {
      homeNewsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--color-text-secondary); padding: 4rem;">Nenhum artigo publicado ainda.</p>';
      return;
    }

    homeNewsGrid.innerHTML = ''; // Clear existing content

    let currentLang = 'pt';
    try {
      currentLang = localStorage.getItem('bloxtrade_lang') || 'pt';
    } catch (e) {
      console.warn("localStorage is not available, defaulting to 'pt'", e);
    }

    articles.forEach((article, index) => {
      const title = article.title[currentLang] || article.title['en'] || article.title['pt'] || article.title['es'] || '';
      
      const card = document.createElement('a');
      card.href = `artigo.html?id=${article.id}`;
      // Re-apply the styles and classes from the original index.html
      const delayClass = index > 0 ? `delay-${index * 100}` : '';
      card.className = `reveal-scale bento-card ${delayClass}`;
      card.style.padding = '0';
      card.style.overflow = 'hidden';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.textDecoration = 'none';

      const readMoreText = currentLang === 'pt' ? 'Ler mais &rarr;' : (currentLang === 'es' ? 'Leer más &rarr;' : 'Read more &rarr;');
      const imageUrl = article.image_url || './assets/images/blog/blog-01.webp';

      card.innerHTML = `
        <img src="${imageUrl}" alt="${title}" style="width: 100%; height: 200px; object-fit: cover; ${index === 2 ? 'object-position: center top;' : ''}" onerror="this.src='./assets/images/blog/blog-01.webp'">
        <div style="padding: 1.5rem; flex: 1; display: flex; flex-direction: column;">
          <h3 class="h4" style="margin-bottom: auto; line-height: 1.1; font-family: var(--font-family-heading); text-transform: uppercase;">${title}</h3>
          <span style="display:inline-block; margin-top:1.5rem; font-weight:500; font-size:0.875rem; color: var(--color-accent-hover);">${readMoreText}</span>
        </div>
      `;

      // add in-view class just in case the reveal script missed it
      try { card.classList.add('in-view'); } catch(e){}

      homeNewsGrid.appendChild(card);
    });

  } catch (error) {
    console.error("Error fetching home news:", error);
    homeNewsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: red; padding: 4rem;">Erro ao carregar publicações.</p>';
  }
}

// Listen to language changes
document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
  btn.addEventListener('click', () => {
    setTimeout(() => {
      loadHomeNews();
    }, 50);
  });
});

// Load news when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadHomeNews);
} else {
  loadHomeNews();
}
