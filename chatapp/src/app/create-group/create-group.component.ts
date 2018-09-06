import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  constructor(private router: Router, private groupService: GroupService) { }
  public id: number;
  private name: string;

  ngOnInit() {
  }
  //function that creates new group, navigates to dashboard
  createGroup() {
    this.groupService.createGroup(this.id, this.name);
    this.id = this.id++;
    this.router.navigate([('/dashboard')]);
  }

  //function to retrieve groups
  retrieveGroups() {
    this.groupService.getGroups();
    console.log(this.groupService.getGroups());
  }
  
  //function to go back to dashboard
  goBack(){
    history.back();
  }

}