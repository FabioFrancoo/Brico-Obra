document.addEventListener('DOMContentLoaded', function () {
    // Animação de entrada para todos os elementos com a classe .animate-on-load
    const animatedElements = document.querySelectorAll('.animate-on-load');

    animatedElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 150); // efeito em cascata, opcional
    });

    // Hover nos cards, como já tinha
    const cards = document.querySelectorAll('.grid > div');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('i').style.transform = 'scale(1.1)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('i').style.transform = 'scale(1)';
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Anima só uma vez
            }
        });
    }, {
        threshold: 0.1 // 10% do elemento visível já ativa a animação
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));

    // Hover nos cards
    const cards = document.querySelectorAll('.grid > div');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('i').style.transform = 'scale(1.1)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('i').style.transform = 'scale(1)';
        });
    });
});
