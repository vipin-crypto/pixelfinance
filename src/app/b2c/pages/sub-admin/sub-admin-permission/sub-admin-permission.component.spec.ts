import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminPermissionComponent } from './sub-admin-permission.component';

describe('SubAdminPermissionComponent', () => {
  let component: SubAdminPermissionComponent;
  let fixture: ComponentFixture<SubAdminPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAdminPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAdminPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
