import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm!: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }
  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  onSubmit() {
    if (this.resetForm.valid) {
      Swal.fire(
        'Contraseña Enviada!',
        'Revise su correo eletrónico!',
        'success'
      )
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Email Invalido',
        text: 'Por favor llene o escriba un email válido!',
      })
    }
  }
/**
 * funcion cancelar
 */

clickCancel(){
  this.router.navigate(['login'])
}
}
