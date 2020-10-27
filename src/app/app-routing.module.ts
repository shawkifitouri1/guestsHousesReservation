import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestsHousesListComponent } from './guests-houses-list/guests-houses-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  {path: 'guesthouses', component: GuestsHousesListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
