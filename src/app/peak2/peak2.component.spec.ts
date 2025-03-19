import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Peak2Component } from './peak2.component';

describe('Peak2Component', () => {
  let component: Peak2Component;
  let fixture: ComponentFixture<Peak2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Peak2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Peak2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
