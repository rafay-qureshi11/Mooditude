import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../core/services/authentication/authentication.service"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Mooditude-web-frontend';

  constructor(private _authentication : AuthenticationService) { }

  ngOnInit(): void {
  }

  get isLogedIn(){
    return this._authentication.isLoggedIn
  }

  onLogOut(){
    this._authentication.SignOut()
  }

}
