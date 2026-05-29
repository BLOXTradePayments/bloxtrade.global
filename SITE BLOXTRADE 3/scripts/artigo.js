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

  // Select title and content based on language, fallback to pt if en doesn't exist
  const title = article.title[currentLang] || article.title['pt'] || '';
  const content = article.content[currentLang] || article.content['pt'] || '';

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
    const isPt = currentLang === 'pt';
    authorEl.innerText = article.author 
      ? (isPt ? `Por ${article.author}` : `By ${article.author}`) 
      : (isPt ? 'Por Equipe BLOXtrade' : 'By BLOXtrade Team');
  }
  if (coverImgEl) {
    coverImgEl.src = article.image_url || 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop';
    coverImgEl.alt = title;
  }

  if (dateEl && article.created_at) {
    const date = new Date(article.created_at);
    dateEl.innerText = date.toLocaleDateString(currentLang === 'pt' ? 'pt-BR' : 'en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
}

async function loadArticle() {
  if (!articleId) {
    // If no article ID, redirect to news page
    window.location.href = 'news.html';
    return;
  }

  try {
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

// Initial load
document.addEventListener('DOMContentLoaded', loadArticle);
