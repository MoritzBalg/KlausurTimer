import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToiletControlsComponent } from './toilet-controls.component';

describe('ToiletControlsComponent', () => {
  let component: ToiletControlsComponent;
  let fixture: ComponentFixture<ToiletControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToiletControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToiletControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
