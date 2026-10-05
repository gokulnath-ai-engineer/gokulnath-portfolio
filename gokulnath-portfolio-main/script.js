/**
 * GOKULNATH RAJA PORTFOLIO - MAIN INTERACTION LOGIC
 * Includes: Typewriter, Recruiter Mode, Modals, Tabs, GitHub Showcase, Count-up, Scroll Reveal, Print CV
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. Typewriter Effect
       ========================================================================== */
    const typewriterElement = document.getElementById('typewriter-text');
    const words = [
        "Machine Learning Systems",
        "Predictive AI Models",
        "Data-Driven Dashboards",
        "User-Centered Interfaces"
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;
    
    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40; // Deleting is faster
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before starting next word
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    if (typewriterElement) {
        typeEffect();
    }

    /* ==========================================================================
       2. Mobile Navigation Drawer
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navbar = document.getElementById('main-header');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    function toggleMobileMenu() {
        navbar.classList.toggle('mobile-active');
        mobileNav.classList.toggle('open');
    }
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('mobile-active');
            mobileNav.classList.remove('open');
        });
    });

    /* ==========================================================================
       3. Recruiter Quick-Scan Mode & Match Matrix animations
       ========================================================================== */
    const body = document.body;
    const recruiterDashboard = document.getElementById('recruiter-dashboard');
    const btnToggleHeader = document.getElementById('recruiter-toggle');
    const btnToggleMobile = document.getElementById('recruiter-toggle-mobile');
    const btnHeroRecruiter = document.getElementById('hero-recruiter-btn');
    const btnExitDashboard = document.getElementById('exit-recruiter-mode');
    
    function animateMatchMatrix() {
        const fills = document.querySelectorAll('.matrix-meter-fill');
        fills.forEach(fill => {
            if (fill.classList.contains('fill-90')) fill.style.width = '90%';
            else if (fill.classList.contains('fill-80')) fill.style.width = '80%';
            else if (fill.classList.contains('fill-75')) fill.style.width = '75%';
            else if (fill.classList.contains('fill-70')) fill.style.width = '70%';
        });
    }

    function resetMatchMatrix() {
        const fills = document.querySelectorAll('.matrix-meter-fill');
        fills.forEach(fill => {
            fill.style.width = '0%';
        });
    }

    function enableRecruiterMode() {
        body.classList.add('recruiter-mode');
        recruiterDashboard.classList.remove('hidden-by-default');
        
        // Synchronize toggle button visual indicators
        if (btnToggleHeader) {
            btnToggleHeader.classList.add('active');
            btnToggleHeader.querySelector('.toggle-text').textContent = 'Recruiter Mode: ON';
        }
        if (btnToggleMobile) {
            btnToggleMobile.querySelector('.toggle-text').textContent = 'Recruiter Mode: ON';
        }
        
        // Trigger meter bar slide-ins
        setTimeout(animateMatchMatrix, 100);

        // Smooth scroll to the recruiter section
        recruiterDashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    function disableRecruiterMode() {
        body.classList.remove('recruiter-mode');
        recruiterDashboard.classList.add('hidden-by-default');
        
        // Reset toggle button visuals
        if (btnToggleHeader) {
            btnToggleHeader.classList.remove('active');
            btnToggleHeader.querySelector('.toggle-text').textContent = 'Recruiter Mode';
        }
        if (btnToggleMobile) {
            btnToggleMobile.querySelector('.toggle-text').textContent = 'Recruiter Mode';
        }

        resetMatchMatrix();
    }
    
    function toggleRecruiterMode() {
        if (body.classList.contains('recruiter-mode')) {
            disableRecruiterMode();
        } else {
            enableRecruiterMode();
        }
    }
    
    if (btnToggleHeader) btnToggleHeader.addEventListener('click', toggleRecruiterMode);
    if (btnToggleMobile) btnToggleMobile.addEventListener('click', () => {
        toggleRecruiterMode();
        // Close mobile nav drawer
        navbar.classList.remove('mobile-active');
        mobileNav.classList.remove('open');
    });
    if (btnHeroRecruiter) btnHeroRecruiter.addEventListener('click', enableRecruiterMode);
    if (btnExitDashboard) btnExitDashboard.addEventListener('click', disableRecruiterMode);

    /* ==========================================================================
       4. Skills Tab Switcher
       ========================================================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Activate selected tab
            button.classList.add('active');
            const activeContent = document.getElementById(targetTab);
            if (activeContent) {
                activeContent.classList.add('active');
                
                // Retrigger progress bar animation inside the tab content
                const progressBars = activeContent.querySelectorAll('.skill-bar-inner');
                progressBars.forEach(bar => {
                    const originalWidth = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = originalWidth;
                    }, 50);
                });
            }
        });
    });

    /* ==========================================================================
       5. Project Modals (Lightbox Dialogs)
       ========================================================================== */
    const projectCards = document.querySelectorAll('.project-card');
    const modals = document.querySelectorAll('.modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const modalBackdrops = document.querySelectorAll('.modal-backdrop');
    
    // Open Modal
    projectCards.forEach(card => {
        const viewBtn = card.querySelector('.btn-text');
        if (viewBtn) {
            viewBtn.addEventListener('click', () => {
                const modalId = viewBtn.getAttribute('aria-controls');
                const targetModal = document.getElementById(modalId);
                if (targetModal) {
                    targetModal.classList.add('open');
                    body.style.overflow = 'hidden'; // Lock background scroll
                    
                    // Focus close button for accessibility
                    const closeBtn = targetModal.querySelector('.modal-close');
                    if (closeBtn) closeBtn.focus();
                }
            });
        }
    });
    
    // Close Modal Function
    function closeModal(modal) {
        modal.classList.remove('open');
        body.style.overflow = ''; // Unlock background scroll
    }
    
    // Close via Close Button Click
    modalCloseButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) closeModal(modal);
        });
    });
    
    // Close via Backdrop Click
    modalBackdrops.forEach(backdrop => {
        backdrop.addEventListener('click', () => {
            const modal = backdrop.closest('.modal');
            if (modal) closeModal(modal);
        });
    });
    
    // Close via ESC Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.open');
            if (openModal) closeModal(openModal);
        }
    });

    /* ==========================================================================
       6. GitHub Showcase Contribution Calendar Generation
       ========================================================================== */
    const calendarGrid = document.getElementById('calendar-grid');
    if (calendarGrid) {
        // Generate a 53 weeks x 7 days grid (371 cells)
        const cellCount = 371;
        for (let i = 0; i < cellCount; i++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            
            // Assign pseudo-random contribution frequencies
            let val = Math.random();
            let level = 0;
            
            // Generate periodic clusters representing active sprints
            const isSprintWeek = Math.floor(i / 7) % 6 === 0 || Math.floor(i / 7) % 8 === 0;
            const isWeekend = i % 7 === 0 || i % 7 === 6;

            if (isSprintWeek) {
                if (isWeekend) {
                    level = val < 0.4 ? 1 : 2;
                } else {
                    level = val < 0.15 ? 1 : val < 0.45 ? 2 : val < 0.8 ? 3 : 4;
                }
            } else {
                if (isWeekend) {
                    level = val < 0.9 ? 0 : 1;
                } else {
                    level = val < 0.5 ? 0 : val < 0.75 ? 1 : val < 0.93 ? 2 : 3;
                }
            }

            dayCell.classList.add(`lvl-${level}`);
            calendarGrid.appendChild(dayCell);
        }
    }

    /* ==========================================================================
       7. GitHub Showcase Repository Filter
       ========================================================================== */
    const repoTabButtons = document.querySelectorAll('.repo-tab-btn');
    const repoCards = document.querySelectorAll('.repo-card');

    repoTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Deactivate all buttons
            repoTabButtons.forEach(b => b.classList.remove('active'));
            // Activate selected
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-repo-filter');

            repoCards.forEach(card => {
                const cardLang = card.getAttribute('data-repo-lang');
                if (filterValue === 'all' || cardLang === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* ==========================================================================
       8. Stats Count-Up Animation
       ========================================================================== */
    function animateValue(element, start, end, duration) {
        if (!element) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    let statsAnimated = false;
    const githubSection = document.getElementById('github-showcase');

    if (githubSection) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    const commitVal = document.getElementById('git-commits');
                    const repoVal = document.getElementById('git-repos');
                    const starVal = document.getElementById('git-stars');
                    const contribVal = document.getElementById('git-contribs');

                    animateValue(commitVal, 0, 342, 2000);
                    animateValue(repoVal, 0, 4, 1500);
                    animateValue(starVal, 0, 18, 1800);
                    animateValue(contribVal, 0, 428, 2200);

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        statsObserver.observe(githubSection);
    }

    /* ==========================================================================
       9. Print CV Engine Hookups
       ========================================================================== */
    const printBtnIds = [
        'download-cv-btn', 
        'download-cv-btn-mobile', 
        'hero-download-cv-btn', 
        'recruiter-download-cv'
    ];

    printBtnIds.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', () => {
                window.print();
            });
        }
    });

    /* ==========================================================================
       10. Scroll Reveal Observer
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================================================
       11. Contact Form Handling
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            // Set loading state
            submitBtn.disabled = true;
            submitBtn.textContent = "Sending Message...";
            formFeedback.className = "form-feedback";
            formFeedback.textContent = "";
            
            // Simulate API request
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                
                // Show success feedback
                formFeedback.className = "form-feedback success";
                formFeedback.textContent = "Thank you, your message has been sent successfully! Gokulnath will get back to you shortly.";
                
                // Clear form
                contactForm.reset();
            }, 1200);
        });
    }

    /* ==========================================================================
       12. Theme Toggle & Theme Switcher Logic
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
    
    // Check saved theme or preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else if (savedTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
    } else if (!systemPrefersDark && !savedTheme) {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
        
        // Retrigger particle canvas color update
        if (typeof updateParticleColors === 'function') {
            updateParticleColors();
        }
    }
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    if (themeToggleMobileBtn) {
        themeToggleMobileBtn.addEventListener('click', () => {
            toggleTheme();
            // Close mobile drawer after click
            if (navbar && mobileNav) {
                navbar.classList.remove('mobile-active');
                mobileNav.classList.remove('open');
            }
        });
    }

    /* ==========================================================================
       13. Interactive Canvas Particle System
       ========================================================================== */
    const canvas = document.getElementById('hero-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;
        
        let particles = [];
        const maxParticles = 28;
        const connectionDistance = 75;
        let mouseX = null;
        let mouseY = null;
        let activeColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#00f2fe';
        
        window.updateParticleColors = function() {
            activeColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#00f2fe';
            particles.forEach(p => {
                p.color = activeColor;
            });
        };
        
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.6;
                this.vy = (Math.random() - 0.5) * 0.6;
                this.radius = Math.random() * 2 + 1.5;
                this.color = activeColor;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
                
                // Keep inside bounds
                if (this.x < 0) this.x = 0;
                if (this.x > width) this.x = width;
                if (this.y < 0) this.y = 0;
                if (this.y > height) this.y = height;
                
                // Interactive mouse effect
                if (mouseX !== null && mouseY !== null) {
                    const dx = this.x - mouseX;
                    const dy = this.y - mouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 80) {
                        const force = (80 - dist) / 80;
                        this.x += (dx / dist) * force * 1.5;
                        this.y += (dy / dist) * force * 1.5;
                    }
                }
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 6;
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.shadowBlur = 0; // Reset shadow
            }
        }
        
        function initParticles() {
            particles = [];
            for (let i = 0; i < maxParticles; i++) {
                particles.push(new Particle());
            }
        }
        
        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < connectionDistance) {
                        const opacity = (1 - dist / connectionDistance) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = p1.color;
                        ctx.globalAlpha = opacity;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                        ctx.globalAlpha = 1.0;
                    }
                }
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            
            drawLines();
            requestAnimationFrame(animate);
        }
        
        // Event listeners
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });
        
        canvas.addEventListener('mouseleave', () => {
            mouseX = null;
            mouseY = null;
        });
        
        window.addEventListener('resize', () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
            initParticles();
        });
        
        initParticles();
        animate();
    }
});
