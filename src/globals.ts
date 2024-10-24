import { ExamConfig } from './app/models/exam-config';
import { DisplayConfig } from './app/models/display-config';

export const globals: {examConfig: ExamConfig, displayConfig: DisplayConfig} = {
  examConfig: {
    title: '',
    subTitle: '',
    room: '',
    resources: 'keine',
    duration: 7200000 // 2h in milliseconds
  },
  displayConfig: {
    displayClock: true,
    displayDate: true,
    displayDuration: false,
    displayEventLog: false,
    toiletCount: 1
  }
};
