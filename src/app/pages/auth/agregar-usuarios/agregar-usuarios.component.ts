import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/service/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-usuarios',
  templateUrl: './agregar-usuarios.component.html',
  styleUrls: ['./agregar-usuarios.component.scss']
})
export class AgregarUsuariosComponent {

  esModoEditar: boolean = true;

  nombreUser: string = ''; //cambio
  apellido: string = ''; //cambio
  cedula: number = 0; //cambio
  correo: string = ''; //cambio
  estadoUser: boolean = false;
  
  formUser: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private usuariosService: UsuariosService,
              private router: Router
              ) {
    if (this.usuariosService.selectedUsuario){
      this.formUser = formBuilder.group({
        id: [this.usuariosService.selectedUsuario.id],
        nombreUser: [this.usuariosService.selectedUsuario.nombreUser, [Validators.required, Validators.minLength(10)]],
        apellido: [this.usuariosService.selectedUsuario.apellido, [Validators.required, Validators.minLength(10)]],
        cedula: [this.usuariosService.selectedUsuario.cedula, [Validators.required, Validators.min(10)]],
        correo: [this.usuariosService.selectedUsuario.correo, [Validators.required, Validators.email]],
        estadoUser: [this.usuariosService.selectedUsuario.estado, []],
      })
    } else {
      this.formUser = formBuilder.group({
        id: [0],
        nombreUser: ['', [Validators.required, Validators.minLength(10)]],
        apellido: ['', [Validators.required, Validators.minLength(10)]],
        cedula: [0, [Validators.required, Validators.min(10)]],
        correo: ['', [Validators.required, Validators.email]],
        estadoUser: [false,[]],
      })
    }
  }

  onSubmit() {
    if (this.formUser.valid) {
      this.addUsuario();
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Esta seguro de que quiere registrar este Usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Registrar usuario',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Usuario registrado con Exito!',
            'Se enviará un correo de confirmación si su Usuario fue Aceptado',
            'success'
          )

            this.router.navigate(['usuarios'])
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado!',
            'Oops! Usuario no Registrado',
            'error'
          )
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No se ha completado el Registro de Usuario',
        text: 'Complete el usuario para continuar!',
      })
    }
    console.log(this.formUser.valid);
  }
  
 

  validateForm() {
    if (this.nombreUser === '' && this.nombreUser.length <= 3) {

    }
  }

  addUsuario() {
    this.usuariosService.addUsuario(this.formUser.value);
    console.log(this.usuariosService.usuarios);
  }

  updateUsuario() {
    this.usuariosService.updateUsuario(this.idField.value, this.formUser.value);
    console.log(this.usuariosService.usuarios);
    this.router.navigate(['usuarios'])
  }

  get idField() {
    return this.formUser.controls['id'];
  }
}
