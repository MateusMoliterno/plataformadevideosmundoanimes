import { Routes } from '@angular/router';
import { VideoSelectionComponent } from './components/video-selection/video-selection.component';
import { LoginComponent } from './components/login/login.component';
import { VideoPlayComponent } from './components/video-play/video-play.component'; // Importando o VideoPlayComponent

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'video-selection', component: VideoSelectionComponent },
  { path: 'video/:id', component: VideoPlayComponent },
  { path: '**', redirectTo: '' }
];