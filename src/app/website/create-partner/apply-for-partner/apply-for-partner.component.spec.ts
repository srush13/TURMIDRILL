import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyForPartnerComponent } from './apply-for-partner.component';

describe('ApplyForPartnerComponent', () => {
  let component: ApplyForPartnerComponent;
  let fixture: ComponentFixture<ApplyForPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyForPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyForPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
