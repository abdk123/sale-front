// import { Component, EventEmitter, Injector, Input, Output, Renderer2 } from '@angular/core';
// import {
//   CdkDragDrop,
//   moveItemInArray,
//   transferArrayItem
// } from "@angular/cdk/drag-drop";
// import { forEach } from 'lodash-es';
// import { AppComponentBase } from '@shared/app-component-base';


// export class ItemWithPermission {
//   item: any;
//   insertable: boolean;
//   editable: boolean;
//   deleteable: boolean;
// }

// @Component({
//   selector: 'app-two-list-drag-and-drop',
//   templateUrl: './two_list_drag_and_drop.component.html',
// })
// export class TwoListDragAndDropComponent extends AppComponentBase {

//   @Input() avaliableList = {} as Array<any>;
//   @Input() selectedList = {} as Array<any>;
//   @Input() buttonNames = {} as Array<string>;



//   constructor(injector: Injector, private renderer: Renderer2) {
//     super(injector);

//     // this.avaliableList = [{id:1,name:'Adminff ffffff fffffff fffffff ffff'},{id:2,name:'User'},{id:3,name:'Customer'},{id:4,name:'CustomPermission'},{id:5,name:'Test'},{id:1,name:'Admin'},{id:2,name:'User'},{id:3,name:'Customer'},{id:4,name:'CustomPermission'},{id:5,name:'Test'},{id:1,name:'Admin'},{id:2,name:'User'},{id:3,name:'Customer'},{id:4,name:'CustomPermission'},{id:5,name:'Test'},{id:1,name:'Admin'},{id:2,name:'User'},{id:3,name:'Customer'},{id:4,name:'CustomPermission'},{id:5,name:'Test'}];
//     this.avaliableList = [];
//     this.selectedList = [];

//   }


//   Permissions = [];



//   @Output() getPermissions = new EventEmitter();

//   getList() {
//     this.getPermissions.emit(this.Permissions);
//   }

//   Save() {
//     this.selectedList.forEach(element => {
//       let el = document.getElementById(element.name + 'INS');
//       if (el.classList.contains('is-insertable')) {
//         // insert Permission Granted
//         alert(element.name + ' Insert Granted');
//       }
//       el = document.getElementById(element.name + "EDI")
//       if (el.classList.contains('is-editable')) {
//         // edit Permission Granted
//         alert(element.name + ' Edit Granted');

//       }
//       el = document.getElementById(element.name + "DEL")
//       {
//         if (el.classList.contains('is-deleteable')) {
//           // delete Permission Granted
//           alert(element.name + ' Delete Granted');

//         }
//       }
//     });
//   }



//   MoveAllForward() {
//     this.avaliableList.forEach(element => {
//       this.selectedList.push(element);
//     });
//     this.avaliableList = [];
//   }

//   MoveAllBackward() {
//     this.selectedList.forEach(element => {
//       this.avaliableList.push(element);
//     });
//     this.selectedList = [];
//   }

//   MoveOneForward() {
//     if (!this.selectedList.includes(this.selectedItem)) {
//       this.selectedList.push(this.selectedItem);

//       const index = this.avaliableList.indexOf(this.selectedItem, 0);
//       if (index > -1) {
//         this.avaliableList.splice(index, 1);
//       }
//     }
//   }

//   MoveOneBackward() {
//     if (!this.avaliableList.includes(this.selectedItem)) {
//       this.avaliableList.push(this.selectedItem);

//       const index = this.selectedList.indexOf(this.selectedItem, 0);
//       if (index > -1) {
//         this.selectedList.splice(index, 1);
//       }
//     }

//   }


//   MoveSelectedForward() {
//     if (!this.selectedList.includes(this.selectedItem)) {

//       this.selectedItems.forEach(element => {
//         this.selectedList.push(element);
//         const index = this.avaliableList.indexOf(element, 0);
//         if (index > -1) {
//           this.avaliableList.splice(index, 1);
//         }
//       });

//       this.selectedItems = [];

//     }
//   }

//   MoveSelectedBackward() {
//     if (!this.avaliableList.includes(this.selectedItem)) {

//       this.selectedItems.forEach(element => {
//         this.avaliableList.push(element);
//         const index = this.selectedList.indexOf(element, 0);
//         if (index > -1) {
//           this.selectedList.splice(index, 1);
//         }
//       });

//       this.selectedItems = [];

//     }
//   }


//   selectedItem !: any;
//   selectedItems: any[] = [];

//   setSelectedItem(forAvailable: boolean, item: any) {
//     let el: any;
//     if (forAvailable) {
//       el = document.getElementById(item.name + 'AV');
//     }
//     else {
//       el = document.getElementById(item.name + 'SEL');
//     }
//     if (!this.selectedItems.includes(item)) {
//       this.selectedItems.push(item);
//       this.renderer.addClass(el, "selected");
//     }
//     else {
//       const index = this.selectedItems.indexOf(item, 0);
//       if (index > -1) {
//         this.selectedItems.splice(index, 1);
//       }
//       this.renderer.removeClass(el, "selected");
//     }
//   }


//   isSelected(item: any) {
//     if (this.selectedItems.includes(item)) {
//       return true;
//     }
//     else {
//       return false;
//     }
//   }

