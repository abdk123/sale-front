import { Component, Injector, Input } from '@angular/core';
import { Router, Event, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html'
})
export class HeadingComponent extends AppComponentBase {
  @Input() title = '';
  path = '';

  constructor(injector: Injector,private router: Router, private activatedRoute: ActivatedRoute) {
    super(injector);
    this.router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      })
    ).subscribe((event) => {
     this.path = this.router.url.split('?')[0];
    });
  }
}
