import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalFabricationComponent } from './metal-fabrication.component';

describe('MetalFabricationComponent', () => {
  let component: MetalFabricationComponent;
  let fixture: ComponentFixture<MetalFabricationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetalFabricationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalFabricationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
