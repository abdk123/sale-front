import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { GetNotificationsOutput, GuidEntityDto, NotificationServiceProxy, UserNotification, UserNotificationState } from '@shared/service-proxies/service-proxies';
import { IFormattedUserNotification, UserNotificationHelper } from './UserNotificationHelper';
import * as moment from 'moment';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { finalize } from 'rxjs';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Data } from '@angular/router';
import { result } from 'lodash-es';
import * as _ from 'lodash';
import { Location } from '@angular/common';
@Component({
  selector: 'notifications',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()]
})
export class NotificationComponent extends PagedListingComponentBase<UserNotification> implements OnInit {
  fields = [
    { label: this.l('Text'), name: 'text', sortable: true, type: 'string'  },
    { label: this.l('Time'), name: 'time', sortable: true, type: 'date' , format: 'h:mm a'  },
    { label: this.l('Date'), name: 'time', sortable: true, type: 'date' , format: 'dd MM YYYY' },
    { label: this.l('DateOfBirth'), name: 'dateOfBirth', sortable: true, type: 'date', format: 'dd MM YYYY' },
  ];
  displayMode = 'list';
  readStateFilter = '';
  selectAllState = '';
  color:boolean=false;
  totalItem = 0;
  totalPage = 0;
  currentPage = 1;
  notifications=this.l('notifications')
  itemsPerPage = 10;
  isMove:boolean=false;
  isLoading: boolean;
  ColumnMode = ColumnMode;
  endOfTheList = false;
  deleteIcon = 'bi bi-x-lg';
  deleteLabel = this.l('Delete');
  selected: UserNotification[] = [];
  itemOrder = { label: this.l("Text"), value: "text" };
  itemOptionsOrders = [
    { label: this.l("Text"), value: "text" },
  ];
  title=this.l("AllNotifications");
  data:IFormattedUserNotification[] = [];
  selectedNotification:IFormattedUserNotification;
  tempNotifications:GetNotificationsOutput=new GetNotificationsOutput();
  loaded=false;
  selectedd={};
  constructor(
    injector: Injector,
    private _notificationService: NotificationServiceProxy,
    private _userNotificationHelper: UserNotificationHelper
  ) {
    super(injector);
  }

  reloadPage(): void {
    this.loadData(this.itemsPerPage, this.currentPage);
  }

  ngOnInit(): void {
    this.loadData(this.itemsPerPage, this.currentPage);
  }

  move(id:string)
  {
      this.data.forEach((item:IFormattedUserNotification)=>{
        if(item.userNotificationId==id)
        { this.selectedNotification=item;
          this.isMove=true;

          const notificationId:GuidEntityDto=new GuidEntityDto();
          notificationId.id=item.userNotificationId;
          this._notificationService.setNotificationAsRead( notificationId).subscribe(result=>{
          });


        }
      })
  }
  loadData(pageSize: number = 10, currentPage: number = 1): void {
    let request: GetUserNotificationsInput = new GetUserNotificationsInput();
    this.itemsPerPage = pageSize;
    this.currentPage = currentPage;
    request.skipCount = (currentPage - 1) * pageSize;
    request.maxResultCount = this.itemsPerPage;
    this.list(request, this.pageNumber, () => { });
  }

  protected list(
    request: GetUserNotificationsInput,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    this._notificationService.getUserNotifications(
      // this.readStateFilter === 'ALL' ? UserNotificationState._1 : UserNotificationState._0,
       undefined,
      request.maxResultCount,
      request.skipCount
    ).pipe(
      finalize(() => {
        finishedCallback();
      })
    )
      .subscribe((result) => {
        this.tempNotifications = result;
        _.forEach(result.items, (item: UserNotification) => {
          this.data.push(this._userNotificationHelper.format(<any>item));
        });
        this.loaded=true;
        this.totalItem = result.totalCount;
        this.totalPage = ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;
      });
  }

