import { Component, HostListener, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'app-application-menu',
  templateUrl: './application-menu.component.html'
})

export class ApplicationMenuComponent extends AppComponentBase {
  isOpen = false;

  constructor(injector: Injector) {
    super(injector);
   }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event): void {
    if (this.isOpen) {
      this.toggle();
    }
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  menuClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
