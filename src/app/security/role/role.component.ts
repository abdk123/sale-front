import { Component, Injector, OnInit } from '@angular/core';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { RoleDto, RoleServiceProxy, FilterDto, FullPagedRequestDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateRoleComponent } from './create-role/create-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { FilterRoleDialogComponent } from './filter-role/filter-role-dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'role',
  templateUrl: './role.component.html',

})
export class RoleComponent extends FullPagedListingComponentBase<RoleDto> implements OnInit {
  roles: RoleDto[] = [];
  roleId: number;
  loadDetails: boolean = false;
  fields = [
    { label: this.l('Name'), type: 'string' ,name: 'name', sortable: true},
    { label: this.l('DisplayName'), type: 'string',name: 'displayName', sortable: true },



  ];

  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _roleService: RoleServiceProxy,
    private _router:Router,
    public bsModalRef: BsModalRef) {
    super(injector);
  }


  protected list(request: FullPagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._roleService.read(request)
      .subscribe(result => {
        this.roles = result.items;
        console.log(this.roles)
        this.showPaging(result, pageNumber);
      })
  }

  getRoleIdForChildren(id: number) {
    this.loadDetails = true
    this.roleId = id;
  }

  showAddNewModal(): void {
    this._router.navigate(['app/security/newRole']);
  }
  showEditModal(id: any){
    this._router.navigate(['app/security/editRole',id]);
  }
  showFilterDialog(status) {
    if (status == 'clear_filter') {
      this.request.filtering = undefined;
      this.refresh();
      return;
    }
    let filterDialog: BsModalRef;
    filterDialog = this._modalService.show(
      FilterRoleDialogComponent,
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
    //   ViewRoleDialogComponent,
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
        this.l('RoleDeleteWarningMessage',  'Roles'),
        undefined,
        (result: boolean) => {
          if (result) {
            this._roleService.delete(id).subscribe(() => {
              abp.notify.success(this.l('SuccessfullyDeleted'));
              this.refresh();
            });
          }
        }
      );

  }

}




