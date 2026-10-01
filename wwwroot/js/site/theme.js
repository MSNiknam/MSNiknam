(() => {
    const root = document.documentElement;
    const buttons = document.querySelectorAll('[data-theme-toggle]');
    const themeColor = document.querySelector('meta[name="theme-color"]');

    const setTheme = (theme) => {
        root.dataset.theme = theme;
        localStorage.setItem('msniknam-theme', theme);
        if (themeColor) {
            themeColor.setAttribute('content', theme === 'dark' ? '#090b0d' : '#ffffff');
        }
    };

    const toggleTheme = () => {
        setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
    };

    buttons.forEach((button) => button.addEventListener('click', toggleTheme));

    if (themeColor) {
        themeColor.setAttribute('content', root.dataset.theme === 'dark' ? '#090b0d' : '#ffffff');
    }
})();
