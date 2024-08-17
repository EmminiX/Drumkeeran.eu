export const setupScrollAnimation = (elements) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => {
        if (el) {
            el.classList.add('scroll-animation');
            observer.observe(el);
        }
    });

    return () => {
        elements.forEach(el => {
            if (el) {
                observer.unobserve(el);
            }
        });
    };
};