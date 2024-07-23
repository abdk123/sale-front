import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { ClearanceCompanyCashFlowDto, ClearanceCompanyCashFlowServiceProxy, FullPagedRequestDto } from '@shared/service-proxies/service-proxies';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: "clearance-company-cash-flow",
  templateUrl: "./clearance-company-cash-flow.component.html",
})
export class ClearanceCompanyCashFlowComponent
  extends FullPagedListingComponentBase<ClearanceCompanyCashFlowDto>
  implements OnInit
{
  cashFlows: ClearanceCompanyCashFlowDto[] = [];
  id: number;
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
      label: this.l("ClearanceCompany"),
      name: "clearanceCompany",
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
    private _modalService: BsModalService,
    private _clearanceCompanyCashFlowService: ClearanceCompanyCashFlowServiceProxy,
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
    this._clearanceCompanyCashFlowService.getAllByClearanceCompanyId(this.id).subscribe((result) => {
      this.cashFlows = result;
    });
  }

  showViewModal(id: number) {
    // this._modalService.show(ViewClearanceCompanyCashFlowDialogComponent, {
    //   backdrop: true,
    //   ignoreBackdropClick: true,
    //   initialState: {
    //     id: id,
    //   },
    // });
  }
}


