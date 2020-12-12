import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminModalComponent } from './sub-admin-modal.component';

describe('SubAdminModalComponent', () => {
  let component: SubAdminModalComponent;
  let fixture: ComponentFixture<SubAdminModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAdminModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAdminModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
