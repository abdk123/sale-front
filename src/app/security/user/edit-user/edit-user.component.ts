import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { RoleNameDto, RoleServiceProxy, UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent extends AppComponentBase implements OnInit  {
  saving = false;
  user =  new UserDto();
  roles: RoleNameDto[] = [];
  isChecked: boolean;
  tempRoles: string[] = [];
  id: number;
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
    this.initialUser();

  }

  initialUser(){
    this._userService.get(this.id)
    .subscribe((result)=>{
      this.user = result;
      this.initialRoles();
    });
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

    this.user.roleNames.forEach((element)=>{
      let parent = this.items[0].children.find(x=>x.value.toString().toLowerCase() == element.toString().toLowerCase());
      if(parent){
        parent.checked = true;
      }
    });
    if(this.items[0].children.every(a=>a.checked == true)){
      this.items[0].checked = true;
    }
  }

  save(): void {
    if(this.tempRoles.length != 0){
    this.user.roleNames = this.tempRoles;
    }
    this.saving = true;
    this._userService.update(
        this.user
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.bsModalRef.hide();
      });
  }

  onSelectedChange(event): void {
    this.tempRoles = event;
  }
}
