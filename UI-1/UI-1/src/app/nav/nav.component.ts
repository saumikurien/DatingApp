import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { Users } from '../_models/users';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  
  model : any = {}; 
  currentItem = 'I am the item';
  //isloggedIn = false;
  currentUser$: Observable<Users | null> = of(null);

  constructor(public accountService:AccountService){}


  ngOnInit(): void {
    //this.getCurrentUser();
    //this.currentUser$= this.accountService.currentUser$;
  }

  getCurrentUser()
  {
    this.accountService.currentUser$.subscribe({
      //next: user => this.isloggedIn = !!user,
      error: error => console.log(error),
    })
  }

  login()
  {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
        //this.isloggedIn = true;
      },
      error: error => console.log(error),
      complete: () => console.log('Request completed')

    })
    console.log(this.model);
  }

  logout()
  {
    //this.isloggedIn=false;
    this.accountService.logout();
  }
}
