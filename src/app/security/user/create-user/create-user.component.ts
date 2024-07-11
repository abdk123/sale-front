import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateUserDto, RoleDto, RoleNameDto, RoleServiceProxy, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent extends AppComponentBase implements OnInit {
  saving = false;
  user =  new CreateUserDto();
  roles: RoleNameDto[] = [];
  isChecked: boolean;
  tempRoles: string[] = [];
  items: TreeviewItem[] = [];
  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 300,
  });

  constructor(injector: Injector,
    private _userService: UserServiceProxy,
    private _roleService: RoleServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialRoles();
  }

  initialRoles(){
    this._roleService.getAllRolesNames()
    .subscribe((result)=>{
      this.roles = result;
      this.initialItems();
    });
  }

  initialItems() {
    this.roles.forEach(element => {
      if (this.items.length == 0) {
        this.items.push(
          new TreeviewItem({
            text: "All",
            value: "",
            checked: false,
            children: [] = [
              new TreeviewItem({
                text: element.displayName,
                value: element.name,
                checked: false,
                children: []
              })
            ]
          })
        );
      }
      else if (!this.items[0].children.some((x) => x.text == element.displayName)) {
        this.items[0].children.push(
          new TreeviewItem({
            text: element.displayName,
            value: element.name,
            checked: false,
            children: []
          })
        );
      }
    });
  }

  save(): void {
    this.user.roleNames = this.tempRoles;
    this.saving = true;
    this._userService.
    create(
        this.user
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response:any) => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.bsModalRef.hide();
      });
      // location.reload()
  }

  onSelectedChange(event): void {
    this.tempRoles = event;
  }
}
