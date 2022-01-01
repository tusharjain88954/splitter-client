import { Injectable } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  selectedUsers = {
    userIds: new Array(),
    description: '',
    amount: 0,
    payeeIds: new Array(),
    splitEqually: true,
    payeeDetails: [{ "_id": "defaultId", "fullName": "you", "amount": 0 }]
  };




}
