import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToiletControlComponent } from './toilet-control.component';

describe('ToiletControlComponent', () => {
  let component: ToiletControlComponent;
  let fixture: ComponentFixture<ToiletControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToiletControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToiletControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
