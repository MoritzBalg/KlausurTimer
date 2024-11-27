import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToiletDisplayComponent } from './toilet-display.component';

describe('ToiletDisplayComponent', () => {
  let component: ToiletDisplayComponent;
  let fixture: ComponentFixture<ToiletDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToiletDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToiletDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
