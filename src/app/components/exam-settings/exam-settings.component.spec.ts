import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSettingsComponent } from './exam-settings.component';

describe('ExamSettingsComponent', () => {
  let component: ExamSettingsComponent;
  let fixture: ComponentFixture<ExamSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
