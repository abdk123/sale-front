import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: "print-offer",
  templateUrl: "./print-offer.component.html",
  styleUrls: ["./print-offer.component.scss"],
})
export class PrintOfferComponent extends AppComponentBase implements OnInit {
  id: number;

  constructor(injector: Injector, private _route: ActivatedRoute) {
    super(injector);
  }

  ngOnInit(): void {
    this.id = this._route.snapshot?.params?.id;
  }
}
