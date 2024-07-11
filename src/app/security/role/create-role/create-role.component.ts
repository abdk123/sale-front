import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateRoleDto, RoleServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { Location } from '@angular/common';
import { PermissionDtoListResultDto } from './../../../../shared/service-proxies/service-proxies';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';

@Component({
  selector: 'create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent extends AppComponentBase implements OnInit {
  saving = false;
  permissions: PermissionDtoListResultDto = new PermissionDtoListResultDto();
  role: CreateRoleDto = new CreateRoleDto();
  tempRoles: string[] = [];
  items: TreeviewItem[] = [];
  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 300,
  });


  constructor(injector: Injector,
    private _roleService: RoleServiceProxy,
    public bsModalRef: BsModalRef,
    private _location: Location

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initialPermissions();
  }

  initialPermissions() {
    this._roleService.getAllPermissions()
      .subscribe(result => {
        this.permissions = result;
        this.initialItems();
      });
  }

  initialItems() {
    this.permissions.items.forEach(element => {
      if (this.items.length == 0) {
        this.items.push(
          new TreeviewItem({
            text: "All",
            value: "",
            checked: false,
            children: [] = [
              new TreeviewItem({
                text: element.name.split('.')[1],
                value: "",
                checked: false,
                children: [new TreeviewItem({
                  text: element.displayName,
                  value: element.name,
                  checked: false,
                  children: []
                })]
              })
            ]
          })
        )
      }
      else if (!this.items[0].children.some((x) => x.text == element.name.split('.')[1])) {
        this.items[0].children.push(
          new TreeviewItem({
            text: element.name.split('.')[1],
            value: "",
            checked: false,
            children: [new TreeviewItem({
              text: element.displayName,
                  value: element.name,
              checked: false,
              children: []
            })]
          })
        );
      }
      else if(this.items[0].children.some((x) => x.text == element.name.split('.')[1])){
        this.items[0].children.find(s=>s.text.toString() == element.name.split('.')[1].toString()).children
        .push(
          new TreeviewItem({
            text: element.displayName,
            value: element.name,
            checked: false,
            children: []
          })
        );
      }
    })
  }

  backToAllroles() {
    this._location.back();
  }

  save(): void {
    this.role.grantedPermissions = this.tempRoles;
    this.saving = true;
    this._roleService
      .create(
        this.role
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response: any) => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.backToAllroles();
      });
  }

  onSelectedChange(event): void {
    this.tempRoles = event;
  }
}
