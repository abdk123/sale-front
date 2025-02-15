import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output, QueryList, Renderer2, SimpleChanges, ViewChildren } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { BtSortableHeader, SortEvent } from '@shared/directives/bt-sortable-header.directive';
import { IPageField, IPageMenu } from '../page-default/page-field';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommaNumberPipe } from '@shared/pipes/comma-number.pipe';

@Component({
  selector: "app-page-grid",
  templateUrl: "./page-grid.component.html",
  styleUrls: ["./page-grid.component.scss"],
})
export class PageGridComponent extends AppComponentBase implements OnChanges {
  @ViewChildren(BtSortableHeader) headers: QueryList<BtSortableHeader>;

  @Input() fields: IPageField[] = [];
  @Input() data = [];
  @Input() displayMode = "table";
  @Input() totalItems: number;
  @Input() pageNumber: number;
  @Input() pageSize: number;
  @Input() coloredBy: string;
  @Input() hasDetails: boolean = false;
  @Input() IsOutputRequest: boolean = false;
  @Input() EditPermission: string = "";
  @Input() DeletePermission: string = "";
  @Input() ViewButton: boolean = true;
  @Input() cashFlowButton: boolean = false;
  @Input() PrintButton: boolean = false;
  @Input() menuItems: IPageMenu[] = [];
  @Input() colors = ['table-danger','table-primary','table-secondary','table-success'];

  @Output() changeOrderBy: EventEmitter<string> = new EventEmitter();
  @Output() changePage: EventEmitter<any> = new EventEmitter();
  @Output() ParentId: EventEmitter<any> = new EventEmitter();
  @Output() editItem: EventEmitter<any> = new EventEmitter();
  @Output() deleteItem: EventEmitter<any> = new EventEmitter();
  @Output() viewItem: EventEmitter<any> = new EventEmitter();
  @Output() ViewCashFlow: EventEmitter<any> = new EventEmitter();
  @Output() ViewPrint: EventEmitter<any> = new EventEmitter();
  @Output() onSelectMenuItem: EventEmitter<any> = new EventEmitter();
  
  selected = {};
  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _datePipe: DatePipe
  ) {
    super(injector);
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });

    if (direction === "") {
      this.changeOrderBy.emit("");
    } else {
      const orderBy = `${column} ${direction}`;
      this.changeOrderBy.emit(orderBy);
      return direction === "asc" ? "desc" : "asc";
    }
  }
  onEditItem(id: number): void {
    this.editItem.emit(id);
  }

  onDeleteItem(id: number) {
    this.deleteItem.emit(id);
  }
  onViewItem(id: number) {
    this.viewItem.emit(id);
  }
  viewCashFlow(id: number) {
    this.ViewCashFlow.emit(id);
  }

  viewPrint(id: number) {
    this.ViewPrint.emit(id);
  }

  getParentId(id: number) {
    if (id) {
      //make all element false except the selected one
      Object.keys(this.selected).forEach((key) => {
        if (+key !== id) {
          this.selected[+key] = false;
        }
      });
      this.selected[id] = !this.selected[id];
      if (this.selected[id] == true) this.ParentId.emit(id);
      else this.ParentId.emit(undefined);
    }
  }
  pageChanged(event: any): void {
    this.changePage.emit(event.page);
  }

  getValue(item, field: IPageField) {
    if (field.type === "template") {
      return this.getTemplateValue(item, field);
    }

    let value = "";
    if (field.type === "compound") {
      value = this.getCompoundValue(item, field);
    } else {
      value = this.getSimpleValue(item, field);
    }
    return `<span>${value}<span>`;
  }

  getSimpleValue(item, field: IPageField) {
    switch (field.type) {
      case "date":
        return this.getDateValue(item, field);
      case "number":
        return this.getNumberValue(item, field);
      case "reference":
        return this.getReferenceValue(item, field);
      case "enum":
        return this.getEnumValue(item, field);
      case "balance":
        return this.getBalanceValue(item, field);
      default:
        return (field.name && item[field.name]) ? item[field.name] : "....";
    }
  }

  getDateValue(item, field: IPageField) {
    let format = field.format ? field.format : "dd-MM-yyyy";
    let value = this._datePipe.transform(item[field.name], format);
    return value;
  }

  getReferenceValue(item, field: IPageField) {
    if (!item || !item[field.name]) {
      return "";
    }
    var referenceItem = item[field.name];
    var textField = field.referenceTextField;
    var value = referenceItem[textField];
    return value;
  }
  getEnumValue(item, field: IPageField) {
    var index = item[field.name];
    return field.enumValue.find((x) => x.value == index).text;
  }

  getNumberValue(item, field: IPageField) {
    return new CommaNumberPipe()
    .transform(item[field.name]);
  }

  getBalanceValue(item, field: IPageField) {
    return this.getBalance(item[field.name]);
  }


  getTemplateValue(item, field: IPageField) {
    let template = field.templateValue;
    for (let i = 0; i < this.fields.length; i++) {
      const text = "$" + this.fields[i].name;
      if (template.includes(text)) {
        var value = this.getSimpleValue(item, this.fields[i]);
        template = template.replace(text, value);
      }
    }
    return template;
  }

  getCompoundValue(item, field: IPageField) {
    let value = "";
    var names = field.compoundValue.split(",");
    for (let i = 0; i < names.length; i++) {
      var subField = this.fields.find((x) => x.name == names[i]);
      if (subField) {
        value += this.getSimpleValue(item, subField);
        if (i < names.length - 1) {
          value += " ";
        }
      }
    }
    return value;
  }

  getClassForRow(item): string {
    let classes = this.selected[item.index] ? "highlighted-row" : "";
    if(this.coloredBy){
      var index = item[this.coloredBy];
      if(index > -1)
        classes = classes + ' ' + this.colors[index];
    }
    return classes;
  }

  selectMenuItem(id:number,name:string){
    this.onSelectMenuItem.emit({id:id,name:name});
  }

  initialColor(item): string{
    
    

    return '';
  }
}
