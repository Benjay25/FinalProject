import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { AuthLoginGuard } from './_helpers/auth.login.guard';
import { RegisterComponent } from './register/register.component';
import { MyAdvertsComponent } from './my-adverts/my-adverts.component';

const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', canActivate: [AuthLoginGuard], component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'myAdverts', canActivate: [AuthGuard], component: MyAdvertsComponent },
    
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
