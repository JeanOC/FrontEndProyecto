import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatosService } from 'src/app/service/candidatos.service';

@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html',
  styleUrls: ['./observaciones.component.scss']
})
export class ObservacionesComponent {
  item: any
  form: FormGroup;
  constructor(
    private candidatosService: CandidatosService,
    private formBuilder: FormBuilder,
    private router: Router,
  ){
    this.item = this.candidatosService.selectedCandidato
    console.log(this.item);
    this.form = formBuilder.group({
      estado:[false, Validators.required]
    })
  }


  onSubmit(){
    this.candidatosService.updateCandidato(this.item.id, this.form.value).subscribe(
      response => {
        console.log(response);
      }
    );
    this.router.navigate(['/solicitud'])
  }
}
