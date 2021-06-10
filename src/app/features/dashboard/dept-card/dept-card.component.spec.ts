import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptCardComponent } from './dept-card.component';

describe('DeptCardComponent', () => {
  let component: DeptCardComponent;
  let fixture: ComponentFixture<DeptCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