//   DragPreviewAvaliable(item: any) {
//     if (!this.selectedItems.includes(item)) {
//       this.selectedItems.push(item);
//     }
//     this.selectedItems.forEach(element => {

//       let el = document.getElementById(element.name + 'AV');
//       this.renderer.addClass(el, 'selected-and-dragged');
//     });
//   }

//   DragPreviewSelected(item: any) {
//     if (!this.selectedItems.includes(item)) {
//       this.selectedItems.push(item);
//     }
//     this.selectedItems.forEach(element => {

//       let el = document.getElementById(element.name + 'SEL');
//       this.renderer.addClass(el, 'selected-and-dragged');

//     });
//   }

//   DragEnded() {

//     this.avaliableList.forEach(element => {
//       let el = document.getElementById(element.name + 'AV');
//       this.renderer.removeClass(el, 'selected-and-dragged');
//     });
//     this.selectedList.forEach(element => {
//       let el = document.getElementById(element.name + 'SEL');
//       this.renderer.removeClass(el, 'selected-and-dragged');
//     });
//   }


//   setInsertable() {
//     this.selectedItems.forEach(element => {
//       if (this.selectedList.includes(element)) {



//         let el = document.getElementById(element.name + 'INS');
//         //   this.renderer.addClass(el,'simple-icon-plus');
//         this.renderer.addClass(el, 'is-insertable');
//       }
//     });
//   }

//   removeInsertable() {
//     this.selectedItems.forEach(element => {
//       if (this.selectedList.includes(element)) {
//         let el = document.getElementById(element.name + 'INS');
//         //    this.renderer.removeClass(el,'simple-icon-plus');
//         this.renderer.removeClass(el, 'is-insertable');
//       }
//     });
//   }

//   setAllInsertable() {
//     this.selectedList.forEach(element => {
//       let el = document.getElementById(element.name + 'INS');
//       this.renderer.addClass(el, 'is-insertable');
//     });
//   }

//   removeAllInsertable() {
//     this.selectedList.forEach(element => {
//       let el = document.getElementById(element.name + 'INS');
//       this.renderer.removeClass(el, 'is-insertable');
//     });
//   }


//   setEditable() {
//     this.selectedItems.forEach(element => {
//       if (this.selectedList.includes(element)) {
//         let el = document.getElementById(element.name + 'EDI');
//         // this.renderer.addClass(el,'simple-icon-pencil');
//         this.renderer.addClass(el, 'is-editable');
//       }
//     });
//   }

//   removeEditable() {
//     this.selectedItems.forEach(element => {
//       if (this.selectedList.includes(element)) {
//         let el = document.getElementById(element.name + 'EDI');
//         //    this.renderer.removeClass(el,'simple-icon-pencil');
//         this.renderer.removeClass(el, 'is-editable');
//       }
//     });
//   }

//   setAllEditable() {
//     this.selectedList.forEach(element => {
//       let el = document.getElementById(element.name + 'EDI');
//       this.renderer.addClass(el, 'is-editable');
//     });
//   }

//   removeAllEditable() {
//     this.selectedList.forEach(element => {
//       let el = document.getElementById(element.name + 'EDI');
//       this.renderer.removeClass(el, 'is-editable');
//     });
//   }

//   setDeleteable() {
//     this.selectedItems.forEach(element => {
//       if (this.selectedList.includes(element)) {
//         let el = document.getElementById(element.name + 'DEL');
//         //   this.renderer.addClass(el,'simple-icon-trash');
//         this.renderer.addClass(el, 'is-deleteable');
//       }
//     });
//   }

//   removeDeleteable() {
//     this.selectedItems.forEach(element => {
//       if (this.selectedList.includes(element)) {
//         let el = document.getElementById(element.name + 'DEL');
//         //   this.renderer.removeClass(el,'simple-icon-trash');
//         this.renderer.removeClass(el, 'is-deleteable');
//       }
//     });
//   }

//   setAllDeleteable() {
//     this.selectedList.forEach(element => {
//       let el = document.getElementById(element.name + 'DEL');
//       this.renderer.addClass(el, 'is-deleteable');
//     });
//   }

//   removeAllDeleteable() {
//     this.selectedList.forEach(element => {
//       let el = document.getElementById(element.name + 'DEL');
//       this.renderer.removeClass(el, 'is-deleteable');
//     });
//   }



//   drop(event: CdkDragDrop<string[]>) {
//     if (event.previousContainer === event.container) {
//       moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
//     } else {
//       if (this.selectedItems.length > 0) {
//         this.selectedItems.forEach(element => {
//           if (!event.container.data.includes(element)) {
//             event.container.data.push(element);
//           }
//           const index = event.previousContainer.data.indexOf(element, 0);
//           if (index > -1) {
//             event.previousContainer.data.splice(index, 1);
//           }
//         });
//         this.selectedItems = [];
//       }
//       else {
//         transferArrayItem(
//           event.previousContainer.data,
//           event.container.data,
//           event.previousIndex,
//           event.currentIndex,
//         );
//       }
//     }
//     this.selectedItems = [];

//   }

// }
