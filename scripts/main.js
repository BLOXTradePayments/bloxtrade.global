document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Lenis for Smooth Scrolling
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

  // 2. Header scroll effect
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 3. Scroll Reveal Animations (Intersection Observer)
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

  // 4. Subtle Parallax for Hero Visual
  const heroVisual = document.querySelector(".hero-visual");
  if (heroVisual) {
    lenis.on('scroll', (e) => {
      const scrollY = window.scrollY;
      // Slight downward translation on scroll for parallax depth
      heroVisual.style.transform = `translateY(${scrollY * 0.15}px)`;
    });
  }

  // 5. Interactive Solutions Component
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
});
