(() => {
    'use strict';

    const root = document.documentElement;
    const themeButton = document.querySelector('.msn-theme-button');

    const dailyAccents = {
        Saturday: '#3b82f6',
        Sunday: '#6366f1',
        Monday: '#8b5cf6',
        Tuesday: '#e85d75',
        Wednesday: '#c58a1b',
        Thursday: '#159c92',
        Friday: '#2f9d57'
    };

    function applyIranDailyAccent() {
        try {
            const iranWeekday = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Tehran',
                weekday: 'long'
            }).format(new Date());

            root.style.setProperty(
                '--msn-accent',
                dailyAccents[iranWeekday] || dailyAccents.Saturday
            );
        } catch {
            root.style.setProperty('--msn-accent', dailyAccents.Saturday);
        }
    }

    function getInitialTheme() {
        const savedTheme = localStorage.getItem('msn-theme');

        if (savedTheme === 'dark' || savedTheme === 'light') {
            return savedTheme;
        }

        return window.matchMedia &&
               window.matchMedia('(prefers-color-scheme: light)').matches
            ? 'light'
            : 'dark';
    }

    function applyTheme(theme) {
        root.dataset.theme = theme;

        themeButton?.setAttribute(
            'aria-pressed',
            theme === 'light' ? 'true' : 'false'
        );
    }

    applyIranDailyAccent();
    applyTheme(getInitialTheme());

    themeButton?.addEventListener('click', () => {
        const nextTheme =
            root.dataset.theme === 'dark' ? 'light' : 'dark';

        applyTheme(nextTheme);
        localStorage.setItem('msn-theme', nextTheme);
    });

    document.querySelectorAll('[data-preview-link]').forEach(link => {
        link.addEventListener('click', event => event.preventDefault());
    });
})();
