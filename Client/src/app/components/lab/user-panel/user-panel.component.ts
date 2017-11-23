import { User } from './../../../shared/models/user.interface';
import { UserService } from './../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  client : User;
  

  constructor(private userService: UserService) {
    this.getClient();
   }

  ngOnInit() {
  }
  getClient() {
    this.userService
      .getClient();
  }
  logout() {
    this.userService.logout();
  }

}
