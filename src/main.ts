import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { RootModule } from './root.module';
import { hmrBootstrap } from './hmr';
import { getThemeColor, setThemeColor } from './app/utils/util';

import 'moment/min/locales.min';
import 'moment-timezone';

if (environment.production) {
    enableProdMode();
}
const color = getThemeColor();

import('./assets/css/sass/themes/vien.' + color + '.scss?ngGlobalStyle')
  .then((x) => {
    setThemeColor(color);
    platformBrowserDynamic()
      .bootstrapModule(RootModule)
      .catch((err) => console.error(err));
  })
  .catch(() => {
    setThemeColor(null);
    window.location.reload();
  });


const bootstrap = () => {
    return platformBrowserDynamic().bootstrapModule(RootModule);
};

/* "Hot Module Replacement" is enabled as described on
 * https://medium.com/@beeman/tutorial-enable-hrm-in-angular-cli-apps-1b0d13b80130#.sa87zkloh
 */

if (environment.hmr) {
    if (module['hot']) {
        hmrBootstrap(module, bootstrap); // HMR enabled bootstrap
    } else {
        console.error('HMR is not enabled for webpack-dev-server!');
         ('Are you using the --hmr flag for ng serve?');
    }
} else {
    bootstrap(); // Regular bootstrap
}
