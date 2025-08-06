// Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header background on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(45, 27, 105, 0.98)';
            } else {
                header.style.background = 'rgba(45, 27, 105, 0.95)';
            }
        });

        // Fixed Scroll Reveal Animation
        const scrollRevealElements = document.querySelectorAll('.service-card, .testimonial-card');

        const revealOnScroll = () => {
            scrollRevealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;

                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('revealed');
                } else {
                    element.classList.remove('revealed');
                }
            });
        };

        // Initialize scroll reveal
        scrollRevealElements.forEach(element => {
            element.classList.add('scroll-reveal');
        });

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Check on load

        // Portfolio Tabs
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');

                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });

        // Enhanced portfolio item interactions
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-10px) rotateX(5deg)';
                this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.25)';
            });

            item.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) rotateX(0deg)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            });
        });

        // Service card enhanced hover effects
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            });
        });

        // Pricing card interactions
        document.querySelectorAll('.pricing-card:not(.featured)').forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            });
        });

        // Add loading animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Parallax effect for hero section (subtle)
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const vision = document.querySelector('.vision');

            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            }

            if (vision && scrolled > vision.offsetTop - window.innerHeight) {
                const visionScrolled = scrolled - (vision.offsetTop - window.innerHeight);
                vision.style.transform = `translateY(${visionScrolled * -0.1}px)`;
            }
        });

        // Button shine effect
        document.querySelectorAll('.btn-primary').forEach(btn => {
            btn.addEventListener('mouseenter', function () {
                this.style.overflow = 'hidden';
                this.style.position = 'relative';
            });
        });

        // Lottie animation error handling
        document.addEventListener('DOMContentLoaded', function () {
            const lottiePlayer = document.querySelector('lottie-player');

            if (lottiePlayer) {
                lottiePlayer.addEventListener('error', function () {
                    console.log('Lottie animation failed to load, showing fallback');
                    const container = document.querySelector('.lottie-container');
                    container.innerHTML = `
                <div class="animation-fallback">
                    <i class="fas fa-code"></i>
                </div>
            `;
                });

                // Timeout fallback
                setTimeout(() => {
                    if (!lottiePlayer.getLottie || !lottiePlayer.getLottie()) {
                        const container = document.querySelector('.lottie-container');
                        container.innerHTML = `
                    <div class="animation-fallback">
                        <i class="fas fa-laptop-code"></i>
                    </div>
                `;
                    }
                }, 5000);
            }
        });

        // Lightbox functionality
        document.addEventListener('DOMContentLoaded', function () {
            const modal = document.getElementById('lightboxModal');
            const modalContent = document.getElementById('lightboxMedia');
            const modalTitle = document.getElementById('lightboxTitle');
            const modalDescription = document.getElementById('lightboxDescription');
            const closeBtn = document.querySelector('.lightbox-close');

            // Open lightbox
            document.querySelectorAll('.portfolio-item[data-lightbox]').forEach(item => {
                item.addEventListener('click', function () {
                    const src = this.getAttribute('data-src');
                    const title = this.getAttribute('data-title');
                    const description = this.getAttribute('data-description');
                    const type = this.getAttribute('data-lightbox'); // 'image' or 'video'

                    modalTitle.textContent = title;
                    modalDescription.textContent = description;

                    if (type === 'video') {
                        modalContent.innerHTML = `
                    <video controls autoplay loop playsinline style="width: 100%; height: auto;">
                        <source src="${src}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                `;
                    } else {
                        modalContent.innerHTML = `<img src="${src}" alt="${title}" style="width: 100%; height: auto;">`;
                    }

                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
                });
            });

            // Close lightbox
            function closeLightbox() {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto'; // Restore scrolling
                setTimeout(() => {
                    modalContent.innerHTML = ''; // Clear content after transition
                }, 300);
            }

            closeBtn.addEventListener('click', closeLightbox);

            modal.addEventListener('click', function (e) {
                if (e.target === modal) { // Close only if clicking on the overlay, not the content
                    closeLightbox();
                }
            });

            // Close with Escape key
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    closeLightbox();
                }
            });
        });
