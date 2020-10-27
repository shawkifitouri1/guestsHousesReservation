import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadImagesComponent } from './upload-images.component';

describe('UploadImagesComponent', () => {
  let component: UploadImagesComponent;
  let fixture: ComponentFixture<UploadImagesComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
