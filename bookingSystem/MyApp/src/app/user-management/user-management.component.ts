import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  public userList: User[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUser();
  }
  getAllUser() {
    this.userService.getUserList().subscribe((data: User[]) => {
      this.userList = data;
    });
  }
}
