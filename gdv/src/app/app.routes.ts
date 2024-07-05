import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
export const routes: Routes = [
    {
        path:'login',
        component : LoginComponent
    },
    {
        path:'',
        component : HomeComponent
    },
    {
        path:'dashboard',
        component : DashboardComponent
    }
];
