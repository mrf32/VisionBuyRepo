import { Component } from '@angular/core';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class LoginComponent {
	username: String;
	password: String;

	constructor(private authService: AuthService, private router: Router){
		
	}

	onLoginSubmit(){
		const user = {
			username: this.username,
			password: this.password
		}
		
		this.authService.authenticateUser(user).subscribe(data =>{
			if(data.success){
				this.authService.storeUserData(data.token, data.user);
				console.log('You are now logged in');
				this.router.navigate(['dashboard']);		
			}else{
				console.log(data);
				this.router.navigate(['login']);
			}			
		});
	}
}
