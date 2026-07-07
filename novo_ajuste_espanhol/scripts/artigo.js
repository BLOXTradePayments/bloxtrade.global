import { supabase } from './supabase-config.js';

// Get article ID from URL query string
const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

const titleEl = document.getElementById('article-title');
const contentEl = document.getElementById('article-content');
const themeEl = document.getElementById('article-theme');
const dateEl = document.getElementById('article-date');
const authorEl = document.getElementById('article-author');
const coverImgEl = document.getElementById('article-cover-img');

// Store data globally to handle translation changes
let currentArticleData = null;

function renderArticle(article) {
  let currentLang = 'pt';
  try {
    currentLang = localStorage.getItem('bloxtrade_lang') || 'pt';
  } catch (e) {
    console.warn("localStorage is not available, defaulting to 'pt'", e);
  }

  // Select title and content based on language, fallback to pt then en then es if they don't exist
  const title = article.title[currentLang] || article.title['pt'] || article.title['en'] || article.title['es'] || '';
  const content = article.content[currentLang] || article.content['pt'] || article.content['en'] || article.content['es'] || '';

  if (titleEl) titleEl.innerText = title;
  
  if (contentEl) {
    if (content.includes('<p>') || content.includes('<h2>') || content.includes('<blockquote>')) {
      contentEl.innerHTML = content;
    } else {
      // Split by double newline to form paragraphs
      contentEl.innerHTML = content
        .split('\n\n')
        .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
        .join('');
    }
  }
  
  if (themeEl) themeEl.innerText = article.category || 'News';
  if (authorEl) {
    let authorPrefix = 'By';
    let authorDefault = 'BLOXtrade Team';
    if (currentLang === 'pt') {
      authorPrefix = 'Por';
      authorDefault = 'Equipe BLOXtrade';
    } else if (currentLang === 'es') {
      authorPrefix = 'Por';
      authorDefault = 'Equipo BLOXtrade';
    }
    authorEl.innerText = article.author 
      ? `${authorPrefix} ${article.author}` 
      : authorDefault;
  }
  if (coverImgEl) {
    coverImgEl.src = article.image_url || 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop';
    coverImgEl.alt = title;
  }

  if (dateEl && article.created_at) {
    const date = new Date(article.created_at);
    dateEl.innerText = date.toLocaleDateString(currentLang === 'pt' ? 'pt-BR' : (currentLang === 'es' ? 'es-ES' : 'en-US'), {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  // Atualiza os links de compartilhamento com o título e URL atualizados do artigo
  setupSharing();
}

async function loadArticle() {
  if (!articleId) {
    // If no article ID, redirect to news page
    window.location.href = 'news.html';
    return;
  }

  try {
    if (!supabase) {
      throw new Error("Cliente Supabase não inicializado.");
    }

    const { data: article, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', articleId)
      .single();

    if (error || !article) {
      console.error("Artigo não encontrado:", error);
      if (contentEl) contentEl.innerHTML = '<p style="color: red; text-align: center; padding: 4rem;">Artigo não encontrado.</p>';
      return;
    }

    currentArticleData = article;
    renderArticle(article);

  } catch (err) {
    console.error("Erro ao buscar artigo:", err);
    if (contentEl) contentEl.innerHTML = '<p style="color: red; text-align: center; padding: 4rem;">Erro ao carregar o artigo.</p>';
  }
}

// Listen to language changes from i18n switcher
document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
  btn.addEventListener('click', () => {
    // Wait a brief moment to allow i18n.js to update the localStorage
    setTimeout(() => {
      if (currentArticleData) {
        renderArticle(currentArticleData);
      }
    }, 50);
  });
});

// Setup sharing functionality
function setupSharing() {
  const linkedinBtn = document.querySelector('.share-btn[aria-label="LinkedIn"]');
  const twitterBtn = document.querySelector('.share-btn[aria-label="X/Twitter"]');
  
  const currentUrl = encodeURIComponent(window.location.href);
  const currentTitle = encodeURIComponent(titleEl ? titleEl.innerText : document.title);
  
  if (linkedinBtn) {
    linkedinBtn.style.cursor = 'pointer';
    linkedinBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
  }
  
  if (twitterBtn) {
    twitterBtn.style.cursor = 'pointer';
    twitterBtn.href = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${currentTitle}`;
  }
}

// Initial load
function init() {
  loadArticle();
  setupSharing();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
