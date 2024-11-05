import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEnumValue, IPageMenu } from '@app/layout/content-template/page-default/page-field';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { FilterDto, FilterRuleDto, FullPagedRequestDto, InvoiceDto, InvoiceServiceProxy, ReceivingDto, ReceivingDtoPagedResultDto, ReceivingServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'receiving',
  templateUrl: './receiving.component.html',
  styleUrls: ['./receiving.component.scss']
})
export class ReceivingComponent extends PagedListingComponentBase<ReceivingDto> implements OnInit {
  
  displayOptionsCollapsed = false;
  showItemsPerPage = true;
  pageSize =10;
  itemOptionsPerPage = [5,10,20];
  selectedOptionIndex: number = 0; 
  invoiceId: number;
  keyword = '';
  receives: ReceivingDto[] = [];
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
  protected list(request: PagedReceiveRequestDto, pageNumber: number, finishedCallback: Function): void {
    this.invoiceId = this.route.snapshot?.params?.invoiceId;
    request.invoiceId =  this.invoiceId;
    request.keyword = this.keyword;
    this.receivingService.getAll(
      request.keyword,
      request.invoiceId,
      '',
      request.skipCount,
      request.maxResultCount
    )
    .pipe(
      finalize(() => {
        finishedCallback();
      })
    )
    .subscribe((result:ReceivingDtoPagedResultDto) => {
      this.receives = result.items;
      this.totalItems = result.totalCount;
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

  delete(entity: ReceivingDto): void {
    abp.message.confirm(
      this.l('InvoiceDeleteWarningMessage',  'Invoices'),
      undefined,
      (result: boolean) => {
        if (result) {
          this.invoiceService.delete(entity.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }
  
  onChangeItemsPerPage(item): void  {
    this.selectedOptionIndex = this.itemOptionsPerPage.findIndex((x) => x === item);
    this.pageSize = this.itemOptionsPerPage[this.selectedOptionIndex];
    this.refresh();
  }

  showViewModal(id:number){
    
  }
  
  searchKeyUp(event): void {
    this.keyword = event.target.value.toLowerCase().trim();
    this.refresh();
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

class PagedReceiveRequestDto extends PagedRequestDto {
  keyword: string;
  invoiceId: number | null;
}
