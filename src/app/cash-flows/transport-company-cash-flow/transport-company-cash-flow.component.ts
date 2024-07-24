import { DatePipe } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { TransportCompanyCashFlowDto, TransportCompanyCashFlowServiceProxy, FullPagedRequestDto } from '@shared/service-proxies/service-proxies';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: "transport-company-cash-flow",
  templateUrl: "./transport-company-cash-flow.component.html",
})
export class TransportCompanyCashFlowComponent
  extends FullPagedListingComponentBase<TransportCompanyCashFlowDto>
  implements OnInit
{
  cashFlows: TransportCompanyCashFlowDto[] = [];
  id: number;
  fromDate: string;
  toDate: string;

  TransactionNames = [
    {
      value: 0,
      text: this.l("Spend"),
    },
    {
      value: 1,
      text: this.l("Receive"),
    },
  ];

  fields = [
    {
      label: this.l("Number"),
      name: "id",
      sortable: true,
      type: "number",
    },
    {
      label: this.l("TransactionName"),
      name: "transactionName",
      sortable: true,
      type: "enum",
      enumValue: this.TransactionNames,
    },
    {
      label: this.l("TransportCompany"),
      name: "transportCompany",
      sortable: false,
      type: "reference",
      referenceTextField: "name",
    },
    {
      label: this.l("AmountDollar"),
      name: "amountDollar",
      sortable: true,
      type: "number",
    },
    {
      label: this.l("CurrentBalanceDollar"),
      name: "currentBalanceDollar",
      sortable: true,
      type: "number",
    },
    {
      label: this.l("AmountDinar"),
      name: "amountDinar",
      sortable: true,
      type: "number",
    },
    {
      label: this.l("CurrentBalanceDinar"),
      name: "currentBalanceDinar",
      sortable: true,
      type: "number",
    },
    {
      label: this.l("TransactionDetails"),
      name: "transactionDetails",
      sortable: true,
      type: "string",
    },
    {
      label: this.l("Note"),
      name: "note",
      sortable: true,
      type: "string",
    },
  ];

  constructor(
    injector: Injector,
    private _transportCompanyCashFlowService: TransportCompanyCashFlowServiceProxy,
    public bsModalRef: BsModalRef,
    private _route: ActivatedRoute
  ) {
    super(injector);
    this.id = this._route.snapshot?.params?.id;
  }
  protected list(
    request: FullPagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    let fromDate = undefined;
    if (this.fromDate != undefined) {
      fromDate = new DatePipe("en-US").transform(this.fromDate, "MM/dd/yyyy");
    }

    let toDate = undefined;
    if (this.toDate != undefined) {
      toDate = new DatePipe("en-US").transform(this.toDate, "MM/dd/yyyy");
    }

    this._transportCompanyCashFlowService
      .getAllByTransportCompanyId(this.id, fromDate, toDate)
      .subscribe((result) => {
        this.cashFlows = result;
      });
  }

  showViewModal(id: number) {
    // this._modalService.show(ViewTransportCompanyCashFlowDialogComponent, {
    //   backdrop: true,
    //   ignoreBackdropClick: true,
    //   initialState: {
    //     id: id,
    //   },
    // });
  }
}



