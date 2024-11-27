import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationDisplayComponent } from './duration-display.component';

describe('DurationDisplayComponent', () => {
  let component: DurationDisplayComponent;
  let fixture: ComponentFixture<DurationDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DurationDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DurationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
