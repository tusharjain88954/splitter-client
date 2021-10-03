import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userDetails: any;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getUserProfile().subscribe({
      next: (res: any) => {
        this.userDetails = res['user'];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
