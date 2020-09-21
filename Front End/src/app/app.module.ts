import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register/register.component';
import { MyAdvertsComponent } from './my-adverts/my-adverts.component';
import { NewAdvertComponent } from './new.advert/new.advert.component';;
import { AdvertDetailsComponent } from './advert-details/advert-details.component';
import { AccountsPageComponent } from './accounts-page/accounts-page.component';
import { SellersPageComponent } from './sellers-page/sellers-page.component';
import { SearchComponent } from './search/search.component';
import { ContactSellerComponent } from './contact-seller/contact-seller.component';
import { FeaturedComponent } from './featured/featured.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        MyAdvertsComponent,
        NewAdvertComponent ,
        AdvertDetailsComponent ,
        AccountsPageComponent ,
        SellersPageComponent ,
        SearchComponent ,
        ContactSellerComponent ,
        FeaturedComponent 
    ],
        
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    ],
    bootstrap: [AppComponent]
})
export class AppModule { 
}