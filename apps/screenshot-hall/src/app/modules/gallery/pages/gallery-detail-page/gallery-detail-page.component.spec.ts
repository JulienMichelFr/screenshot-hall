import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryDetailPageComponent } from './gallery-detail-page.component';

describe('GalleryDetailPageComponent', () => {
  let component: GalleryDetailPageComponent;
  let fixture: ComponentFixture<GalleryDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryDetailPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
