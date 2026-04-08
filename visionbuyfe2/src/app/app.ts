import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home'
import { RegisterComponent } from './register/register'
import { LoginComponent } from './login/login'
import { DashboardComponent } from './dashboard/dashboard'
import { ProfileComponent } from './profile/profile'
import { ValidateService } from './services/validate';
import { AuthService } from './services/auth';
import { HttpClientModule } from '@angular/common/http'
import { AuthGuard } from './guards/auth.guard'

//const appRoutes: Routes = [
//	{path:'', component:HomeComponent},
//	{path:'register', component:RegisterComponent},
//	{path:'login', component:LoginComponent},
//	{path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
//	{path:'profile', component:ProfileComponent, canActivate: [AuthGuard]},
//]

//@Module({
//	declarations: [
//		AppComponent,
//		HomeComponent,
//		RegisterComponent,
//		LoginComponent,
//		DashboardComponent,
//		ProfileComponent
//	]
//})

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, HttpClientModule],
  providers: [ValidateService, AuthService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('visionbuyfe');
}
