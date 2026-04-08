import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { JwtHelperService } from  '@auth0/angular-jwt';

@Injectable()

export class AuthService {
	authToken: any;
	user: any;

	constructor(private http: HttpClient) { 
		
	}

	registerUser(user){
		let headers = new HttpHeaders();
		headers.append('Content-Type','application/json');
		return this.http.post('http://10.0.2.10:3001/users/register', user, {headers: headers}).pipe(map((res: any) => res.json));
	}

	authenticateUser(user){
		let headers = new HttpHeaders();
                headers.append('Content-Type','application/json');
                return this.http.post('http://10.0.2.10:3001/users/authenticateUser', user, {headers: headers}).pipe(map((res: any) => res.json));
	}

	storeUserData(token, user){
		localStorage.setItem('id_token', token);
		localStorage.setItem('user', JSON.stringify(user));
		this.authToken = token;
		this.user = user;
	}

	loadToken(){
		const token = localStorage.getItem('id_token');
		this.authToken = token;
	}

	loggedIn(){
		this.loadToken();
		const helper = new JwtHelperService();
		return helper.isTokenExpired(this.authToken);
	}

	logout(){
		this.authToken = null;
		this.user = null;
		localStorage.clear();
	}

	getProfile(){
		let headers = new HttpHeaders();
		this.loadToken();
		headers.append('Authorization', this.authToken);
                headers.append('Content-Type','application/json');
                return this.http.get('http://10.0.2.10:/users/profile', {headers: headers}).pipe(map((res: any) => res.json));
	}
}
