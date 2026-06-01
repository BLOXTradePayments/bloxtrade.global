import { supabase } from './supabase-config.js';

const newsGrid = document.getElementById('news-grid-container');
let cachedArticles = null;

function renderArticles(articles) {
  if (!newsGrid) return;
  newsGrid.innerHTML = ''; // Clear existing content

  if (!articles || articles.length === 0) {
    newsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--color-text-secondary); padding: 4rem;">Nenhum artigo publicado ainda.</p>';
    return;
  }

  // Determine current language from localStorage or default to 'pt'
  let currentLang = 'pt';
  try {
    currentLang = localStorage.getItem('bloxtrade_lang') || 'pt';
  } catch (e) {
    console.warn("localStorage is not available, defaulting to 'pt'", e);
  }

  articles.forEach((article) => {
    // Select title and content based on language, fallback to pt if en doesn't exist
    const title = article.title[currentLang] || article.title['pt'] || '';
    const content = article.content[currentLang] || article.content['pt'] || '';
    
    // Create a short excerpt (approx 100 characters)
    const excerpt = content.length > 100 ? content.substring(0, 100) + '...' : content;
    
    // Format date
    let dateString = '';
    if (article.created_at) {
      const date = new Date(article.created_at);
      dateString = date.toLocaleDateString(currentLang === 'pt' ? 'pt-BR' : 'en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    }

    // Card HTML
    const card = document.createElement('a');
    card.href = `artigo.html?id=${article.id}`;
    card.className = 'news-card reveal-scale';
    
    card.innerHTML = `
      <div class="news-badge">${article.category || 'News'}</div>
      <div class="news-img-wrapper">
        <img src="${article.image_url || 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop'}" alt="${title}">
      </div>
      <div class="news-content">
        <div class="news-date">${dateString}</div>
        <h3 class="news-title">${title}</h3>
        <p class="news-excerpt">${excerpt}</p>
        <div class="news-read-more">${currentLang === 'pt' ? 'Ler mais &rarr;' : 'Read more &rarr;'}</div>
      </div>
    `;
    
    newsGrid.appendChild(card);
  });
}

async function loadNews() {
  if (!newsGrid) return;

  try {
    const { data: articles, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    cachedArticles = articles;
    renderArticles(articles);

  } catch (error) {
    console.error("Error fetching articles:", error);
    newsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: red; padding: 4rem;">Erro ao carregar publicações.</p>';
  }
}

// Listen to language changes from i18n switcher
document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
  btn.addEventListener('click', () => {
    // Wait a brief moment to allow i18n.js to update the localStorage
    setTimeout(() => {
      if (cachedArticles) {
        renderArticles(cachedArticles);
      }
    }, 50);
  });
});

// Load news when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadNews();
});

