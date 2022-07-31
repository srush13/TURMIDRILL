import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineCapabilityComponent } from './machine-capability.component';

describe('MachineCapabilityComponent', () => {
  let component: MachineCapabilityComponent;
  let fixture: ComponentFixture<MachineCapabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineCapabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineCapabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
