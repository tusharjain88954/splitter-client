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
  serverErrorMessages1: string | undefined;
  showSucessMessage1: string | undefined;
  serverErrorMessages2: string | undefined;
  showSucessMessage2: string | undefined;
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
        this.showSucessMessage1 = res['message'];
        this.resetFormCreate(form);
        location.reload();
      },
      error: (err) => {
        this.serverErrorMessages1 = err.error['error'];
      },
    });

  }
  onSubmitSearchForm(form: NgForm) {
    this.userGroupService.creatUserGroup(form.value).subscribe({
      next: (res: any) => {
        this.showSucessMessage2 = res['message'];
        this.resetFormSearch(form);
        location.reload();
      },
      error: (err) => {
        this.serverErrorMessages2 = err.error['error'];
      },
    });

  }
  // reset the form when after submit is clicked
  resetFormCreate(form: NgForm) {
    this.groupService.name1 = undefined;
    form.resetForm();
    this.serverErrorMessages1 = '';
  }
  resetFormSearch(form: NgForm) {
    this.groupService.name2 = undefined;
    form.resetForm();
    this.serverErrorMessages2 = '';
  }
}
