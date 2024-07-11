import { ActivatedRoute, Route, Router } from '@angular/router';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { EmployeeDto, EmployeeServiceProxy, FilterDto, FullPagedRequestDto,ChildDto, ChildServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateChildDialogComponent } from './create-child/create-child-dialog.component';
import { EditChildDialogComponent } from './edit-child/edit-child-dialog.component';

@Component({
  selector: 'children',
  templateUrl: './children.component.html',
})
export class ChildrenComponent extends FullPagedListingComponentBase<ChildDto>  implements OnInit{

  children: ChildDto[] = [];
  employeeId:number;
  loadDetails: boolean=false;
  fields = [
    { label: this.l('FullName'), type: 'compound', compoundValue: 'firstName,lastName' },
    { label: this.l('FirstName'), name: 'firstName', sortable: false, type: 'string' },
    { label: this.l('LastName'), name: 'lastName', sortable: true, type: 'string' },
    { label: this.l('DateOfBirth'), name: 'dateOfBirth', sortable: true, type: 'date', format: 'dd MM YYYY' },
  ];



  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _childService: ChildServiceProxy,
    public bsModalRef: BsModalRef,
    private _route:ActivatedRoute,
    private _router:Router) {
    super(injector);
  }

  ngOnInit(): void {
    this.getEmloyeeId();
    }
    getEmloyeeId() {
      this._route.params.subscribe(params => {
        this.employeeId = params['id']; 
        this.refresh()
      });
    }
  
  protected list(request: FullPagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._childService.getByEmployeeId(this.employeeId)
      .subscribe(result => {
        this.children = result;
        // this.showPaging(result, pageNumber);
      })
  }

  getEmployeeIdForChildren(id: number) {
    this.loadDetails=true
    this.employeeId=id;
  }

  showAddNewModal() {
    let createChildDialog: BsModalRef;
    createChildDialog = this._modalService.show(
      CreateChildDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
        initialState:{
          parentId:this.employeeId
        }

      }
    );
    createChildDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
  showEditModal(id: any){
    let editChildDialog: BsModalRef;
    editChildDialog = this._modalService.show(
      EditChildDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
        initialState:{
          id:id,
          employeeId:this.employeeId
        }

      }
    );
    editChildDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
  showFilterDialog(status) {
    // if (status == 'clear_filter') {
    //   this.request.filtering = undefined;
    //   this.refresh();
    //   return;
    // }
    // let filterDialog: BsModalRef;
    // filterDialog = this._modalService.show(
    //   FilterEmployeeDialogComponent,
    //   {
    //     backdrop: true,
    //     ignoreBackdropClick: true,
    //     initialState: {
    //       filterInput: this.request.filtering,
    //     },
    //     class: 'modal-lg',
    //   }
    // );
    // filterDialog.content.onSave.subscribe((result: FilterDto) => {
    //   this.request.filtering = result;
    //   this._modalService.hide();
    //   this.refresh();
    // });
  }


}
