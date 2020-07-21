import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CrudService } from '../../services/crud.service';
import { FilesService } from '../../services/files.service.js';
import { DataRx } from 'src/app/models/data-rx';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  userData: any;
  seeFile: any;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private filesService: FilesService
  ) {}

  ngOnInit(): void {
    this._getUserData();
    this._editUserForm();
    this.seeFile = this.filesService.getFile(
      'galeria',
      this.userData.foto_perfil
    );
  }

  private _getUserData() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  _editUserForm = () => {
    this.editUserForm = this.formBuilder.group({
      nombre: [this.userData.nombre, [Validators.required]],
      apellido: [this.userData.apellido, [Validators.required]],
      edad: [this.userData.edad, [Validators.required]],
      email: [this.userData.email, [Validators.required]],
      rol: [this.userData.rle, [Validators.required]],
      password: [this.userData.password, [Validators.required]],
      foto_perfil: [this.userData.foto_perfil, [Validators.required]],
    });
  };

  _update(): void {
    let updateData = {
      data: {
        nombre: this.editUserForm.get('nombre').value,
        apellido: this.editUserForm.get('apellido').value,
        edad: this.editUserForm.get('edad').value,
        email: this.editUserForm.get('email').value,
        rol: this.editUserForm.get('rol').value,
        password: this.editUserForm.get('password').value,
        foto_perfil: this.editUserForm.get('foto_perfil').value,
      },
    };

    let updatedUser = this.crudService.patchData(
      updateData,
      'user',
      this.userData._id
    );

    if (updatedUser !== []) {
      this.router.navigate(['users']);
      localStorage.clear();
    }
  }

  sendFile(event): void {
    let pic = this.editUserForm.get('foto_perfil').value;

    if (pic !== '-eA01tmXbMq5RdY6S1Af-jJf.jpeg') {
      this.filesService.deleteFile('galeria', pic);
    }

    const file = event.target.files;
    // console.log(file);

    this.filesService.saveFile(file).subscribe((res: DataRx) => {
      // console.log(res);
      if (res.ok) {
        pic = res.data[0];
        this.seeFile = this.filesService.getFile('galeria', pic);
      }
    });
  }
}
