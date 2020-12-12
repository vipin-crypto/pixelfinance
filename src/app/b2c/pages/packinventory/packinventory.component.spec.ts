import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackinventoryComponent } from './packinventory.component';

describe('PackinventoryComponent', () => {
  let component: PackinventoryComponent;
  let fixture: ComponentFixture<PackinventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackinventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
