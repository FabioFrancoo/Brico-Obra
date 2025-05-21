document.addEventListener('DOMContentLoaded', function () {
    // Animation for the banner section
    const bannerTitle = document.querySelector('.banner-image h1');
    bannerTitle.style.opacity = '0';
    bannerTitle.style.transform = 'translateY(20px)';

    setTimeout(() => {
        bannerTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        bannerTitle.style.opacity = '1';
        bannerTitle.style.transform = 'translateY(0)';
    }, 300);

    // Hover effect for category cards
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
