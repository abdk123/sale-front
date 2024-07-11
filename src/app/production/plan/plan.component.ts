import { Component, Injector, OnInit } from '@angular/core';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { PlanDto, PlanServiceProxy, FilterDto, FullPagedRequestDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilterPlanDialogComponent } from './filter-plan/filter-plan-dialog.component';
import { CreatePlanDialogComponent } from './create-plan/create-plan-dialog.component';
import { EditPlanDialogComponent } from './edit-plan/edit-plan-dialog.component';

@Component({
  selector: 'plan',
  templateUrl: './plan.component.html',

})
export class PlanComponent extends FullPagedListingComponentBase<PlanDto> implements OnInit {
  plans: PlanDto[] = [];
  planId: number;
  loadDetails: boolean = false;
  fields = [
    { label: this.l('Title'), type: 'string' ,name: 'title', sortable: true},
    { label: this.l('Duration'), type: 'number',name: 'duration', sortable: true },
    { label: this.l('startDate'), type: 'date', name: 'startDate', sortable: true },
  ];

  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _planService: PlanServiceProxy,
    public bsModalRef: BsModalRef) {
    super(injector);
  }


  protected list(request: FullPagedRequestDto, pageNumber: number, finishedCallback: Function): void {
      this._planService.read(request)
      .subscribe(result => {
        this.plans = result.items;

        this.showPaging(result, pageNumber);
      })
  }

  getPlanIdForChildren(id: number) {
    this.loadDetails = true
    this.planId = id;
  }

  showAddNewModal() {
    let createPlanDialog: BsModalRef;
    createPlanDialog = this._modalService.show(
      CreatePlanDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',

      }
    );
    createPlanDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
  showEditModal(id: any){
    let editPlanDialog: BsModalRef;
    editPlanDialog = this._modalService.show(
      EditPlanDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
        initialState:{
          id:id
        }

      }
    );
    editPlanDialog.content.onSave.subscribe(() => {
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
      FilterPlanDialogComponent,
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
    //   ViewPlanDialogComponent,
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
        this.l('PlanDeleteWarningMessage',  'Plans'),
        undefined,
        (result: boolean) => {
          if (result) {
            this._planService.delete(id).subscribe(() => {
              abp.notify.success(this.l('SuccessfullyDeleted'));
              this.refresh();
            });
          }
        }
      );
    
  }

}




