import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`
})
export class RootComponent implements OnInit, AfterViewInit {
    isMultiColorActive = true;
    constructor(private renderer: Renderer2) {
  
    }
  
    ngOnInit(): void {
    }
  
    ngAfterViewInit(): void {
      setTimeout(() => {
        this.renderer.addClass(document.body, 'show');
      }, 1000);
      setTimeout(() => {
        this.renderer.addClass(document.body, 'default-transition');
      }, 1500);
    }
  }