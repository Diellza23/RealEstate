import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../Models/responseModel';
import { map } from 'rxjs/operators';
import { ResponseCode } from '../enums/responseCode';
import { User } from '../Models/user';
import { Constants } from '../Helper/constants';
import { Role } from '../Models/role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseURL: string = 'https://localhost:5001/api/user/';

  constructor(private httpClient: HttpClient) {}
  public login(email: string, password: string) {
    const body = {
      Email: email,
      Password: password,
    };
    return this.httpClient.post<ResponseModel>(this.baseURL + 'Login', body);
  }

  public register(
    fullName: string,
    email: string,
    password: string,
    roles: string[]
  ) {
    const body = {
      FullName: fullName,
      Email: email,
      Password: password,
      Roles: roles,
    };
    return this.httpClient.post<ResponseModel>(
      this.baseURL + 'RegisterUser',
      body
    );
  }
  public getAllUser() {
    let userInfo = JSON.parse(localStorage.getItem(Constants.USER_KEY));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient
      .get<ResponseModel>(this.baseURL + 'GetAllUser', {
        headers: headers,
      })
      .pipe(
        map((res) => {
          let userList = new Array<User>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              res.dateSet.map((x: User) => {
                userList.push(
                  new User(x.id, x.fullName, x.email, x.userName, x.roles)
                );
              });
            }
          }
          return userList;
        })
      );
  }

  public getUserList() {
    let userInfo = JSON.parse(localStorage.getItem(Constants.USER_KEY));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient
      .get<ResponseModel>(this.baseURL + 'GetUserList', {
        headers: headers,
      })
      .pipe(
        map((res) => {
          let userList = new Array<User>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              res.dateSet.map((x: User) => {
                userList.push(
                  new User(x.id, x.fullName, x.email, x.userName, x.roles)
                );
              });
            }
          }
          return userList;
        })
      );
  }

  public getAllRole() {
    let userInfo = JSON.parse(localStorage.getItem(Constants.USER_KEY));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient
      .get<ResponseModel>(this.baseURL + 'GetRoles', {
        headers: headers,
      })
      .pipe(
        map((res) => {
          let roleList = new Array<Role>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              res.dateSet.map((x: string) => {
                roleList.push(new Role(x));
              });
            }
          }
          return roleList;
        })
      );
  }

  public getUserById(id: String) {
    return this.httpClient.get(
      `https://localhost:5001/api/User/GetUserById/` + id
    );
  }

  deleteUser(id: string) {
    return this.httpClient.delete(
      'https://localhost:5001/api/User/DeleteUser/id?id=' + id
    );
  }

  // this.housingService.addProperty(this.property).subscribe(() => {
  //   this.alertify.success(
  //     'Congrats, your property listed successfully on our website'
  //   );




}
