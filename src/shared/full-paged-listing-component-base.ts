import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from './app-component-base';
import { FilterDto, FullPagedRequestDto } from './service-proxies/service-proxies';

export class PagedResultDto {
  items: any[];
  totalCount: number;
}

export class EntityDto {
  id: number;
}


@Component({
  template: ''
})
export abstract class FullPagedListingComponentBase<TEntityDto> extends AppComponentBase implements OnInit {
  public pageSize = 8;
  public pageNumber = 1;
  public totalPages = 1;
  public totalItems: number;
  public isTableLoading = false;
  public request: FullPagedRequestDto = new FullPagedRequestDto();
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.getDataPage(this.pageNumber);
  }

  public showPaging(result: PagedResultDto, pageNumber: number): void {
    this.totalPages = ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;

    this.totalItems = result.totalCount;
    this.pageNumber = pageNumber;
  }

  public getDataPage(page: number): void {
    this.request.maxResultCount = this.pageSize;
    this.request.skipCount = (page - 1) * this.pageSize;

    this.isTableLoading = true;
    this.list(this.request, page, () => {
      this.isTableLoading = false;
    });
  }

  protected abstract list(request: FullPagedRequestDto, pageNumber: number, finishedCallback: Function): void;

  //============
  pageChanged(page: number): void {
    this.pageNumber = page;
    this.refresh();
  }

  onChangePage(perPage: number): void {
    this.pageSize = perPage;
    this.refresh();
  }

  changeOrderBy(sortFields): void {
    this.request.sorting = sortFields;
    this.refresh();
  }
  searchKeyUp(event): void {
    console.log(event.target.value);
    this.request.keyword = event.target.value.toLowerCase().trim();
    this.refresh();
  }

}
