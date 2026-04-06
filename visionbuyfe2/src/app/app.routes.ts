import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { ProfileComponent } from './profile/profile';
import { DashboardComponent } from './dashboard/dashboard';

export const routes: Routes = [
	{path:'home', component: HomeComponent},
	{path:'login', component: LoginComponent},
	{path:'register', component: RegisterComponent},
	{path:'profile', component: ProfileComponent},
	{path:'dashboard', component: DashboardComponent},
];
