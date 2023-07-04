import { Component } from '@angular/core';
import { CandidatosService } from 'src/app/service/candidatos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html',
  styleUrls: ['./observaciones.component.scss']
})
export class ObservacionesComponent {
  item: any

  constructor(
    private candidatosService: CandidatosService
  ){
    this.item = this.candidatosService.selectedCandidato
    console.log(this.item)
  }
  
  guardarEstado(){
    Swal.fire(
      'Estado de Lista Guardado!',
      'Envia el Estado al Correo Electrónico',
      'success'
    )
  }

  enviarCorreo(){
    Swal.fire(
      'Correo enviado con Éxito!',
      '',
      'success'
    )
  }
}
