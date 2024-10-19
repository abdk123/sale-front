import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'view-offer-summary',
  templateUrl: './view-offer-summary.component.html',
  styleUrls: ['./view-offer-summary.component.scss']
})
export class ViewOfferSummaryComponent {
  @Input() isOpen = true;

  constructor() {
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