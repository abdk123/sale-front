import { Component, Injector, OnInit } from '@angular/core';
import { FilterDto, FullPagedRequestDto, UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { FilterUserDialogComponent } from './filter-user/filter-user-dialog.component';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
})
export class UserComponent extends FullPagedListingComponentBase<UserDto> implements OnInit {
  users: UserDto[] = [];
  userId: number;
  loadDetails: boolean = false;
  fields = [
    { label: this.l('FullName'), type: 'string', name: 'fullName', sortable: false },
    { label: this.l('UserName'), type: 'string', name: 'userName', sortable: true },
    { label: this.l('EmailAddress'), type: 'string', name: 'emailAddress', sortable: true },
    { label: this.l('Role'), type: 'string', name: 'roleNames', sortable: false },
  ];

  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _userService: UserServiceProxy,
    public bsModalRef: BsModalRef) {
    super(injector);
  }


  protected list(request: FullPagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._userService.read(request)
      .subscribe(result => {
        this.users = result.items;

        this.showPaging(result, pageNumber);
      })
  }

  getUserIdForChildren(id: number) {
    this.loadDetails = true
    this.userId = id;
  }

  showAddNewModal() {
    let createUserDialog: BsModalRef;
    createUserDialog = this._modalService.show(
      CreateUserComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-xl',

      }
    );
    createUserDialog.onHide.subscribe((e) => {
      this.refresh();
    });
  }
  showEditModal(id: any) {
    let editUserDialog: BsModalRef;
    editUserDialog = this._modalService.show(
      EditUserComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
        initialState: {
          id: id
        }

      }
    );
    editUserDialog.onHide.subscribe(() => {
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
      FilterUserDialogComponent,
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

  showViewModal(id: number) {

    // this._modalService.show(
    //   ViewUserDialogComponent,
    //   {
    //     backdrop: true,
    //     ignoreBackdropClick: true,
    //     initialState: {
    //       id: id,
    //     },
    //   }
    // );

  }

  deleteItem(id: number): void {


    abp.message.confirm(
      this.l('UserDeleteWarningMessage', 'Users'),
      undefined,
      (result: boolean) => {
        if (result) {
          this._userService.delete(id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );

  }

}




