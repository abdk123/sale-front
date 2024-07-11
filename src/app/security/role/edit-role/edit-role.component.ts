import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { PermissionDtoListResultDto, RoleDto, RoleServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { Location } from '@angular/common';
import { finalize } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent extends AppComponentBase implements OnInit {
  saving = false;
  id:number
  permissions: PermissionDtoListResultDto = new PermissionDtoListResultDto();
  role: RoleDto = new RoleDto();
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
    private _location: Location,
    private _route:ActivatedRoute

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.initialRole(this.id);
  }

  initialRole(id){
    console.log(id)
    this._roleService.get(id)
    .subscribe((result)=>{
      this.role = result;
      console.log(this.role)
      this.initialPermissions();
    })
  }

  initialPermissions() {
    this._roleService.getAllPermissions()
      .subscribe(result => {
        console.log(result)
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
    });


    this.role.grantedPermissions.forEach((element)=>{
      let parent = this.items[0].children.find(x=>x.children.find(y=>y.value.toString() == element.toString()));
      parent.children.find(q=>q.value.toString() == element.toString()).checked = true;
    });

    this.items[0].children.forEach((element)=>{

      if (element.children.every(a=>a.checked == true)) {
        element.checked = true;
      }
    });
    if(this.items[0].children.every(a=>a.checked == true)){
      this.items[0].checked = true;
    }

  }

  backToAllroles() {
    this._location.back();
  }

  save(): void {
    if(this.tempRoles.length != 0){
      this.role.grantedPermissions = this.tempRoles;
    }
    this.saving = true;
    this._roleService
      .update(
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
