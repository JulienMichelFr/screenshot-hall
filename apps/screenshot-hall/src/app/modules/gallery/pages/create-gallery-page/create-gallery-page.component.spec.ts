import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGalleryPageComponent } from './create-gallery-page.component';

describe('CreateGalleryPageComponent', () => {
  let component: CreateGalleryPageComponent;
  let fixture: ComponentFixture<CreateGalleryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateGalleryPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGalleryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
