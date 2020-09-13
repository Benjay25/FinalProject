import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { AuthLoginGuard } from './_helpers/auth.login.guard';
import { RegisterComponent } from './register/register.component';
import { MyAdvertsComponent } from './my-adverts/my-adverts.component';
import { NewAdvertComponent } from './new.advert/new.advert.component';
import { AdvertDetailsComponent } from './advert-details/advert-details.component';

const routes: Routes = [
    { path: 'homepage', component: HomeComponent},
    { path: 'homepage/:id/details', component: AdvertDetailsComponent},
    { path: 'login', canActivate: [AuthLoginGuard], component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'myAdverts', canActivate: [AuthGuard], component: MyAdvertsComponent },
    { path: 'myAdverts/:id/edit', canActivate: [AuthGuard], component: NewAdvertComponent },
    { path: 'myAdverts/new', canActivate: [AuthGuard], component: NewAdvertComponent },
    
    // otherwise redirect to home
    { path: '**', redirectTo: 'homepage' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
