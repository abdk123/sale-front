// "Production" enabled environment

export const environment = {
    production: true,
    hmr: false,
    appConfig: 'appconfig.production.json',
    buyUrl: 'https://1.envato.market/6NV1b',
    SCARF_ANALYTICS: false,
    adminRoot: '/app',
    apiUrl: 'https://api.coloredstrategies.com',
    defaultMenuType: 'menu-default',
    subHiddenBreakpoint: 1440,
    menuHiddenBreakpoint: 768,
    themeColorStorageKey: 'vien-themecolor',
    isMultiColorActive: true,
    defaultColor: 'light.blueyale',
    isDarkSwitchActive: true,
    defaultDirection: 'ltr',
    themeRadiusStorageKey: 'vien-themeradius',
    isAuthGuardActive: false,
    firebase: {
        apiKey: 'AIzaSyCqoNLB_jTw4nncO12qR-eDH9gAeWiZVaw',
        authDomain: 'vien-angular-login.firebaseapp.com',
        databaseURL: 'https://vien-angular-login.firebaseio.com',
        projectId: 'vien-angular-login',
        storageBucket: 'vien-angular-login.appspot.com',
        messagingSenderId: '16217062888',
        appId: '1:16217062888:web:6b08232ca0c9662fedb85d',
        measurementId: 'G-8ETT79WRRN'
    }
};
