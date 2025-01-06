const themeToggle = document.getElementById('theme-toggle');

// load theme from local storage
function loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.textContent = 'Switch to Light Mode';
    } else {
        document.body.classList.remove('dark-theme');
        themeToggle.textContent = 'Switch to Dark Mode';
    }
}

// Save preference to local storage
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = 'Switch to Light Mode';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = 'Switch to Dark Mode';
    }
}

themeToggle.addEventListener('click', toggleTheme);
loadTheme();
