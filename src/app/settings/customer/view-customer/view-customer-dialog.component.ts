import { Component, OnInit } from '@angular/core';
import { CustomerDto, CustomerServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-customer-dialog',
  templateUrl: './view-customer-dialog.component.html',

})
export class ViewCustomerDialogComponent implements OnInit {
  data = new CustomerDto();
  id: number;
  editable: true;
  constructor(public bsModalRef: BsModalRef,
    private _customerService:CustomerServiceProxy, ){}
  ngOnInit(): void {
    this.initCustomer()
  }

  initCustomer(){
    this._customerService.get(this.id).subscribe((response:CustomerDto) => {
     this.data = response;
   });
   }

}
