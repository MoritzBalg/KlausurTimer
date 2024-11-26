import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ControlPageComponent } from './pages/control-page/control-page.component';

export const routes: Routes = [
  {path: 'control', component: ControlPageComponent},
  {path: '', component:MainPageComponent}
];
