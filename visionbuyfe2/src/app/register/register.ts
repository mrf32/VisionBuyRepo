import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValidateService } from '../services/validate';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class RegisterComponent implements OnInit {
	name: String;
	username: String;
	email: String;
	password: String;

	ngOnInit() { 
	}

	constructor(private validateService: ValidateService) { }

	onRegisterSubmit(){
		const user = {
			name: this.name,
			email: this.email,
			username: this.username,
			password: this.password
		}

		if(!this.validateService.validateRegister(user)){
			console.log('fill in all fields');
			return false;
		}

		if(!this.validateService.validateEmail(user.email)){
        	        console.log('use valid email');
	                return false;
		}
	}

}
