import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformPillComponent } from './platform-pill.component';

describe('PlatformPillComponent', () => {
  let component: PlatformPillComponent;
  let fixture: ComponentFixture<PlatformPillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlatformPillComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
