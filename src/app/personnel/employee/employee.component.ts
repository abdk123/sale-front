import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { EmployeeDto, EmployeeServiceProxy, FilterDto, FullPagedRequestDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilterEmployeeDialogComponent } from './filter-employee/filter-employee-dialog.component';
import { CreateEmployeeDialogComponent } from './create-employee/create-employee-dialog.component';
import { EditEmployeeDialogComponent } from './edit-employee/edit-employee-dialog.component';
import { DetailsData } from '@shared/components/details/details.component';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',

})
export class EmployeeComponent extends FullPagedListingComponentBase<EmployeeDto> implements OnInit {
  employees: EmployeeDto[] = [];
  employeeId: number;
  detailData:DetailsData[]=[{
    icon:'simple-icon-people',
    label:'children',
    destinationRoute:"app/personnel/children",
  },
  {
    icon:'simple-icon-people',
    label:'children',
    destinationRoute:"app/personnel/children",
  },
  {
    icon:'simple-icon-people',
    label:'children',
    destinationRoute:"app/personnel/children",
  },
  {
    icon:'simple-icon-people',
    label:'children',
    destinationRoute:"app/personnel/children",
  }]
  loadDetails: boolean = true;
  fields = [
    { label: this.l('FullName'), type: 'compound', compoundValue: 'firstName,lastName' },
    { label: this.l('FirstName'), name: 'firstName', sortable: false, type: 'string' },
    { label: this.l('LastName'), name: 'lastName', sortable: true, type: 'string' },
    { label: this.l('Age'), name: 'age', sortable: true, type: 'number' },
    { label: this.l('DateOfBirth'), name: 'dateOfBirth', sortable: true, type: 'date', format: 'dd MM YYYY' },
  ];

  @ViewChild(FilterEmployeeDialogComponent) child!: FilterEmployeeDialogComponent;

  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _employeeService: EmployeeServiceProxy,
    public bsModalRef: BsModalRef) {
    super(injector);
  }


  protected list(request: FullPagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this.request.including = "Nationality";
    this._employeeService.read(request)
      .subscribe(result => {
        this.employees = result.items;
        this.showPaging(result, pageNumber);
      })
  }

  getEmployeeIdForChildren(id: number) {
    this.loadDetails = true
    this.employeeId = id;
  }

  showAddNewModal() {
    let createEmployeeDialog: BsModalRef;
    createEmployeeDialog = this._modalService.show(
      CreateEmployeeDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',

      }
    );
    createEmployeeDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
  showEditModal(id: any){
    let editEmployeeDialog: BsModalRef;
    editEmployeeDialog = this._modalService.show(
      EditEmployeeDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
        initialState:{
          id:id
        }

      }
    );
    editEmployeeDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
  showFilterDialog(status) {
    if (status == 'clear_filter') {
      this.request.filtering = undefined;
      this.refresh();
      return;
    }
    let filterDialog: BsModalRef;
    filterDialog = this._modalService.show(
      FilterEmployeeDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          filterInput: this.request.filtering,
        },
        class: 'modal-lg',
      }
    );
    filterDialog.content.onSave.subscribe((result: FilterDto) => {
      this.request.filtering = result;
      this._modalService.hide();
      this.refresh();
    });
  }

  showViewModal(id:number){

    // this._modalService.show(
    //   ViewEmployeeDialogComponent,
    //   {
    //     backdrop: true,
    //     ignoreBackdropClick: true,
    //     initialState: {
    //       id: id,
    //     },
    //   }
    // );

  }

  deleteItem(id:number): void {


      abp.message.confirm(
        this.l('EmployeeDeleteWarningMessage',  'Employees'),
        undefined,
        (result: boolean) => {
          if (result) {
            this._employeeService.delete(id).subscribe(() => {
              abp.notify.success(this.l('SuccessfullyDeleted'));
              this.refresh();
            });
          }
        }
      );

  }

}




