import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebServiceService } from './web-service.service';
import { PermissionsService } from './permissions.service';
import { DataRx } from '../models/data-rx';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private url: string;

  constructor(
    private http: HttpClient,
    private server: WebServiceService,
    private permissions: PermissionsService
  ) {
    this.url = this.server.getUrl();
  }

  getAllData(endPoint: string): Array<any> {
    let returnData: Array<any> = [];

    this.http
      .get<DataRx>(`${this.url}${endPoint}`, this.server.getHeaders())
      .subscribe((data) => {
        if (data.ok) {
          returnData = data.data;
          this.permissions.decodeToken(data.token);
        } else {
          alert(data.msg);
        }
      });
    return returnData;
  }

  postData(dataSend: object, endPoint: string): Array<any> {
    let returnData: Array<any> = [];
    this.http
      .post<DataRx>(
        `${this.url}${endPoint}`,
        dataSend,
        this.server.getHeaders()
      )
      .subscribe((data) => {
        if (data.ok) {
          returnData = data.data;
          this.permissions.decodeToken(data.token);
        } else {
          alert(data.msg);
        }
      });
    return returnData;
  }

  patchData(dataSend: object, endPoint: string, id: string): Array<any> {
    let returnData: Array<any> = [];
    this.http
      .patch<DataRx>(
        `${this.url}${endPoint}/${id}`,
        dataSend,
        this.server.getHeaders()
      )
      .subscribe((data) => {
        if (data.ok) {
          returnData = data.data;
          this.permissions.decodeToken(data.token);
        } else {
          alert(data.msg);
        }
      });
    return returnData;
  }

  deleteData(endPoint: string, id: string): Array<any> {
    let returnData: Array<any> = [];
    this.http
      .delete<DataRx>(`${this.url}${endPoint}/${id}`, this.server.getHeaders())
      .subscribe((data) => {
        if (data.ok) {
          returnData = data.data;
          this.permissions.decodeToken(data.token);
        } else {
          alert(data.msg);
        }
      });
    return returnData;
  }
}
