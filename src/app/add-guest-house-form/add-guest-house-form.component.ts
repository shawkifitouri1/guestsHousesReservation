import { GuestHouse } from './../geustHouse.interface';
import { GuestsHouseService } from './../guests-house.service';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-add-guest-house-form',
  templateUrl: './add-guest-house-form.component.html',
  styleUrls: ['./add-guest-house-form.component.css'],
})
export class AddGuestHouseFormComponent implements OnInit {
  // constructor(private guestsHouseService: GuestsHouseService) {}
  validateForm: FormGroup;
  @Input() modefiedGuestHouse: GuestHouse; // decorate the property with @Input()
  @Input() modefying: Boolean; // decorate the property with @Input()
  @Output() addedGuestHouse = new EventEmitter<GuestHouse>();
  @Output() closeModal = new EventEmitter<Boolean>();
  modefiedGuestHouse2: GuestHouse;
  // current locale is key of the nzAutoTips
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
    this.modefiedGuestHouse2=this.modefiedGuestHouse;
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
    this.modefiedGuestHouse.description = value.description;
    this.modefiedGuestHouse.name = value.name;
    this.modefiedGuestHouse.location = value.location;
    console.log(this.modefying);
    if (this.modefying) {

      this.save();
      console.log('modefied', this.modefiedGuestHouse);
      this.modefying=false;
    } else {
      console.log('sdfsdf', this.modefiedGuestHouse);
      this.guestsHouseService.addGuestHouse(this.modefiedGuestHouse).subscribe(guestHouse => {
        this.addedGuestHouse.emit(guestHouse);
        this.closeModal.emit(false);
      });
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
    //  else if (control.value !== this.validateForm.controls.password.value) {
    //   return { confirm: true, error: true };
    // }
    return {};
  };

  constructor(
    private fb: FormBuilder,
    private guestsHouseService: GuestsHouseService
  ) {
    this.modefiedGuestHouse2=this.modefiedGuestHouse;

    const { required, maxLength, minLength } = MyValidators;
    this.validateForm = this.fb.group({
      name: ['', [required, maxLength(30), minLength(6)]],
      description: ['', [required, minLength(6), maxLength(30)]],
      location: ['', [required, minLength(6), maxLength(30)]],
    });
  }

  save(): void {
    this.guestsHouseService
      .updateGuestHouse(this.modefiedGuestHouse)
      .subscribe((guestHouse) => console.log('guestHouse', guestHouse));
  }
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
