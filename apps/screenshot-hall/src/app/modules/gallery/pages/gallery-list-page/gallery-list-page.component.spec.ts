import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryListPageComponent } from './gallery-list-page.component';

describe('GalleryListComponent', () => {
  let component: GalleryListPageComponent;
  let fixture: ComponentFixture<GalleryListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryListPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
