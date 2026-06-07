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

const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      const offset = document.querySelector('.navbar').offsetHeight + 12;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.background = 'rgba(9, 11, 18, 0.82)';
    navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
  } else {
    navbar.style.background = 'rgba(9, 11, 18, 0.55)';
    navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.06)';
  }
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

const form = document.getElementById('contactForm');
const statusContainer = document.getElementById('statusMessage');
const apiEndpoint = document.body.dataset.apiUrl || '/api/contact';

const showStatus = (message, success = true) => {
  if (!statusContainer) return;
  statusContainer.textContent = message;
  statusContainer.className = success ? 'status-message status-success' : 'status-message status-error';
};

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
          window.dataLayer.push({ event: 'contact_form_submitted', formData: { name: formData.name, email: formData.email, service: formData.subject } });
          if (window.gtag) window.gtag('event', 'conversion', { event_category: 'contact', event_label: formData.subject });
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

const cvData = {
  name: 'Musa Sherif',
  title: 'Founder of SkyTech | Remote Technology Engineer',
  email: 'skytech08088@gmail.com',
  location: 'Remote',
  summary: 'Founder-led remote engineer with multidisciplinary experience in cybersecurity, web development, digital marketing, and telecom optimization.',
  skills: ['Cybersecurity Architecture', 'React • Node.js', 'Campaign Strategy', 'Drive Test Analysis', 'Linux • Git • Automation'],
  experience: [
    'Freelance Remote Consultant — Cybersecurity & Web Engineering',
    'Founder, SkyTech — Remote technology solutions',
    'Consultant — Digital marketing campaign delivery',
  ],
  projects: [
    'SkyTech Portfolio Website — founder brand exposure',
    'Digital Campaign Analysis — ROI growth plan',
    'Network Optimization — coverage and performance tuning',
  ],
};

const downloadCv = document.getElementById('downloadCv');
if (window.AOS) {
  AOS.init({
    duration: 850,
    easing: 'ease-out-cubic',
    once: true,
    mirror: false,
    offset: 120,
  });
}

if (downloadCv && window.jspdf) {
  downloadCv.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const margin = 40;
    let y = 50;
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42);
    doc.text(cvData.name, margin, y);
    doc.setFontSize(12);
    doc.setTextColor(77, 77, 77);
    doc.text(cvData.title, margin, y + 26);
    doc.setTextColor(100, 100, 125);
    doc.text(`${cvData.location} • ${cvData.email}`, margin, y + 46);
    y += 80;
    doc.setDrawColor(200);
    doc.setLineWidth(0.5);
    doc.line(margin, y, 555, y);
    y += 24;
    doc.setFontSize(14);
    doc.setTextColor(18, 21, 36);
    doc.text('Summary', margin, y);
    y += 20;
    doc.setFontSize(11);
    const summaryLines = doc.splitTextToSize(cvData.summary, 515);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 16 + 20;
    doc.setFontSize(14);
    doc.text('Skills', margin, y);
    y += 18;
    doc.setFontSize(11);
    cvData.skills.forEach((item) => {
      doc.text(`• ${item}`, margin, y);
      y += 16;
    });
    y += 12;
    doc.setFontSize(14);
    doc.text('Experience', margin, y);
    y += 18;
    doc.setFontSize(11);
    cvData.experience.forEach((item) => {
      const lines = doc.splitTextToSize(`• ${item}`, 515);
      doc.text(lines, margin, y);
      y += lines.length * 16;
    });
    y += 12;
    doc.setFontSize(14);
    doc.text('Featured Projects', margin, y);
    y += 18;
    doc.setFontSize(11);
    cvData.projects.forEach((item) => {
      const lines = doc.splitTextToSize(`• ${item}`, 515);
      doc.text(lines, margin, y);
      y += lines.length * 16;
    });
    doc.save('SkyTech-CV-Musa-Sherif.pdf');
  });
}
