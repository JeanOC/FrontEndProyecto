import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-lista',
  templateUrl: './vista-lista.component.html',
  styleUrls: ['./vista-lista.component.scss']
})

export class VistaListaComponent {

  constructor(
    private router: Router
  ){}
/**
 * funcion llevar a la vista candidatos
 */
clickVerCandidatos(){
  this.router.navigate(['vista-integrantes'])
}
}
