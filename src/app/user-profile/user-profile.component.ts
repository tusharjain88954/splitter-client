import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userDetails: any;
  serverErrorMessages: string | undefined;
  showSucessMessage: string | undefined;
  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getUser();
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
  onSubmit(form: NgForm) {
    this.userService.editUserProfile(form.value).subscribe({
      next: (res: any) => {
        this.getUser();
        this.showSucessMessage = res['message'];
        this.resetForm(form);
      },
      error: (err) => {
        this.serverErrorMessages = err.error['error'];
      },
    });
  }

  // reset the form when after submit is clicked
  resetForm(form: NgForm) {
    this.userService.model = {
      fullName: null,
      password: null,
      confirmPassword: null
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

  getUser() {
    this.userService.getUserProfile().subscribe({
      next: (res: any) => {
        this.userDetails = res['user'];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
