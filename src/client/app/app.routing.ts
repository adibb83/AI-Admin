import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AccountRoutes } from './components/account/account.routes';
import { PagesComponent } from './components/pages/pages.component';
import { PagesRoutes } from './components/pages/pages.routes';
import { AuthGuard } from './services/auth-guard.service';

export const ROUTES: Routes = [
    { path: '',
     redirectTo: 'account/home', 
     pathMatch: 'full' 
    },
    {
        path: 'account',
        component: AccountComponent,
        children: AccountRoutes
    },
    {
        path: 'pages',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: PagesRoutes
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/'
    }

];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);



    // { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: 'home', component: HomeComponent },
    // { path: 'company', component: CompanyComponent },
    // {
    //     path: 'team',
    //     component: TeamComponent

    // },
    // { path: 'knowledge_base', component: Knowledge_baseComponent },
    // { path: 'forms', component: FormsComponent }

// import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';

// @NgModule({
//   imports: [
//     RouterModule.forRoot([
//       /* define app module routes here, e.g., to lazily load a module
//          (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
//        */
//     ])
//   ],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

