import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from './_models/users';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  //users:any;
constructor(private http: HttpClient,private accountService: AccountService){}

  ngOnInit(): void {
    //this.getUsers();
    this.setCurrentUser();
  }

// getUsers()
// {
//   this.http.get("https://localhost:7286/api/users").subscribe({
//     next: response => this.users = response,
//     error: error => console.log(error),
//     complete: () => console.log("Request completed")
//     });
// }

  setCurrentUser(){
   const userString = localStorage.getItem('user');
   if (!userString) return;
   const user: Users = JSON.parse(userString);
   this.accountService.setCurrentUser(user);
  }
  
}
