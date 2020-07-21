import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebServiceService } from './web-service.service';
import { PermissionsService } from './permissions.service';
import { DataRx } from '../models/data-rx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private url: string;

  constructor(
    private http: HttpClient,
    private server: WebServiceService,
    private permissions: PermissionsService
  ) {
    this.url = server.getUrl();
  }

  saveFile(file: File[]): Observable<DataRx> {
    // console.log(file[0].name);
    const formData = new FormData();
    formData.append('file', file[0], file[0].name);
    console.log(formData);

    // let returnData: Array<any> = [];

    return this.http.post<DataRx>(
      `${this.url}files_galeria`,
      formData,
      this.server.getHeaderFile()
    );
  
  }

  deleteFile(directory: string, fileName: string): boolean {
    let returnData = false;

    this.http
      .delete<DataRx>(
        `${this.url}files/${directory}/${fileName}`,
        this.server.getHeaderFile()
      )
      .subscribe((data) => {
        if (data.ok) {
          returnData = true;
          this.permissions.decodeToken(data.token);
        } else {
          alert(data.msg);
        }
      });
    return returnData[0];
  }

  getFile(directory: string, fileName: string): any {
    return `${this.url}files/${directory}/${fileName}`;
  }
}
