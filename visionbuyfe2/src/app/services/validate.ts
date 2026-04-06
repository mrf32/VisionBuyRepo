import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ValidateService {
	constructor() { }

	validateRegister(user){
		if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined){
			return false;
		} else {
			return true;
		}
	}

	validateEmail(email){
		var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return re.test(email);
	}
}
