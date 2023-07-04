import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatosService } from 'src/app/service/candidatos.service';
import { UsuariosService } from 'src/app/service/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vista-integrantes',
  templateUrl: './vista-integrantes.component.html',
  styleUrls: ['./vista-integrantes.component.scss']
})
export class VistaIntegrantesComponent {

  item: any
  votos = 0;
  form: FormGroup;
  idUser = sessionStorage.getItem('id')
  estadoVoto = false
  constructor(
    private candidatosService: CandidatosService,
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService
  ){
    this.item = this.candidatosService.selectedCandidato
    this.votos = +this.item.votos + 1; 
    console.log(+this.item.votos)
    this.form  = formBuilder.group({
      votos:[this.votos++]
    })
    console.log(this.idUser);
    
  }

  clickRegresar(){
    this.router.navigate(['vista-lista'])
  }

  onSubmit() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Voto Registrado',
      text: 'Sesión Cerrada',
      showConfirmButton: false,
      timer: 2000
    })
    this.updataVoto()
    this.logOut();
 }
 updataVoto() {
  this.candidatosService.updateCandidato(this.item.id, this.form.value).subscribe(
    response => {
      console.log(response);
    }
  )
  this.usuarioService.updateUsuario(this.idUser, {estadoVoto: true}).subscribe(
    response => {
      console.log(response);
    }
  )
}
 logOut(){
  localStorage.removeItem('token');
  sessionStorage.removeItem('id');
  sessionStorage.removeItem('user');
  this.router.navigate(['login']);
}

}
