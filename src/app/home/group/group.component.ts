import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../shared/group.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(public groupService: GroupService, private router: Router, private route: ActivatedRoute) { }
  groupDetails: any | undefined;

  ngOnInit(): void {
    const groupId = this.route.snapshot.paramMap.get('id')
    if (!this.groupService.isAdded(groupId)) {
      this.router.navigateByUrl('/home');
    }
    else {
      this.groupService.getGroup(groupId).subscribe({
        next: (res: any) => {
          this.groupDetails = res;
        },
        error: (err) => {
          this.router.navigateByUrl('/home');
        },
      });
    }

  }

}
