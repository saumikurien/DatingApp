import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
// @Input() usersFromHomeComponent: any;
@Output() toHomeComponent = new EventEmitter();
model: any = {}

constructor(public accountService: AccountService, private toastr: ToastrService, private router:Router){}
  ngOnInit(): void {
  }

  register()
  {
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.router.navigateByUrl('/');
        this.cancel();
      },
      error: error => this.toastr.error(error.error)
    })
  }

  cancel()
  {
    this.toHomeComponent.emit(false);
    this.router.navigateByUrl('/');
  }


}
