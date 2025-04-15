document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Quick View Modal
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const quickViewModal = document.querySelector('.quick-view-modal');
    const closeModal = document.querySelector('.close-modal');

    quickViewButtons.forEach(button => {
        button.addEventListener('click', () => {
            quickViewModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', () => {
        quickViewModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Thumbnail Image Switch
    const thumbnails = document.querySelectorAll('.thumbnail-images img');
    const mainImage = document.querySelector('.main-image img');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
            mainImage.src = thumbnail.src;
        });
    });

    // Quantity Selector
    const qtyMinus = document.querySelector('.qty-btn.minus');
    const qtyPlus = document.querySelector('.qty-btn.plus');
    const qtyInput = document.querySelector('.quantity-selector input');

    qtyMinus.addEventListener('click', () => {
        let value = parseInt(qtyInput.value);
        if (value > 1) {
            qtyInput.value = value - 1;
        }
    });

    qtyPlus.addEventListener('click', () => {
        let value = parseInt(qtyInput.value);
        qtyInput.value = value + 1;
    });

    // Product Options
    const sizeButtons = document.querySelectorAll('.size-options button');
    const finishButtons = document.querySelectorAll('.finish-options button');

    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            sizeButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
        });
    });

    finishButtons.forEach(button => {
        button.addEventListener('click', () => {
            finishButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Testimonials Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    const dots = document.querySelectorAll('.slider-dots .dot');
    let currentIndex = 0;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            dots[i].classList.remove('active');
            if (i === index) {
                card.classList.add('active');
                dots[i].classList.add('active');
            }
        });
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        showTestimonial(currentIndex);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showTestimonial(currentIndex);
        });
    });

    // Auto-slide every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        showTestimonial(currentIndex);
    }, 5000);

    // Live Chat Modal
    const liveChatBtn = document.querySelector('.live-chat-btn');
    const liveChatModal = document.querySelector('.live-chat-modal');
    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input button');
    const chatBody = document.querySelector('.chat-body');

    liveChatBtn.addEventListener('click', () => {
        liveChatModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeChat.addEventListener('click', () => {
        liveChatModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    function addMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', isUser ? 'user' : 'agent');
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        `;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    sendButton.addEventListener('click', () => {
        if (chatInput.value.trim()) {
            addMessage(chatInput.value, true);
            // Simulate agent response
            setTimeout(() => {
                addMessage("Thank you for your message! Our team will get back to you shortly.", false);
            }, 1000);
            chatInput.value = '';
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim()) {
            addMessage(chatInput.value, true);
            setTimeout(() => {
                addMessage("Thank you for your message! Our team will get back to you shortly.", false);
            }, 1000);
            chatInput.value = '';
        }
    });

    // Add to Cart Animation
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Create animation element
            const img = button.closest('.product-card')?.querySelector('.product-image img') || 
                       button.closest('.product-view-details')?.querySelector('.main-image img');
            if (img) {
                const flyingImg = img.cloneNode();
                flyingImg.classList.add('flying-img');
                document.body.appendChild(flyingImg);

                const imgRect = img.getBoundingClientRect();
                const cartRect = cartIcon.getBoundingClientRect();

                flyingImg.style.position = 'fixed';
                flyingImg.style.zIndex = '1002';
                flyingImg.style.width = `${imgRect.width}px`;
                flyingImg.style.height = `${imgRect.height}px`;
                flyingImg.style.top = `${imgRect.top}px`;
                flyingImg.style.left = `${imgRect.left}px`;
                flyingImg.style.transition = 'all 0.7s ease';

                setTimeout(() => {
                    flyingImg.style.width = '50px';
                    flyingImg.style.height = '50px';
                    flyingImg.style.top = `${cartRect.top}px`;
                    flyingImg.style.left = `${cartRect.left}px`;
                    flyingImg.style.opacity = '0';
                }, 50);

                setTimeout(() => {
                    flyingImg.remove();
                    let count = parseInt(cartCount.textContent);
                    cartCount.textContent = count + 1;
                    cartIcon.classList.add('pulse');
                    setTimeout(() => cartIcon.classList.remove('pulse'), 300);
                }, 700);
            }
        });
    });

    // Wishlist Toggle
    const wishlistButtons = document.querySelectorAll('.add-wishlist');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', () => {
            const icon = button.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            button.classList.toggle('added');
            button.style.transform = 'scale(1.2)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Language Switcher
    const languageSpans = document.querySelectorAll('.language-switcher span, .mobile-language-switcher span');
    languageSpans.forEach(span => {
        span.addEventListener('click', () => {
            const parent = span.parentElement;
            parent.querySelector('.active').classList.remove('active');
            span.classList.add('active');
            // Simulate language change
            alert(`Switched to ${span.textContent}`);
        });
    });

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        alert(`Thank you for subscribing with ${email}!`);
        newsletterForm.reset();
    });

    // WhatsApp Button
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    whatsappBtn.addEventListener('click', () => {
        window.open('https://wa.me/+966123456789', '_blank');
    });

    // Search Icon Animation
    const searchIcon = document.querySelector('.nav-icon[href="#search"]');
    searchIcon.addEventListener('click', (e) => {
        e.preventDefault();
        searchIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            searchIcon.style.transform = 'scale(1)';
            alert('Search functionality coming soon!');
        }, 200);
    });

    // Parallax Effect for Hero
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });

    // Animate Stats on Scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsBar = document.querySelector('.stats-bar');
    let statsAnimated = false;

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.textContent);
            let current = 0;
            const increment = target / 50;
            const interval = setInterval(() => {
                current += increment;
                stat.textContent = current.toFixed(current < 100 ? 0 : 1);
                if (current >= target) {
                    stat.textContent = target.toString().includes('%') ? `${target}%` : target;
                    clearInterval(interval);
                }
            }, 20);
        });
    }

    window.addEventListener('scroll', () => {
        const rect = statsBar.getBoundingClientRect();
        if (rect.top < window.innerHeight && !statsAnimated) {
            animateStats();
            statsAnimated = true;
        }
    });

    // Lazy Load Images
    const images = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => observer.observe(img));
});

// Flying image styles
const style = document.createElement('style');
style.textContent = `
    .flying-img {
        pointer-events: none;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }
    .pulse {
        animation: pulse 0.3s ease;
    }
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);