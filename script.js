/**
 * Салон красоты "Элегия" - JavaScript
 * Интерактивность: мобильное меню, форма записи, модальное окно, анимации
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Мобильное меню
    // ========================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Закрытие меню при клике на ссылку
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Закрытие меню при клике вне его области
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // ========================================
    // Плавный скролл к якорям
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========================================
    // Обработка формы записи
    // ========================================
    const bookingForm = document.getElementById('bookingForm');
    const modal = document.getElementById('modal');
    const modalClose = document.querySelector('.modal-close');
    
    if (bookingForm) {
        // Установка минимальной даты (сегодня)
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
        
        // Маска для телефона
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value[0] === '7' || value[0] === '8') {
                        value = value.substring(1);
                    }
                    if (value.length > 10) {
                        value = value.substring(0, 10);
                    }
                    
                    let formatted = '+7';
                    if (value.length > 0) {
                        formatted += ' (' + value.substring(0, 3);
                    }
                    if (value.length > 3) {
                        formatted += ') ' + value.substring(3, 6);
                    }
                    if (value.length > 6) {
                        formatted += '-' + value.substring(6, 8);
                    }
                    if (value.length > 8) {
                        formatted += '-' + value.substring(8, 10);
                    }
                    
                    e.target.value = formatted;
                } else {
                    e.target.value = '+7';
                }
            });
        }
        
        // Отправка формы
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Сбор данных формы
            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData.entries());
            
            // Валидация
            if (!data.name || !data.phone || !data.service || !data.date || !data.time) {
                alert('Пожалуйста, заполните все обязательные поля');
                return;
            }
            
            // Имитация отправки на сервер
            console.log('Данные формы:', data);
            
            // Показ модального окна
            showModal();
            
            // Сброс формы
            bookingForm.reset();
        });
    }
    
    // ========================================
    // Модальное окно
    // ========================================
    function showModal() {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function hideModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', hideModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideModal();
            }
        });
    }
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            hideModal();
        }
    });
    
    // ========================================
    // Анимации при скролле
    // ========================================
    const fadeElements = document.querySelectorAll('.service-category, .feature-card, .gallery-item, .contact-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // ========================================
    // Изменение навбара при скролле
    // ========================================
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            }
        });
    }
    
    // ========================================
    // Активная ссылка в навигации
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // ========================================
    // Кастомные стили для select
    // ========================================
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.addEventListener('change', function() {
            this.blur();
        });
    });
    
    // ========================================
    // Анимация чисел в прайсе (опционально)
    // ========================================
    const priceElements = document.querySelectorAll('.service-price');
    
    const priceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(10px)';
                entry.target.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                priceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    priceElements.forEach(el => priceObserver.observe(el));
    
    // ========================================
    // Параллакс эффект для hero-секции
    // ========================================
    const hero = document.querySelector('.hero');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                floatingElements.forEach((el, index) => {
                    const speed = 0.1 + (index * 0.05);
                    el.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.02}deg)`;
                });
            }
        });
    }
    
    // ========================================
    // Lazy loading для галереи (если будут изображения)
    // ========================================
    const galleryImages = document.querySelectorAll('.gallery-image[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.backgroundImage = `url(${img.dataset.src})`;
                imageObserver.unobserve(img);
            }
        });
    });
    
    galleryImages.forEach(img => imageObserver.observe(img));
    
    // ========================================
    // Консольное приветствие
    // ========================================
    console.log('%c✦ Салон красоты "Элегия" ✦', 'font-size: 20px; color: #d4af37; font-weight: bold;');
    console.log('%cВаша красота — наше вдохновение', 'font-size: 14px; color: #80cbc4;');
    
});
