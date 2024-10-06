import { DatePipe } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPageField } from '@app/layout/content-template/page-default/page-field';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { TransportCompanyCashFlowDto, TransportCompanyCashFlowServiceProxy, FullPagedRequestDto, BalanceInfoDto } from '@shared/service-proxies/service-proxies';
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

  transactionNames = [
    {
      value: 0,
      text: this.l("Spend"),
    },
    {
      value: 1,
      text: this.l("Receive"),
    },
    {value:2, text:this.l("ClearanceCost")},
    {value:3, text:this.l("TransportCost")},
    {value:4, text:this.l("ReceivingCost")},
  ];

  fields: IPageField[] = [];

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
      .getAllByTransportCompanyId(this.id, fromDate, toDate,this.currency)
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
  currentBalance: BalanceInfoDto = new BalanceInfoDto();
  getCurrentBalance(){
    this._transportCompanyCashFlowService.getBalance(this.id)
    .subscribe(result=>{
      this.currentBalance = result;
    })
  }
  onChangeCurrency(item){
    this.currency = item.id;
    this.initialFields();
    this.refresh();
  }

  currency: number = 1;
  currencies = [
    { id: 1, name: this.l("Dollar") },
    { id: 0, name: this.l("Dinar") },
  ];
  ngOnInit(): void {
    this.getCurrentBalance();
    this.initialFields();
  }
  initialFields() {
    this.fields = [];
    this.fields = [
      {
        label: this.l("TransactionName"),
        name: "transactionName",
        sortable: false,
        type: "enum",
        enumValue: this.transactionNames,
      },
      {
        label: this.l("ClearanceCompany"),
        name: "clearanceCompany",
        sortable: false,
        type: "reference",
        referenceTextField: "name",
      },
      {
        label: this.l("Number"),
        name: "id",
        sortable: false,
        type: "number",
      },
      {
        label: this.l("TransactionDetails"),
        name: "transactionDetails",
        sortable: false,
        type: "string",
      }
    ];
    if (this.currency == 1) {
      this.fields.unshift(
        {
          label: this.l("CurrentBalanceDollar"),
          name: "currentBalanceDollar",
          sortable: false,
          type: "balance",
        },
        {
          label: this.l("AmountDollar"),
          name: "amountDollar",
          sortable: true,
          type: "balance",
        }
      );
    } else {
      this.fields.unshift(
        
        {
          label: this.l("CurrentBalanceDinar"),
          name: "currentBalanceDinar",
          sortable: false,
          type: "balance",
        },
        {
          label: this.l("AmountDinar"),
          name: "amountDinar",
          sortable: false,
          type: "balance",
        }
      );
    }
  }
}


