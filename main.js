document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. ENVIO DE FORMULÁRIO (NETLIFY) ---
    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const btn = contactForm.querySelector("button");
            const originalText = btn.innerHTML;
            
            // Feedback visual
            btn.innerHTML = "Enviando...";
            btn.disabled = true;

            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            })
            .then(() => {
                alert("Mensagem enviada com sucesso! Entrarei em contato em breve.");
                contactForm.reset();
            })
            .catch((error) => {
                alert("Ocorreu um erro ao enviar. Tente novamente.");
                console.error("Erro no envio:", error);
            })
            .finally(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
        });
    }

    // --- 2. ACTIVE LINK NO MENU (ScrollSpy Otimizado) ---
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    // Configuração do Observer
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3 // Aciona quando 30% da seção estiver visível
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Remove active de todos
                navLinks.forEach(link => link.classList.remove("active"));
                
                // Adiciona active ao link correspondente
                const id = entry.target.getAttribute("id");
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    }, observerOptions);

    sections.forEach((section) => {
        observer.observe(section);
    });
});

// --- 3. ANIMAÇÃO DAS BARRAS DE HABILIDADES ---
    const statsSection = document.querySelector(".tech-stats-container");
    const progressBars = document.querySelectorAll(".bar-fill");
    const counters = document.querySelectorAll(".counter");
    let animated = false; // Trava para não animar múltiplas vezes

    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;

                    // 1. Animar Largura das Barras
                    progressBars.forEach(bar => {
                        const targetWidth = bar.getAttribute("data-width");
                        bar.style.width = targetWidth;
                        // Adiciona o glow após a transição
                        setTimeout(() => bar.classList.add("filled"), 1500);
                    });

                    // 2. Animar Números (Counter up)
                    counters.forEach(counter => {
                        const target = +counter.getAttribute("data-target");
                        const duration = 1500; // ms
                        const increment = target / (duration / 20); // Velocidade
                        
                        let current = 0;
                        const updateCounter = () => {
                            current += increment;
                            if (current < target) {
                                counter.innerText = Math.ceil(current);
                                setTimeout(updateCounter, 20);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCounter();
                    });
                }
            });
        }, { threshold: 0.5 }); // Dispara quando 50% da seção estiver visível

        statsObserver.observe(statsSection);
    }