import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'abp-modal-footer',
  templateUrl: './abp-modal-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbpModalFooterComponent extends AppComponentBase {
  @Input() cancelLabel = this.l('Cancel');
  @Input() cancelDisabled: boolean=true;
  @Input() saveLabel = this.l('Save');
  @Input() saveDisabled: boolean=true;
  @Input() saveIcon = 'bi bi-check-lg';
  @Input() cancelIcon = 'bi bi-x-lg';

  @Output() onCancelClick = new EventEmitter<number>();

  constructor(injector: Injector) {
    super(injector);
  }
}
