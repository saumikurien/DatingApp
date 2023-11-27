import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: any;
  registrationMode = false;

  constructor(public http: HttpClient){}

  ngOnInit(): void {
    this.getUsers();
  }

  btnToggle() {
    this.registrationMode = !this.registrationMode;
  }

  getUsers()
  {
    this.http.get("https://localhost:7286/api/users").subscribe({
    next: response => this.users = response,
    error: error => console.log(error),
    complete: () => console.log("Request completed")
    });
  }

  cancelRegister($event: boolean) {
    this.registrationMode=$event;
    }
}
