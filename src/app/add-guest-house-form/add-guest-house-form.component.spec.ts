import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddGuestHouseFormComponent } from './add-guest-house-form.component';

describe('AddGuestHouseFormComponent', () => {
  let component: AddGuestHouseFormComponent;
  let fixture: ComponentFixture<AddGuestHouseFormComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGuestHouseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGuestHouseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
