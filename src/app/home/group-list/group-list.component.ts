import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../shared/group.service';
import { UserService } from '../../shared/user.service';
import { UserGroupService } from '../../shared/user-group.service';
import { Router } from '@angular/router';
import { faUsers, faUser } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css'],
})
export class GroupListComponent implements OnInit {
  colours: Array<any> = ['primary', 'success'];
  groupList = [];
  serverErrorMessages: string | undefined;
  showSucessMessage: string | undefined;
  faUsers = faUsers;
  faUser = faUser;
  constructor(public groupService: GroupService, public userService: UserService, public userGroupService: UserGroupService) { }
  ngOnInit() {
    this.userService.getGroups().subscribe({
      next: (res: any) => {
        this.groupList = res;
        // console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onSubmitCreateForm(form: NgForm) {
    this.groupService.createGroup(form.value).subscribe({
      next: (res: any) => {
        this.showSucessMessage = res['message'];
        this.resetForm(form);
        location.reload();
      },
      error: (err) => {
        this.serverErrorMessages = err.error['error'];
      },
    });

  }
  onSubmitSearchForm(form: NgForm) {
    this.userGroupService.creatUserGroup(form.value).subscribe({
      next: (res: any) => {
        this.showSucessMessage = res['message'];
        this.resetForm(form);
        location.reload();
      },
      error: (err) => {
        this.serverErrorMessages = err.error['error'];
      },
    });

  }
  // reset the form when after submit is clicked
  resetForm(form: NgForm) {
    this.groupService.name = undefined;
    form.resetForm();
    this.serverErrorMessages = '';
  }
}
