import { DatePipe } from "@angular/common";
import { Component, Injector, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IPageField } from "@app/layout/content-template/page-default/page-field";
import { FullPagedListingComponentBase } from "@shared/full-paged-listing-component-base";
import {
  BalanceInfoDto,
  ClearanceCompanyCashFlowDto,
  ClearanceCompanyCashFlowServiceProxy,
  FullPagedRequestDto,
} from "@shared/service-proxies/service-proxies";
import { result } from "lodash-es";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "clearance-company-cash-flow",
  templateUrl: "./clearance-company-cash-flow.component.html",
  styles: [
    `
      .form-control {
        padding: 0.3rem 0.5rem !important;
      }
    `,
  ],
})
export class ClearanceCompanyCashFlowComponent
  extends FullPagedListingComponentBase<ClearanceCompanyCashFlowDto>
  implements OnInit
{
  cashFlows: ClearanceCompanyCashFlowDto[] = [];
  id: number;
  fromDate: Date = new Date();
  toDate: Date = new Date();

  transactionName = [
    {
      value: 0,
      text: this.l("Spend"),
    },
    {
      value: 1,
      text: this.l("Receipt"),
    },
    {value:2, text:this.l("ClearanceCost")},
    {value:3, text:this.l("TransportCost")},
    {value:4, text:this.l("ReceivingCost")},
    {value:5, text:this.l("DeliveryTransportCost")},
    {value:6, text:this.l("DeliveryCost")},
    {value:7, text:this.l("InitialBalance")},
  ];

  fields:IPageField[] = [];
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
    
    this._clearanceCompanyCashFlowService
      .getAllByClearanceCompanyId(this.id, this.fromDate.toISOString(), this.toDate.toISOString(), this.currency)
      .subscribe((result) => {
        this.cashFlows = result;
      });
  }

  currentBalance: BalanceInfoDto = new BalanceInfoDto();
  getCurrentBalance(){
    this._clearanceCompanyCashFlowService.getBalance(this.id)
    .subscribe(result=>{
      this.currentBalance = result;
    })
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
        enumValue: this.transactionName,
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
