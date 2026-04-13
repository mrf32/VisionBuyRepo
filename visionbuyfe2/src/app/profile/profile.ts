import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [NgIf],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})

export class ProfileComponent implements OnInit{
//	user: Object;

	constructor(private authService: AuthService, private router: Router){

	}

	ngOnInit(){
//		this.authService.getProfile().subscribe(profile => {
//		this.user = profile.user;}, 
//		err => {console.log(err); 
//		return false;
//		});
	}
}
