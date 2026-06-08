const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.glass, .hero-copy, .section-header, .service-card, .skill-card, .project-card, .cv-preview, .cv-info, .contact-card, .contact-form').forEach((el) => {
  el.dataset.aos = 'fade-up';
  el.classList.add('fade-up');
  observer.observe(el);
});

const nav = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = Array.from(document.querySelectorAll('section[id]'));

const scrollToSection = (targetId) => {
  const target = document.querySelector(targetId);
  if (!target) return;
  const offset = nav ? nav.offsetHeight + 12 : 20;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
};

const updateActiveNav = () => {
  const scrollPosition = window.scrollY + (nav ? nav.offsetHeight + 24 : 80);
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const anchor = document.querySelector(`.nav-links a[href$="#${section.id}"]`);
    if (!anchor) return;
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      anchor.classList.add('active');
    } else {
      anchor.classList.remove('active');
    }
  });
};

if (navToggle) {
  navToggle.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('open');
    navToggle.classList.toggle('open');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      event.preventDefault();
      scrollToSection(href);
    }
    const mobileNav = document.querySelector('.nav-links.open');
    if (mobileNav) {
      mobileNav.classList.remove('open');
      navToggle?.classList.remove('open');
    }
  });
});

window.addEventListener('scroll', () => {
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  updateActiveNav();
});

window.addEventListener('load', () => {
  updateActiveNav();
});

const heroGlow = document.querySelector('.hero-glow');
const heroGlowSecondary = document.querySelector('.hero-glow-secondary');
window.addEventListener('mousemove', (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 30;
  const y = (event.clientY / window.innerHeight - 0.5) * 30;
  if (heroGlow) heroGlow.style.transform = `translate(${x}px, ${y}px)`;
  if (heroGlowSecondary) heroGlowSecondary.style.transform = `translate(${-x}px, ${-y}px)`;
});

const buttons = document.querySelectorAll('.btn');
buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

const apiEndpoint = document.body.dataset.apiUrl?.trim() || 'https://skytech-backend-production.up.railway.app/api/contact';
const form = document.getElementById('contactForm');
const statusContainer = document.getElementById('statusMessage');
const downloadCvHeader = document.getElementById('downloadCvHeader');
const downloadCv = document.getElementById('downloadCv');

const showStatus = (message, success = true) => {
  if (!statusContainer) return;
  statusContainer.textContent = message;
  statusContainer.className = success ? 'status-message status-success' : 'status-message status-error';
};

const showButtonLoading = (button, loading = true) => {
  if (!button) return;
  button.classList.toggle('loading', loading);
  button.textContent = loading ? 'Loading...' : button.dataset.originalText;
};

const createResumePdf = () => {
  if (!window.jspdf) {
    return null;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const margin = 40;
  let y = 50;

  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text('Musa Sherif', margin, y);
  doc.setFontSize(12);
  doc.setTextColor(200, 200, 220);
  doc.text('Founder of SkyTech | Remote Technology Engineer', margin, y + 26);
  doc.text('skytech08088@gmail.com | Remote', margin, y + 42);
  y += 90;
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('Summary', margin, y);
  y += 20;
  doc.setFontSize(11);
  doc.setTextColor(200, 200, 220);
  doc.text('Remote technology engineer with multidisciplinary experience in cybersecurity, web development, digital marketing, and telecom optimization.', margin, y, { maxWidth: 510 });
  y += 70;
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('Expertise', margin, y);
  y += 24;
  doc.setFontSize(11);
  const expertise = [
    'Cybersecurity Architecture',
    'Responsive Web Development',
    'Conversion Marketing Strategy',
    'Drive Test Performance Analysis',
  ];
  expertise.forEach((item) => {
    doc.text(`• ${item}`, margin, y);
    y += 18;
  });
  y += 14;
  doc.setFontSize(14);
  doc.text('Projects', margin, y);
  y += 22;
  const projects = [
    'SkyTech Portfolio Website — founder brand exposure',
    'Digital Campaign Analysis — ROI growth plan',
    'Network Optimization — coverage and performance tuning',
  ];
  projects.forEach((item) => {
    doc.text(`• ${item}`, margin, y);
    y += 18;
  });

  return doc;
};

const bindDownloadCv = (button) => {
  if (!button) return;
  button.dataset.originalText = button.textContent;
  button.addEventListener('click', async (event) => {
    event.preventDefault();
    if (!window.jspdf) {
      window.location.href = 'resume.html';
      return;
    }

    showButtonLoading(button, true);
    const doc = createResumePdf();
    if (doc) {
      doc.save('SkyTech-CV-Musa-Sherif.pdf');
    }
    showButtonLoading(button, false);
  });
};

bindDownloadCv(downloadCvHeader);
bindDownloadCv(downloadCv);

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    showStatus('Sending your message to the SkyTech API...', true);

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      company: form.company.value.trim(),
      service: form.service.value.trim(),
      message: form.message.value.trim(),
    };

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        showStatus(data.error || 'Unable to send your message right now. Please try again later.', false);
      } else {
        showStatus(data.message || 'Message sent successfully.', true);
        form.reset();
        // Analytics hooks: push events for GA4, Meta Pixel, TikTok
        try {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: 'contact_form_submitted', formData: { name: formData.name, email: formData.email, service: formData.service } });
          if (window.gtag) window.gtag('event', 'conversion', { event_category: 'contact', event_label: formData.service });
          if (window.fbq) window.fbq('track', 'Lead');
          if (window.ttq && window.ttq.track) window.ttq.track('Lead');
        } catch (e) { console.warn('Analytics event error', e); }
      }
    } catch (error) {
      console.error('Contact API error:', error);
      showStatus('Network or API error. Be sure your backend is running or the live endpoint is configured.', false);
    }

    submitButton.disabled = false;
    submitButton.textContent = 'Send Inquiry';
  });
}

if (window.AOS) {
  AOS.init({
    duration: 850,
    easing: 'ease-out-cubic',
    once: true,
    mirror: false,
    offset: 120,
  });
}
