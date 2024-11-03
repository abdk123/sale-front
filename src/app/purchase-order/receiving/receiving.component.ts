import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEnumValue, IPageMenu } from '@app/layout/content-template/page-default/page-field';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { FilterDto, FilterRuleDto, FullPagedRequestDto, InvoiceDto, InvoiceServiceProxy, ReceivingDto, ReceivingServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'receiving',
  templateUrl: './receiving.component.html',
  styleUrls: ['./receiving.component.scss']
})
export class ReceivingComponent extends FullPagedListingComponentBase<ReceivingDto> implements OnInit {
  
  receives: ReceivingDto[] = [];
  invoiceId
  colors = ['table-danger','table-warning','table-secondary','table-success'];
  status:IEnumValue[]=[
    {value:0,text:this.l("NotPriced")},
    {value:1,text:this.l("PendingReceived")},
    {value:2,text:this.l("PartialReceive")},
    {value:3,text:this.l("Received")}
  ];
  currency:IEnumValue[]=[
    {value:1,text:this.l("Dollar")},
    {value:0,text:this.l("Dinar")},
  ];
  
  menuItems: IPageMenu[] = [
    {
      name:'receive',
      label:'ReveivingMaterials',
      icon:'bi bi-save',
    },
    {
      name:'completeInfo',
      label:'CompleteInfo',
      icon:'bi bi-check-lg',
    }
  ]
  
  
  fields = [
    { label: this.l('PoNumber'), name: 'poNumber', sortable: false, type: 'string' },
    { label: this.l('Status'), name: 'status',  type: 'enum' , enumValue: this.status ,sortable: true },
    { label: this.l('Supplier'), name: 'supplierName', sortable: false, type: 'string' },
    { label: this.l('InvoiceNumber'), name: 'id', sortable: true, type: 'number' },
    { label: this.l('TotalQuantity'), name: 'totalQuantity', sortable: true, type: 'number' },
    { label: this.l('NotReceivedQuantity'), name: 'totalNotReceivedQuantity', sortable: true, type: 'number' },
    { label: this.l('Currency'), name: 'currency',  type: 'enum' , enumValue: this.currency ,sortable: true },
    { label: this.l('CreatorUser'), name: 'creatorUser', sortable: false, type: 'string' },

  ];
  
  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _router: Router,
    private route: ActivatedRoute,
    private invoiceService: InvoiceServiceProxy,
    private receivingService: ReceivingServiceProxy,
    public bsModalRef: BsModalRef) {
    super(injector);
  }
  protected list(request: FullPagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    request.including = "ClearanceCompany,TransportCompany,Invoice,CreatorUser";
    this.invoiceId = this.route.snapshot?.params?.invoiceId;
    var filter = new FilterDto();
    filter.condition = "and";
    filter.rules = [];
    filter.rules.push(FilterRuleDto.fromJS({field:"invoiceId",operator:"=",value:this.invoiceId}));
    request.filtering = filter;
    this.receivingService.read(request)
      .subscribe(result => {
        this.receives = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  showAddNewModal() {
    this._router.navigate([
      "/app/orders/create-receive",
      {
        invoiceId: this.invoiceId
      },
    ]);
  }

  showEditModal(id: any){
    //var orderId = this.receives.find(x=>x.id == id)?.offerId;
    this._router.navigate([
      "/app/orders/edit-invoice",
      {
        invoiceId: this.invoiceId,
        id: id
      },
    ]);
  }

  deleteItem(id:number): void {
    abp.message.confirm(
      this.l('InvoiceDeleteWarningMessage',  'Invoices'),
      undefined,
      (result: boolean) => {
        if (result) {
          this.invoiceService.delete(id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }
  
  showViewModal(id:number){
    
  }
  
    showFilterDialog(status) {
 
    }

    onSelectMenuItem(args){
      if(args.name == "receive"){
        this.addOrEditReceive(args.id);
      }
    }

    addOrEditReceive(invoiceId){
      this._router.navigate([
        "/app/orders/create-receive",
        {
          invoiceId: invoiceId,
        },
      ]);
    }
}

