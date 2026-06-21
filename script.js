const loader = document.getElementById('loader');
const navbar = document.querySelector('.navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const animatedItems = document.querySelectorAll('[data-animate]');
const accordions = document.querySelectorAll('.accordion');
const contactForm = document.getElementById('contactForm');

window.addEventListener('load', () => {
  document.body.classList.add('no-scroll');

  setTimeout(() => {
    loader.classList.add('hide');
    document.body.classList.remove('no-scroll');
    revealInitialElements();
  }, 900);
});

function revealInitialElements() {
  animatedItems.forEach((item) => {
    const delay = item.dataset.delay || 0;
    item.style.setProperty('--delay', `${delay}ms`);
  });

  observerElements();
}

function observerElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedItems.forEach((item) => observer.observe(item));
}

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

accordions.forEach((accordion) => {
  const button = accordion.querySelector('.accordion-btn');
  const content = accordion.querySelector('.accordion-content');

  button.addEventListener('click', () => {
    const isOpen = accordion.classList.contains('active');

    accordions.forEach((item) => {
      item.classList.remove('active');
      item.querySelector('.accordion-content').style.maxHeight = null;
    });

    if (!isOpen) {
      accordion.classList.add('active');
      content.style.maxHeight = `${content.scrollHeight}px`;
    }
  });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const nome = formData.get('nome');
  const telefone = formData.get('telefone');
  const mensagem = formData.get('mensagem');

  const texto = `Olá, meu nome é ${nome}. Meu telefone é ${telefone}. ${mensagem}`;
  const whatsappUrl = `https://wa.me/5581999999999?text=${encodeURIComponent(texto)}`;

  window.open(whatsappUrl, '_blank');
  contactForm.reset();
});
