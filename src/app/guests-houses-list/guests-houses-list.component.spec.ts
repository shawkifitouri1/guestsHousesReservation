import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestsHousesListComponent } from './guests-houses-list.component';

describe('GuestsHousesListComponent', () => {
  let component: GuestsHousesListComponent;
  let fixture: ComponentFixture<GuestsHousesListComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestsHousesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestsHousesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
