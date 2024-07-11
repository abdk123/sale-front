import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { RoleDto, RoleServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.scss']
})
export class ViewRoleComponent extends AppComponentBase {
  id: number;  
  role: RoleDto = new RoleDto();
  loading: boolean = false;

  constructor(injector: Injector,
    public bsModalRef: BsModalRef,
    private _roleService: RoleServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialRole();
  }

  initialRole(){
    this._roleService.get(this.id)
    .pipe(
      finalize(() => {
        this.loading = true;
      })
    )
    .subscribe(result=>{
      this.role = result;
    })
  }
}
