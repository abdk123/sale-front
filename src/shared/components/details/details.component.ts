import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() ParentId;
  @Input() data: DetailsData[];
  constructor(private _router: Router,) {
  }
  ngOnInit(): void {
  }
  navigateToChildren(route: string) {
 
    if(this.ParentId)
    { 
      this._router.navigate([route, this.ParentId]);}
    }
}

export class DetailsData {
  icon: string;
  label: string;
  destinationRoute: string;
}
