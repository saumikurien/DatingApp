import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  
  model : any = {};       
  isloggedIn = false;
  constructor(private accountService:AccountService){}


  ngOnInit(): void {
     //throw new Error('Method not implemented.');
  }

  login()
  {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
        this.isloggedIn = true;
      },
      error: error => console.log(error),
      complete: () => console.log('Request completed')

    })
    console.log(this.model);
  }

  logout()
  {
    this.isloggedIn=false;
    this.accountService.logout();
  }
}
