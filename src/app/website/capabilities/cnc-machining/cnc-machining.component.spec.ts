import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CncMachiningComponent } from './cnc-machining.component';

describe('CncMachiningComponent', () => {
  let component: CncMachiningComponent;
  let fixture: ComponentFixture<CncMachiningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CncMachiningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CncMachiningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
