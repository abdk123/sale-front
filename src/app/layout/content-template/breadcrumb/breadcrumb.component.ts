import { Component, Injector, Input } from '@angular/core';
import { Router, Event, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';
import { environment } from 'environments/environment';
import { filter, map } from 'rxjs/operators';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import menuItems, { IMenuItem } from 'app/app-menu';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})

export class BreadcrumbComponent extends AppComponentBase {
  @Input() title = '';
  menuItems: IMenuItem[]=menuItems;

  path = '';
  pathArr: string[] = [];

  constructor(injector:Injector,private router: Router, private activatedRoute: ActivatedRoute,private sidebarCom : SidebarComponent) {
    super(injector);
    //this.menuItems = sidebarCom.menuItems;
    this.menuItems = [] = menuItems;
    this.router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      })
    ).subscribe((event) => {
      this.path = this.router.url.slice(1, this.router.url.split('?')[0].length);
      const paramtersLen = Object.keys(event.snapshot.params).length;
      this.pathArr = this.path.split('/').slice(0, this.path.split('/').length - paramtersLen);
    });
  }

  getUrl = (sub: string) => {
    return '/' + this.path.split(sub)[0] + sub;
  }

  getLabel(path:any): string {
    if (path === environment.adminRoot) {
      return "app";
    }

    // step 0
    let foundedMenuItem = this.menuItems.find(x => x.to === path);

    if (!foundedMenuItem) {
      // step 1
      this.menuItems.map(menu => {
        if (!foundedMenuItem && menu.subs) {foundedMenuItem = menu.subs.find(x => x.to === path); }
      });
      if (!foundedMenuItem) {
        // step 2
        this.menuItems.map(menu => {
          if (menu.subs) {
            menu.subs.map(sub => {
                if (!foundedMenuItem && sub.subs) {foundedMenuItem = sub.subs.find(x => x.to === path); }
              });
          }
        });
        if (!foundedMenuItem) {
          // step 3
          this.menuItems.map(menu => {
            if (menu.subs) {
              menu.subs.map(sub => {
                if (sub.subs) {
                  sub.subs.map(deepSub => {
                    if (!foundedMenuItem && deepSub.subs) {foundedMenuItem = deepSub.subs.find(x => x.to === path); }
                  });
                }
              });
            }
          });
        }
      }
    }

    if (foundedMenuItem) { return (foundedMenuItem.label); } else { return ''; }
  }

}
