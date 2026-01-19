// --- CÓDIGO DE ENVIO DE FORMULÁRIO VIA AJAX ADICIONADO ---
    // Seleciona o formulário
    const contactForm = document.querySelector(".contact-form");

    // Intercepta o envio
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        const formData = new FormData(contactForm);
        
        // Botão visualmente carregando (opcional, mas boa UX)
        const btn = contactForm.querySelector("button");
        const originalText = btn.innerHTML;
        btn.innerHTML = "Enviando...";
        btn.disabled = true;

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
        })
        .then(() => {
            alert("Mensagem enviada com sucesso! Entrarei em contato em breve.");
            contactForm.reset(); // Limpa os campos
        })
        .catch((error) => {
            alert("Ocorreu um erro ao enviar. Tente novamente.");
            console.error(error);
        })
        .finally(() => {
            // Restaura o botão
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
    });

    // --- CÓDIGO DA NAV BAR (SCROLL SPY) MANTIDO ---
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.onscroll = () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute("id");
            }
        });
        navLinks.forEach((li) => {
            li.classList.remove("active");
            if (li.getAttribute("href").includes(current)) {
                li.classList.add("active");
            }
        });
    };
