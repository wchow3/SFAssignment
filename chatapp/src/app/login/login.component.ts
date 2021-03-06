import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string;
  private password: string;
  public permission;

  constructor(private router:Router, 
    private form:FormsModule, 
    private userService:UserService) { }
  
  //auto routes to dashboard if user has logged in
  ngOnInit() {
    if(sessionStorage.getItem('user') !== null){
      this.router.navigate(['/dashboard']);
    }
  }

  //retrieves current user
  getUsers(){
    return this.userService.getCurrentUser();
  }

  //create new user
  createUser(username, password, permission){
    let user = {
      name: username,
      password: password,
      permission: permission
    }
    this.userService.createUser(user).subscribe(
      data => {
        this.getUsers();
        return true;
      },
      error => {
        console.error("Error creating new user");
      }
    )
  }

  //logs the user, saves the user data
  loginUser(event){
    event.preventDefault();
    console.log(this.username);
    let user = {
      username: this.username,
      password: this.password
    }

  this.userService.login(user).subscribe(
    data => {
      console.log(data);
      if(data != false){
        let temp = JSON.stringify(data);
        sessionStorage.setItem('user', temp);
        alert('Successfully logged in');
        this.router.navigate(['/dashboard']);
      } else {
        alert('Username and password were incorrect, please try again');
      }
    },
    error => {
      console.error(error);
    }
  )
  }
}
