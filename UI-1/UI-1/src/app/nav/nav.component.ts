import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { Users } from '../_models/users';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(public accountService:AccountService, private router:Router,
    private toastr:ToastrService){}


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
      next: _ => this.router.navigateByUrl('/members'),
      error: error => this.toastr.error(error.error),
      complete: () => console.log('Request completed')

    })
    console.log(this.model);
  }

  logout()
  {
    //this.isloggedIn=false;
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