  onSelect(item: UserNotification): void {
    const isSelected = this.selected.findIndex(x => x.id === item.id) > -1;
    if (isSelected) {
      this.selected = this.selected.filter(x => x.id !== item.id);
    } else {
      this.selected.push(item);
    }
    this.setSelectAllState();
  }

  setSelectAllState(): void {
    // if (this.selected.length === this.data.length) {
    //   this.selectAllState = 'checked';
    // } else if (this.selected.length !== 0) {
    //   this.selectAllState = 'indeterminate';
    // } else {
    //   this.selectAllState = '';
    // }
  }

  pageChanged(event: any): void {
    this.loadData(this.itemsPerPage, event.page);
  }

  setAsRead(record: any): void {
    this.setNotificationAsRead(record, () => {
      this.reloadPage();
    });
  }
  deleteItem(): void {
    if (this.selected.length == 0) {
      abp.message.info(this.l('YouHaveToSelectOneItemInMinimum'));
    }
    else {
      abp.message.confirm(
        this.l('DailyProductionDeleteWarningMessage', this.selected.length, 'DailyProductions'),
        undefined,
        (result: boolean) => {
          // if (result) {
          //   this.selected.forEach(element => {
          //     this._dailyProductionService.delete(element.id).subscribe(() => {
          //       abp.notify.success(this.l('SuccessfullyDeleted'));
          //       this.refresh();
          //     });
          //   });
          // }
        }
      );
    }
  }
  SetAllAsRead()
  {
    this._notificationService.setAllNotificationsAsRead().subscribe((response)=>{
    });
    location.reload();
  }
  isRead(record: any): boolean {
    return record.formattedNotification.state === 'READ';
  }

  fromNow(date: moment.Moment): string {
    return moment(date).fromNow();
  }

  formatRecord(record: any): IFormattedUserNotification {
    return this._userNotificationHelper.format(record, false);
  }

  formatNotification(record: any): string {
    const formattedRecord = this.formatRecord(record);
    return abp.utils.truncateStringWithPostfix(formattedRecord.text, 120);
  }

  formatNotifications(records: any[]): any[] {
    const formattedRecords = [];
    for (const record of records) {
      record.formattedNotification = this.formatRecord(record);
      formattedRecords.push(record);
    }
    return formattedRecords;
  }

  truncateString(text: any, length: number): string {
    return abp.utils.truncateStringWithPostfix(text, length);
  }

  setAllNotificationsAsRead(): void {
    this._userNotificationHelper.setAllAsRead(() => {
      this.loadData();
    });
  }

  openNotificationSettingsModal(): void {
    this._userNotificationHelper.openSettingsModal();
  }

  setNotificationAsRead(userNotification: UserNotification, callback: () => void): void {
    this._userNotificationHelper
      .setAsRead(userNotification.id, () => {
        if (callback) {
          callback();
        }
      });
  }
  onDeleteclick(id:string)
  {
    this.message.confirm(
      this.l('NotificationDeleteWarningMessage'),
      this.l('AreYouSure'),
      (isConfirmed) => {
        if (isConfirmed) {
          this._notificationService.deleteNotification(id)
            .subscribe(() => {
              this.reloadPage();
              this.notify.success(this.l('SuccessfullyDeleted'));
              location.reload()
            });
        }
      }
    );
    this.isMove=false;


  }
  protected delete(userNotification: UserNotification): void {
    this.message.confirm(
      this.l('NotificationDeleteWarningMessage'),
      this.l('AreYouSure'),
      (isConfirmed) => {
        if (isConfirmed) {
          this._notificationService.deleteNotification(userNotification.id)
            .subscribe(() => {
              this.reloadPage();
              this.notify.success(this.l('SuccessfullyDeleted'));

            });
        }
      }
    );
  }
 getRowClass (row:IFormattedUserNotification){

    if(row.isUnread){
    return {
      'row-color': true
    };
  }
  return {'row-color': false};
 }
}

class GetUserNotificationsInput extends PagedRequestDto {
  state: UserNotificationState
}
