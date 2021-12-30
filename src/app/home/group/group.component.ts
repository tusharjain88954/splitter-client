import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../shared/group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlusSquare, faReceipt, faUser } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { UserGroupService } from '../../shared/user-group.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TransactionService } from '../../shared/transaction.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(public groupService: GroupService, private router: Router, public userGroupService: UserGroupService, public transactionService: TransactionService, private route: ActivatedRoute) { }
  groupDetails: any | undefined;
  allUserDetails: any | undefined;
  showSpinner = false;
  faPlusSquare = faPlusSquare;
  faReceipt = faReceipt;
  faUser = faUser
  serverErrorMessages: string | undefined;
  showSucessMessage: string | undefined;
  userDropdownList = [];
  selectedUser = [];
  userDropdownSettings: IDropdownSettings = {};
  payeeDropdownList: any;
  selectedPayee = [];
  payeeDropdownSettings: IDropdownSettings = {};
  showUserList = true;
  showAddPayee = true;
  hideAddPayee = false;
  showPayeeList = false;
  tempPayeeList = [{ "_id": "defaultId", "fullName": "you" }];
  userNames = new Array();
  payeeNames = new Array();
  ngOnInit(): void {
    this.showSpinner = true;
    const groupId = this.route.snapshot.paramMap.get('id')
    if (!this.groupService.isAdded(groupId)) {
      this.showSpinner = false;
      this.router.navigateByUrl('/home');
    }
    else {
      this.groupService.getGroup(groupId).subscribe({
        next: (res: any) => {
          this.groupDetails = res;
          this.userGroupService.getAllUsers(groupId).subscribe({
            next: (res: any) => {
              this.allUserDetails = res;
              this.userDropdownList = this.allUserDetails;
              this.userDropdownSettings = {
                singleSelection: false,
                idField: '_id',
                textField: 'fullName',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 3,
                allowSearchFilter: true
              };
              this.payeeDropdownList = this.allUserDetails;
              this.payeeDropdownSettings = {
                singleSelection: false,
                idField: '_id',
                textField: 'fullName',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 3,
                allowSearchFilter: true
              };
            },
            error: (err) => {
            },
          })
          this.showSpinner = false;
        },
        error: (err) => {
          this.showSpinner = false;
          this.router.navigateByUrl('/home');
        },
      });
    }

  }
  onSubmitCreateForm(form: NgForm) {
    this.showSpinner = true;
    this.groupService.createGroup(form.value).subscribe({
      next: (res: any) => {
        console.log(res);
        // this.getGroupList();
        this.showSucessMessage = res['message'];
        // this.resetFormCreate(form);
        this.showSpinner = false;
      },
      error: (err) => {
        this.serverErrorMessages = err.error['error'];
        this.showSpinner = false;
      },
    });

  }
  onUserSelect(item: any) {
    this.transactionService.selectedUsers.userDetails.push(item._id);
    this.userNames.push(item.fullName);
    console.log(this.transactionService.selectedUsers.userDetails)
  }
  onUserSelectAll(items: any) {
    this.transactionService.selectedUsers.userDetails = [];
    console.log(items)
    for (let i = 0; i < items.length; i++) {
      this.transactionService.selectedUsers.userDetails.push(items[i]._id);
      this.userNames.push(items[i].fullName);
    }
    console.log(this.transactionService.selectedUsers.userDetails)
  }
  onUserDeSelect(item: any) {
    for (let i = 0; i < this.transactionService.selectedUsers.userDetails.length; i++) {
      if (this.transactionService.selectedUsers.userDetails[i] == item._id) {
        this.transactionService.selectedUsers.userDetails.splice(i, 1);
        this.userNames.splice(i, 1);
      }
    }
    console.log(this.transactionService.selectedUsers.userDetails)
  }
  onUserDeSelectAll(item: any) {
    this.transactionService.selectedUsers.userDetails = [];
    this.userNames = [];
    console.log(this.transactionService.selectedUsers.userDetails)
  }

  onClickShowAddPayee() {
    this.payeeDropdownList = this.allUserDetails;
    this.selectedPayee = [];
    while (this.tempPayeeList.length)
      this.tempPayeeList.pop();
    for (let i = 0; i < this.transactionService.selectedUsers.userDetails.length; i++) {
      // : { _id: string, fullName: string } => this is to define the type of payeeObj
      var payeeObj: { _id: string, fullName: string } = { "_id": this.transactionService.selectedUsers.userDetails[i], "fullName": this.userNames[i] }
      this.tempPayeeList.push(payeeObj);
    }
    this.payeeDropdownList = this.tempPayeeList;
    this.showAddPayee = false;
    this.showUserList = false;
    this.hideAddPayee = true;
    this.showPayeeList = true;
  }
  onClickHideAddPayee() {
    this.showAddPayee = true;
    this.showUserList = true;
    this.hideAddPayee = false;
    this.showPayeeList = false;
    this.selectedUser = this.payeeDropdownList;
  }

  onPayeeSelect(item: any) {
    this.transactionService.selectedUsers.payeeDetails.push(item._id);
    this.payeeNames.push(item.fullName);
    console.log(this.transactionService.selectedUsers.payeeDetails)
  }
  onPayeeSelectAll(items: any) {
    this.transactionService.selectedUsers.payeeDetails = [];
    console.log(items)
    for (let i = 0; i < items.length; i++) {
      this.transactionService.selectedUsers.payeeDetails.push(items[i]._id);
      this.payeeNames.push(items[i].fullName);
    }
    console.log(this.transactionService.selectedUsers.payeeDetails)
  }
  onPayeeDeSelect(item: any) {
    for (let i = 0; i < this.transactionService.selectedUsers.payeeDetails.length; i++) {
      if (this.transactionService.selectedUsers.payeeDetails[i] == item._id) {
        this.transactionService.selectedUsers.payeeDetails.splice(i, 1);
        this.payeeNames.splice(i, 1);
      }
    }
    console.log(this.transactionService.selectedUsers.payeeDetails)
  }
  onPayeeDeSelectAll(item: any) {
    this.transactionService.selectedUsers.payeeDetails = [];
    this.userNames = [];
    console.log(this.transactionService.selectedUsers.payeeDetails)
  }




}
