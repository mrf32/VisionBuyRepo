import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
	authToken: any;
	user: any;

	constructor(private http:Http) { 
		
	}

	registerUser(){
		let headers = new Headers();
		headers.append('Content-Type','application/json');
		return this.http.post('http://localhost:3001/users/register', user, {headers: headers}).pipe(map((res: any) => res.json));

	}
}
