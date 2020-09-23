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
import { AccountsPageComponent } from './accounts-page/accounts-page.component';
import { SellersPageComponent } from './sellers-page/sellers-page.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { AdminGuard } from './_helpers/admin.guard';
import { AdminAdvertComponent } from './admin-advert/admin-advert.component';
import { AdminUserComponent } from './admin-user/admin-user.component';

const routes: Routes = [
    { path: 'homepage', component: HomeComponent},
    { path: 'homepage/:id/details', component: AdvertDetailsComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'login', canActivate: [AuthLoginGuard], component: LoginComponent },
    { path: 'myAdverts', canActivate: [AuthGuard], component: MyAdvertsComponent },
    { path: 'account', canActivate: [AuthGuard], component:AccountsPageComponent },
    { path: 'favourites', canActivate: [AuthGuard], component:FavouritesComponent },
    { path: 'admin/user', canActivate: [AdminGuard], component:AdminUserComponent },
    { path: 'admin/advert', canActivate: [AdminGuard], component:AdminAdvertComponent },
    { path: 'sellers', canActivate: [AuthGuard], component:SellersPageComponent },
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
