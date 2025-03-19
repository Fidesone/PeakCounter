import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Peak3Component } from './peak3.component';

describe('Peak3Component', () => {
  let component: Peak3Component;
  let fixture: ComponentFixture<Peak3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Peak3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Peak3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
