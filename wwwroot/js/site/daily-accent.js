(() => {
    const root = document.documentElement;
    const label = document.querySelector('[data-accent-label]');

    const dayMap = {
        Sat: { key: 'sat', en: 'Saturday accent', fa: 'رنگ روز شنبه' },
        Sun: { key: 'sun', en: 'Sunday accent', fa: 'رنگ روز یکشنبه' },
        Mon: { key: 'mon', en: 'Monday accent', fa: 'رنگ روز دوشنبه' },
        Tue: { key: 'tue', en: 'Tuesday accent', fa: 'رنگ روز سه‌شنبه' },
        Wed: { key: 'wed', en: 'Wednesday accent', fa: 'رنگ روز چهارشنبه' },
        Thu: { key: 'thu', en: 'Thursday accent', fa: 'رنگ روز پنجشنبه' },
        Fri: { key: 'fri', en: 'Friday accent', fa: 'رنگ روز جمعه' }
    };

    try {
        const iranWeekday = new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
            timeZone: 'Asia/Tehran'
        }).format(new Date());

        const accent = dayMap[iranWeekday] ?? dayMap.Sat;
        root.dataset.accentDay = accent.key;

        if (label) {
            const isPersian = document.documentElement.lang.toLowerCase().startsWith('fa');
            label.textContent = isPersian ? accent.fa : accent.en;
        }
    } catch {
        root.dataset.accentDay = 'sat';
    }
})();
