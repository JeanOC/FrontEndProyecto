import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-integrantes',
  templateUrl: './vista-integrantes.component.html',
  styleUrls: ['./vista-integrantes.component.scss']
})
export class VistaIntegrantesComponent {

  constructor(
    private router: Router
  ){}

  clickRegresar(){
    this.router.navigate(['vista-lista'])
  }

}
