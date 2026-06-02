document.addEventListener("DOMContentLoaded", () => {
  // 1. Header scroll effect
  const header = document.querySelector(".header");
  let headerTicking = false;
  window.addEventListener("scroll", () => {
    if (!headerTicking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
        headerTicking = false;
      });
      headerTicking = true;
    }
  });

  // 2. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll(".reveal-up, .reveal-scale");
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // 3. Defer Lenis scroll initialization to window.onload to avoid layout thrashing / forced reflows
  function initLenis() {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // premium easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Subtle Parallax for Hero Visual
    const heroVisual = document.querySelector(".hero-visual");
    if (heroVisual) {
      let ticking = false;
      lenis.on('scroll', (e) => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            // Slight downward translation on scroll for parallax depth
            heroVisual.style.transform = `translateY(${scrollY * 0.15}px)`;
            ticking = false;
          });
          ticking = true;
        }
      });
    }

    // Intercept clicks on anchor links to scroll slowly and smoothly
    document.querySelectorAll('a').forEach(anchor => {
      const href = anchor.getAttribute('href');
      if (!href) return;

      const hasHash = href.includes('#');
      if (hasHash) {
        anchor.addEventListener('click', function (e) {
          const currentPath = window.location.pathname;
          // Normalize paths for comparison
          const isHomepage = currentPath === '/' || currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '';
          const targetId = href.split('#')[1];
          const targetEl = document.getElementById(targetId);

          if (targetEl) {
            const isLocal = href.startsWith('#') || (isHomepage && (href.startsWith('index.html#') || href.startsWith('./index.html#')));
            if (isLocal) {
              e.preventDefault();
              lenis.scrollTo(targetEl, {
                duration: 2.2, // Slower duration for footer/header scroll
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Smooth easing
              });
              history.pushState(null, null, `#${targetId}`);
            }
          }
        });
      }
    });

    // Scroll slowly to initial hash on page load if present
    if (window.location.hash) {
      const targetEl = document.getElementById(window.location.hash.substring(1));
      if (targetEl) {
        setTimeout(() => {
          lenis.scrollTo(targetEl, {
            duration: 2.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        }, 400);
      }
    }
  }

  if (document.readyState === "complete") {
    setTimeout(initLenis, 200);
  } else {
    window.addEventListener("load", () => {
      setTimeout(initLenis, 200);
    });
  }

  // 4. Interactive Solutions Component
  const solutionTabs = document.querySelectorAll('.solution-tab');
  const solutionBgs = document.querySelectorAll('.solution-bg');
  const solutionContents = document.querySelectorAll('.solution-content');

  if (solutionTabs.length > 0) {
    solutionTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const index = tab.getAttribute('data-tab');
        
        // Remove active class from all
        solutionTabs.forEach(t => t.classList.remove('active'));
        solutionBgs.forEach(bg => bg.classList.remove('active'));
        solutionContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to selected
        tab.classList.add('active');
        if (solutionBgs[index]) solutionBgs[index].classList.add('active');
        if (solutionContents[index]) solutionContents[index].classList.add('active');
      });
    });
  }

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

});
