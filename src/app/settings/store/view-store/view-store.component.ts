import { Component, OnInit } from '@angular/core';
import { StoreDto, StoreServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: "view-store",
  templateUrl: "./view-store.component.html",
})
export class ViewStoreComponent implements OnInit {
  store = new StoreDto();
  id: number;
  editable: true;
  constructor(
    private _storeService: StoreServiceProxy,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.initStore(this.id);
  }

  initStore(id: number) {
    this._storeService.get(id).subscribe((result) => {
      this.store = result;
    });
  }
}
