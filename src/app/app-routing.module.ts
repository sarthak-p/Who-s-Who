import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EasyModeComponent } from 'src/app/easy-mode/easy-mode.component';
import { HardModeComponent } from './hard-mode/hard-mode.component';
import { EndGameComponent } from './end-game/end-game.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'easy-mode', component: EasyModeComponent },
    { path: 'hard-mode', component: HardModeComponent }, 
    { path: 'end-game', component: EndGameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
