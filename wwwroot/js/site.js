(() => {
    'use strict';

    const root = document.documentElement;
    const themeButton = document.querySelector('.msn-theme-button');

    const accents = {
        Saturday: '#3b82f6',
        Sunday: '#6366f1',
        Monday: '#8b5cf6',
        Tuesday: '#e85d75',
        Wednesday: '#c58a1b',
        Thursday: '#159c92',
        Friday: '#2f9d57'
    };

    try {
        const day = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Tehran',
            weekday: 'long'
        }).format(new Date());

        root.style.setProperty('--msn-accent', accents[day] ?? accents.Saturday);
    } catch {
        root.style.setProperty('--msn-accent', accents.Saturday);
    }

    const savedTheme = localStorage.getItem('msn-theme');
    const initialTheme = savedTheme === 'light' || savedTheme === 'dark'
        ? savedTheme
        : 'dark';

    root.dataset.theme = initialTheme;
    themeButton?.setAttribute('aria-pressed', initialTheme === 'light' ? 'true' : 'false');

    themeButton?.addEventListener('click', () => {
        const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        root.dataset.theme = theme;
        localStorage.setItem('msn-theme', theme);
        themeButton.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    });

    document.querySelectorAll('[data-preview-link]').forEach(link => {
        link.addEventListener('click', event => event.preventDefault());
    });
})();
