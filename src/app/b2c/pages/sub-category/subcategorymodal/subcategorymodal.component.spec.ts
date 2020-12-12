import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategorymodalComponent } from './subcategorymodal.component';

describe('SubcategorymodalComponent', () => {
  let component: SubcategorymodalComponent;
  let fixture: ComponentFixture<SubcategorymodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategorymodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategorymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
