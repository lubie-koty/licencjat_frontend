import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

import { authGuard } from './auth.guard';

const routes: Routes = [
  // {
  //   path: '**',
  //   redirectTo: ''
  // },
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'authenticate',
    loadChildren: () => import('./components/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'notes',
    loadChildren: () => import('./components/notes/notes.module').then(m => m.NotesModule),
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
