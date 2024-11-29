import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadComponent: () => import('./page/splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./page/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'leagues',
    canActivate: [authGuard],
    loadChildren: () => import('./page/leagues/leagues.module').then( m => m.LeaguesPageModule)
  },
  {
    path: 'teams',
    canActivate: [authGuard],
    loadChildren: () => import('./page/teams/teams.module').then( m => m.TeamsPageModule)
  },
  {
    path: 'players',
    canActivate: [authGuard],
    loadChildren: () => import('./page/players/players.module').then( m => m.PlayersPageModule)
  }/*,
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  }*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }