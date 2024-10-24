import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToiletStateComponent } from './toilet-state.component';

describe('ToiletStateComponent', () => {
  let component: ToiletStateComponent;
  let fixture: ComponentFixture<ToiletStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToiletStateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToiletStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
