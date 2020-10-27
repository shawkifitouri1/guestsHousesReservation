import { GuestsHouseService } from './../guests-house.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html'
})
export class DeleteConfirmComponent {
  @Input() deletedGuestHouseId: number; // decorate the property with @Input()
  @Output() deleted = new EventEmitter<Boolean>();

  constructor(private guestsHouseService:GuestsHouseService) {}

  cancel(): void {
  }

  confirm(): void {
    this.guestsHouseService.deleteGuestHouse(this.deletedGuestHouseId).subscribe(()=>{this.deleted.emit(false);});
  }

}
