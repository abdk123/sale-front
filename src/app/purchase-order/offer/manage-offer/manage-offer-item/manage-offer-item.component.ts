import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ConvertToPurchaseInvoiceDto, CustomerServiceProxy, DropdownDto, MaterialServiceProxy, OfferServiceProxy, SizeDto, StockDto, StockServiceProxy, UnitDto, UpdateOfferItemDto } from '@shared/service-proxies/service-proxies';
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
  sizes: SizeDto[] = [];
  units: UnitDto[] = [];
  stocks: StockDto[] = [];
  customers:DropdownDto[]=[];
  saving = false;
  indexUpdate = -1;
  loading: boolean = false;
  supplierIsRequired = false;
  constructor(
    injector: Injector,
    private materialService: MaterialServiceProxy,
    private offerService: OfferServiceProxy,
    private customerService: CustomerServiceProxy,
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.purchaseInvoiceDto.offerId = this.offerId;
    this.purchaseInvoiceDto.offerItemsIds = [];
    this.initialMaterials();
    this.initialCustomers();
    this.initialItems();
  }

  initialCustomers() {
    this.customerService.getForDropdown().subscribe((result) => {
      this.customers = result;
    });
  }

  initialItems() {
    this.offerService.getItemsByOfferId(this.offerId).subscribe((result) => {
      this.items = result;
      let materialsIds = [];
      this.items.forEach(x=> {materialsIds.push(x.materialId)});

      this.materialService.getAllByIds(materialsIds)
      .subscribe(data=>{
        data.forEach(material => {
          this.initialInfo(material);
        });
      });
    });
  }

  initialInfo(material){
    //Units
    if(this.units.findIndex(x=>x.id == material.unitId) == -1)
      this.units.push(material.unit);
    //Szes
    material.stocks.forEach(stock=>{
      this.sizes = [];
      this.sizes.push(stock.size);
      if(this.stocks.findIndex(x=>x.id == stock.id) == -1)
        this.stocks.push(stock);
    })
  }

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

  getSizeName(sizeId, materilId) {
    debugger;
    return this.stocks.find(x=>x=>x.id == sizeId && x.materialId == materilId)?.size.name;
  }

  getUnitName(materialId) {
    return this.units.find(x=>x=>x.materialId == materialId)?.name;
  }

  getStock(materialId:number){
    var materialStocks = this.stocks.filter(x=>x.materialId == materialId);
    if(materialStocks.length == -1)
      return 0;
    let text = '';
    let totalQuantity = 0;
    materialStocks.forEach(stock=>{
      const count = stock.conversionValue > 0 ? stock.quantity * stock.conversionValue : 0;
      text = this.numberWithCommas(count) + ' ' + stock.size?.name + '-';
      totalQuantity += stock.quantity;
    })
    text = text.substring(0,text.length - 1);
    return `${this.numberWithCommas(totalQuantity)} ${this.getUnitName(materialId)} (${text})`;
  }

  getSaleType(addedBySmallUnit){
    return addedBySmallUnit ? `${this.l("Size")}` : `بالطن`
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
  

