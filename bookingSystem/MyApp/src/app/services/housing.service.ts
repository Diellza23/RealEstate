import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { IProperty } from '../property/IProperty.interface';
import { Observable } from 'rxjs';
// import { IProperty } from '../model/iproperty';
import { Property } from '../model/property';
import { IPropertyBase } from '../model/ipropertybase';
import { environment } from 'src/environments/environment';
import { Ikeyvaluepair } from '../model/ikeyvaluepair';
import { Constants } from '../Helper/constants';
import { AlertifyService } from './alertify.service';
import { ResponseModel } from '../Models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private alertify: AlertifyService) {}

  getAllCities(): Observable<string[]> {
    return this.http.get<string[]>('https://localhost:5001/api/city');
  }

  getPropertyTypes(): Observable<Ikeyvaluepair[]> {
    return this.http.get<Ikeyvaluepair[]>(this.baseUrl + '/propertytype/list');
  }

  getFurnishingTypes(): Observable<Ikeyvaluepair[]> {
    return this.http.get<Ikeyvaluepair[]>(
      this.baseUrl + '/furnishingtype/list'
    );
  }

  getProperty(id: number) {
    return this.http.get<Property>(
      this.baseUrl + '/propperty/detail/' + id.toString()
    );
    // return this.getAllProperties().pipe(
    //   map((propertiesArray) => {
    //     // throw new Error('some error')
    //     return propertiesArray.find((p) => p.id === id);
    //   })
    // );
  }

  getAllProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(
      `https://localhost:5001/api/propperty/allProperties/`
    );
  }

  getTopThreeProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(
      `https://localhost:5001/api/propperty/top3/`
    );
  }
  getTopEightProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(
      `https://localhost:5001/api/propperty/top8/`
    );
  }

  // deleteUser(id: string) {
  //   return this.httpClient.delete(
  //     'https://localhost:5001/api/User/DeleteUser/id?id=' + id
  //   );
  // }
  public deleteThisProperty(propId: number) {
    let userInfo = JSON.parse(localStorage.getItem(Constants.USER_KEY));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    const body = {
      Id: propId,
    };
    return this.http.post<ResponseModel>(
      Constants.BASE_URL + 'Propperty/DeleteProperty',
      body,
      { headers: headers }
    );
  }

  deleteProperty(id: number) {
    return this.http.delete(
      `https://localhost:5001/api/propperty/deleteProperty/id?id=` + id
    );
  }

  getAllPropertiesRent(SellRent?: number): Observable<Property[]> {
    return this.http.get<Property[]>(
      this.baseUrl + '/propperty/list/' + SellRent.toString()
    );
  }

  addProperty(property: Property, authorId: string) {
    let userInfo = JSON.parse(localStorage.getItem(Constants.USER_KEY));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.http.post(
      `https://localhost:5001/api/propperty/AddUpdateProperty?AuthorId=` +
        authorId,
      property,
      { headers: headers }
    );
  }

  editProperty(property: Property) {
    return this.http.post(
      `https://localhost:5001/api/propperty/AddUpdateProperty/`,
      property
    );
  }

  getCurrentData(id: number) {
    return this.http.get<Property>(
      this.baseUrl + '/propperty/detail/' + id.toString()
    );
  }

  updateProperty(id: number, payload: any) {
    let nextPayload = {
      ...payload,
    };
    // console.log(JSON.stringify(nextPayload));
    this.http
      .put<any>(
        `https://localhost:5001/api/propperty/UpdProperty/${id}`,
        nextPayload
      )
      .subscribe((data) => {
        if (data) {
          this.alertify.success('Data updated successfully');
        } else {
          this.alertify.error('Something went wrong, try again later');
        }
        // alert('DATA:' + JSON.stringify(data));
      });
    // return this.http.put(
    //   `https://localhost:5001/api/propperty/UpdProperty/${id}`,
    //   data
    // );
  }

  newPropID() {
    if (localStorage.getItem('PID')) {
      return +localStorage.getItem('PID');
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }

  getPropertyAge(dateofEstablishment: string): string {
    const today = new Date();
    const estDate = new Date(dateofEstablishment);
    let age = today.getFullYear() - estDate.getFullYear();
    const m = today.getMonth() - estDate.getMonth();

    // Current month smaller than establishment month or
    // Same month but current date smaller than establishment date
    if (m < 0 || (m === 0 && today.getDate() < estDate.getDate())) {
      age--;
    }

    // Establshment date is future date
    if (today < estDate) {
      return '0';
    }

    // Age is less than a year
    if (age === 0) {
      return 'Less than a year';
    }

    return age.toString();
  }

  setPrimaryPhoto(propertyId: number, propertyPhotoId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + localStorage.getItem('token'),
      }),
    };
    return this.http.post(
      'https://localhost:5001/api/propperty/set-primary-photo/' +
        String(propertyId) +
        '/' +
        propertyPhotoId,
      {},
      httpOptions
    );
  }

  deletePhoto(propertyId: number, propertyPhotoId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + localStorage.getItem('token'),
      }),
    };
    return this.http.delete(
      'https://localhost:5001/api/propperty/delete-photo/' +
        String(propertyId) +
        '/' +
        propertyPhotoId,

      httpOptions
    );
  }
}
