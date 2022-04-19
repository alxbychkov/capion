export function changeDocumentTheme(theme) {
    const lightTheme = {
        '--green-color': '#92df95',
        '--background-color': '#E1E0DD',
        '--text-color': '#000',
        '--border-shadow-color': 'rgba(0, 0, 0, 0.15)'
    }

    const root = document.documentElement;

    switch (theme) {
        case 'dark':
            Object.keys(lightTheme).forEach(key => root.style.setProperty(key, ''));
            break;
        case 'light':
            Object.keys(lightTheme).forEach(key => root.style.setProperty(key, lightTheme[key]));
            break;
    }
}