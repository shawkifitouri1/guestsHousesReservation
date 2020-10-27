import { GuestHouse } from './../geustHouse.interface';
import { GuestsHouseService } from './../guests-house.service';
import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
// import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, Observer } from 'rxjs';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
@Component({
  selector: 'app-guests-houses-list',
  templateUrl: './guests-houses-list.component.html',
})
export class GuestsHousesListComponent {
  modefying = false;
  validateForm: FormGroup;

  isVisible = false;
  modefiedGuestHouse = {} as GuestHouse;
  modefy = false;
  guestLousesList: GuestHouse[];
  name: string;
    description: string;
    location: string;
  constructor(
    private guestsHouseService: GuestsHouseService,
    private fb: FormBuilder
  ) {
    const { required, maxLength, minLength } = MyValidators;
    this.validateForm = this.fb.group({
      name: ['', [required, maxLength(30), minLength(6)]],
      description: ['', [required, minLength(6), maxLength(30)]],
      location: ['', [required, minLength(6), maxLength(30)]],
    });
  }
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项',
      email: '邮箱格式不正确',
    },
    en: {
      required: 'Input is required',
      email: 'The input is not valid email',
    },
  };

  ngOnInit() {
    this.getHeroes();
  }
  getHeroes(): void {
    this.guestsHouseService
      .getguestLousesList()
      .subscribe((guestLousesList) => (this.guestLousesList = guestLousesList));
  }
  loading = false;
  showModal(): void {
    this.modefying = false;

    this.modefy = false;
    this.isVisible = true;
  }
  showModeficationModal(GuestHoused): void {
    this.modefying = true;

    this.modefiedGuestHouse = GuestHoused;
console.log('guestHouse Mod',this.modefiedGuestHouse);
    this.name=GuestHoused.name;
    this.description=GuestHoused.description;
    this.location=GuestHoused.location;
    // this.modefy=true;
    this.isVisible = true;
    // this.modefying = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
   }



  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  closeModal() {
    this.isVisible = false;
    this.name='';
    this.description='';
    this.location='';

  }
  onAddGuestHouse(guestHouse: GuestHouse) {
    this.guestLousesList.push(guestHouse);
  }
  delete(guestHouse: GuestHouse): void {
    this.guestLousesList = this.guestLousesList.filter((h) => h !== guestHouse);
    this.guestsHouseService.deleteGuestHouse(guestHouse).subscribe();
  }

  cancel(): void {}

  confirm(guestHouse): void {
    this.guestLousesList = this.guestLousesList.filter((h) => h !== guestHouse);
    this.guestsHouseService.deleteGuestHouse(guestHouse).subscribe();

    // this.guestsHouseService.deleteGuestHouse(this.deletedGuestHouseId).subscribe(()=>{this.deleted.emit(false);});
  }

  submitForm(value: {
    name: string;
    description: string;
    location: string;
  }): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    // console.log(this.modefying);
    if (this.modefying) {

    this.modefiedGuestHouse.description = value.description;
    this.modefiedGuestHouse.name = value.name;
    this.modefiedGuestHouse.location = value.location;
    console.log('modified images List',this.modefiedGuestHouse.imagesList);
      this.save();
      // console.log('modefied', this.modefiedGuestHouse);

      this.modefying = false;

      this.modefy = false;
      this.closeModal();

    } else {
      // console.log('sdfsdf', this.modefiedGuestHouse);
      this.guestsHouseService
        .addGuestHouse(value)
        .subscribe((guestHouse) => {
          this.getHeroes();

          this.closeModal();
        });
        this.modefying = false;

        this.modefy = false;
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() =>
      this.validateForm.controls.confirm.updateValueAndValidity()
    );
  }

  nameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<MyValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({
            duplicated: {
              'zh-cn': `用户名已存在`,
              en: `The name is redundant!`,
            },
          });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    }
    return {};
  };

  save(): void {
    this.guestsHouseService
      .updateGuestHouse(this.modefiedGuestHouse)
      .subscribe((guestHouse) => console.log('modefiedGuestHouse', guestHouse));
  this.modefy}

}

// current locale is key of the MyErrorsOptions
export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<
  string,
  NzSafeAny
>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {
  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return {
        minlength: {
          'zh-cn': `最小长度为 ${minLength}`,
          en: `MinLength is ${minLength}`,
        },
      };
    };
  }

  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return {
        maxlength: {
          'zh-cn': `最大长度为 ${maxLength}`,
          en: `MaxLength is ${maxLength}`,
        },
      };
    };
  }
}
