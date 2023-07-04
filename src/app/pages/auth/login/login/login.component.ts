import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleGuard } from 'src/app/guard/role.guard';
import { LoginService } from 'src/app/service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  data: any;
  msgd: any;
  error: any;
  msg: any
  role: any
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private rolesGuard: RoleGuard
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      correo: ['', Validators.required],
      clave: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      Swal.fire({
        icon: 'info',
        title: 'Ingresando....',
      }).then((result) => {
        if (result.isConfirmed) {
          this.login();
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Se produjo un error',
        text: 'Ingrese sus credenciales para continuar!',
      })
    }
  }

  login() {
    // this.loginService.login(this.loginForm.value).subscribe(
    //   response => {
    //     this.router.navigate(['solicitud']);
    //     console.log(response);
    //   }

    // )
    this.loginService.login(this.loginForm.value).subscribe(
      (res) => {
        this.data = Object.values(res)
        this.msgd = Object.values(this.data[0]);
        this.role = Object.values(this.msgd[1]);
        if (this.msgd[1].estadoVoto == true) {
          Swal.fire({
            icon: 'error',
            title: 'El usuario ya regisro su voto',
            text: 'Si el usuario ingresado no registro su voto por favor comuniquese con un administrador!',
          })
        this.router.navigate(['login'])
        } else {
          sessionStorage.setItem('user', this.role[4])
          sessionStorage.setItem('id', this.role[0])
          localStorage.setItem('token', this.msgd[0])
          console.log(this.msgd[1].estadoVoto);
          this.router.navigate(['vista-lista'])
        }
      },
      (err) => {
        this.error = Object.values(err)
        this.msg = Object.values(this.error[7])
        alert("Error login"+this.msg[1]);

      }

    );


  }

  logOut() {
    localStorage.removeItem('token');
    alert('sesion cerrada')
  }
}
