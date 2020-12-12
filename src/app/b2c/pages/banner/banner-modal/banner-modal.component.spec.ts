import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerModalComponent } from './banner-modal.component';

describe('BannerModalComponent', () => {
  let component: BannerModalComponent;
  let fixture: ComponentFixture<BannerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
