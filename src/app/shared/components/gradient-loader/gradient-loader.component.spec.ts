import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientLoaderComponent } from './gradient-loader.component';

describe('GradientLoaderComponent', () => {
  let component: GradientLoaderComponent;
  let fixture: ComponentFixture<GradientLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradientLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradientLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
