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
  fromDate: Date = new Date();
  toDate: Date = new Date();

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
    {value:5, text:this.l("DeliveryTransportCost")},
    {value:6, text:this.l("DeliveryCost")},
    {value:7, text:this.l("InitialBalance")},
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
    this._transportCompanyCashFlowService
      .getAllByTransportCompanyId(this.id, this.fromDate.toISOString(), this.toDate.toISOString(),this.currency)
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
    this.refresh();
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
        label: this.l("Date"),
        name: "creationTime",
        sortable: false,
        type: "date"
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
          label: this.l("Balance"),
          name: "currentBalanceDollar",
          sortable: false,
          type: "balance",
        },
        {
          label: this.l("Amount"),
          name: "amountDollar",
          sortable: true,
          type: "balance",
        }
      );
    } else {
      this.fields.unshift(
        
        {
          label: this.l("Balance"),
          name: "currentBalanceDinar",
          sortable: false,
          type: "balance",
        },
        {
          label: this.l("Amount"),
          name: "amountDinar",
          sortable: false,
          type: "balance",
        }
      );
    }
  }
}


