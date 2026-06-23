document.addEventListener('DOMContentLoaded', () => {
    // 1. 打字机效果
    const sig = document.querySelector('.signature');
    if (sig) {
        const text = sig.getAttribute('data-text');
        sig.textContent = '';
        let i = 0;
        const type = () => {
            if (i <= text.length) {
                sig.textContent = text.slice(0, i);
                i++;
                setTimeout(type, 150);
            }
        };
        type();
    }

    // 2. 滚动淡入观察器 (使用 IntersectionObserver 性能更好)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade').forEach(el => observer.observe(el));
});