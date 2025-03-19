import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Peak1Component } from './peak1.component';

describe('Peak1Component', () => {
  let component: Peak1Component;
  let fixture: ComponentFixture<Peak1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Peak1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Peak1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
