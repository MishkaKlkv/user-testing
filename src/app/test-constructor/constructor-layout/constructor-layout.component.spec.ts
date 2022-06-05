import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorLayoutComponent } from './constructor-layout.component';

describe('ConstructorLayoutComponent', () => {
  let component: ConstructorLayoutComponent;
  let fixture: ComponentFixture<ConstructorLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstructorLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
