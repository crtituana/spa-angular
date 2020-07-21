import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CrudService } from '../../services/crud.service';
import { FilesService } from '../../services/files.service.js';
import { DataRx } from 'src/app/models/data-rx';

export interface UserData {
  data: {
    nombre: string;
    apellido: string;
    edad: number;
    email: string;
    rol: String;
    password: string;
    foto_perfil: string;
  };
}

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  createUserForm: FormGroup;
  dataUser: UserData;
  seeFile: any;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private filesService: FilesService
  ) {}

  ngOnInit(): void {
    this._createUserForm();
    this.seeFile = this.filesService.getFile('galeria', 'defaultPIC.png');
  }

  _createUserForm = () => {
    this.createUserForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      email: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      foto_perfil: ['', [Validators.required]],
    });
  };

  registerUser(): void {
    this.dataUser = {
      data: {
        nombre: this.createUserForm.get('nombre').value,
        apellido: this.createUserForm.get('apellido').value,
        edad: this.createUserForm.get('edad').value,
        email: this.createUserForm.get('email').value,
        rol: this.createUserForm.get('rol').value,
        password: this.createUserForm.get('password').value,
        foto_perfil: this.createUserForm.get('foto_perfil').value,
      },
    };

    let confirmPassword = this.createUserForm.get('confirmPassword').value;

    if (this.dataUser.data.password === confirmPassword) {
      if (
        this.dataUser.data.nombre &&
        this.dataUser.data.apellido &&
        this.dataUser.data.email
      ) {
        const dataUser = {
          data: this.dataUser.data,
        };

        let savedUser = this.crudService.postData(dataUser, 'user');
        if (savedUser !== []) {
          this.router.navigate(['users']);
        }
      } else {
        console.log('Fill al the gaps to continue please');
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: "passwords don't match, try again",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }

  sendFile(event): void {
    let pic = this.createUserForm.get('foto_perfil').value;

    if (pic !== 'defaultPIC.png') {
      this.filesService.deleteFile('galeria', pic);
    }

    const file = event.target.files;
    console.log(file);

    this.filesService.saveFile(file).subscribe((res: DataRx) => {
      // console.log(res);
      if (res.ok) {
        pic = res.data[0];
        this.seeFile = this.filesService.getFile('galeria', pic);
      }
    });
  }
}
