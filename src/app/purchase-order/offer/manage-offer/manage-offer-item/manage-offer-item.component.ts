import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ConvertToPurchaseInvoiceDto, CustomerServiceProxy, DropdownDto, MaterialServiceProxy, OfferServiceProxy, StockDto, StockServiceProxy, UpdateOfferItemDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs';

@Component({
  selector: 'manage-offer-item',
  templateUrl: './manage-offer-item.component.html',
  styleUrls: ['./manage-offer-item.component.scss']
})
export class ManageOfferItemComponent extends AppComponentBase implements OnInit {
  item: UpdateOfferItemDto = new UpdateOfferItemDto();
  purchaseInvoiceDto: ConvertToPurchaseInvoiceDto = new ConvertToPurchaseInvoiceDto();
  @Output() onSave = new EventEmitter<UpdateOfferItemDto[]>();
  @Input() offerId: number;
  items: UpdateOfferItemDto[] = [];
  materials: DropdownDto[] = [];
  stocks: StockDto[] = [];
  customers:DropdownDto[]=[];
  saving = false;
  indexUpdate = -1;
  supplierIsRequired = false;
  constructor(
    injector: Injector,
    private materialService: MaterialServiceProxy,
    private offerService: OfferServiceProxy,
    private stockService: StockServiceProxy,
    private customerService: CustomerServiceProxy,
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.purchaseInvoiceDto.offerId = this.offerId;
    this.purchaseInvoiceDto.offerItemsIds = [];
    this.initialAllStocks();
    this.initialItems();
    this.initialMaterials();
    this.initialCustomers();
  }

  initialCustomers() {
    this.customerService.getForDropdown().subscribe((result) => {
      this.customers = result;
    });
  }

  initialItems() {
    this.offerService.getItemsByOfferId(this.offerId).subscribe((result) => {
      this.items = result;
    });
  }
  loading: boolean = false;
  initialMaterials() {
    this.materialService.getForDropdown().subscribe((result) => {
      this.materials = result;
    });
  }


  updateItem() {
    this.items[this.indexUpdate].materialId = this.item.materialId;
    this.items[this.indexUpdate].quantity = this.item.quantity;
    this.items[this.indexUpdate].addedBySmallUnit = this.item.addedBySmallUnit;
    this.items[this.indexUpdate].sizeId = this.item.sizeId;
    this.items[this.indexUpdate].unitId = this.item.unitId;
    this.items[this.indexUpdate].unitPrice = this.item.unitPrice;
    this.items[this.indexUpdate].specefecation = this.item.specefecation;
    this.onSave.emit(this.items);
    this.item = new UpdateOfferItemDto();
  }

  addNewItem() {
    this.items.push(this.item);
    this.item = new UpdateOfferItemDto();
    this.onSave.emit(this.items);
  }

  deleteItem(index: number): void {
    var material = this.materials.find(
      (x) => x.id == this.items[index].materialId
    );
    abp.message.confirm(
      this.l("OfferMaterialDeleteWarningMessage", material.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this.items.splice(index, 1);
        }
      }
    );
  }

  getMaterialName(materialId: number) {
    return this.materials.find((x) => x.id == materialId)?.name;
  }

  getUnit(item: UpdateOfferItemDto) {
    if (item.addedBySmallUnit) {
      return this.getMaterialName(item.materialId);
    }
    return this.stocks.find(x=>x=>x.materialId == item.materialId)?.size.name;
  }

  allStocks: StockDto[] = [];
  initialAllStocks(){
    this.stockService.getAll(undefined,undefined,undefined,undefined,undefined,0,100000)
    .subscribe((result)=>{
      this.allStocks = result.items;
    })
  }

  getStock(materialId:number){
    var materialStocks = this.stocks.filter(x=>x.materialId == materialId);

    if(materialStocks.length > -1){
      var valueInLargeUnit = materialStocks.reduce((sum, current) => sum + current.quantity, 0);
      var valueInSmallUnit = materialStocks.reduce((sum, current) => sum + current.numberInSmallUnit, 0);
    }
    return `${valueInLargeUnit}-${valueInSmallUnit}`;
  }

  getSaleType(addedBySmallUnit){
    return addedBySmallUnit ? `${this.l("SmallUnit")}` : `${this.l("LargeUnit")}`
  }

  onCheck(args, offerItemId){
    var checked = args.target.value;
    if(this.purchaseInvoiceDto.offerItemsIds == undefined)
      this.purchaseInvoiceDto.offerItemsIds = [];

    const index = this.checkIfItemExist(offerItemId);
    if(index > -1 && !checked){
      this.purchaseInvoiceDto.offerItemsIds.splice(index,1);
    }else if(index == -1 && checked){{
      this.purchaseInvoiceDto.offerItemsIds.push(offerItemId);
    }
  }
}

  checkIfItemExist(offerItemId){
    const index = this.purchaseInvoiceDto.offerItemsIds.findIndex(id=>id == offerItemId);
    return index;
  }

  convertToPurchaseInvoice(){
    
    this.supplierIsRequired = this.purchaseInvoiceDto.supplierId == undefined ? true : false;
    if (
      !this.supplierIsRequired
    ) {
      
      this.saving = true;
      this.offerService
        .convertToPurchaseInvoice(this.purchaseInvoiceDto)
        .pipe(
          finalize(() => {
            this.saving = false;
          })
        )
        .subscribe((result) => {
          this.notify.info(this.l("SavedSuccessfully"));
            //this._router.navigate(["/app/orders/offers"]);
        });
    }
  }
}
  

