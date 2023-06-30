import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CandidatosService } from '../../../service/candidatos.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-candidato',
  templateUrl: './candidato.component.html',
  styleUrls: ['./candidato.component.scss']
})
export class CandidatoComponent {
  public archivoUrl: string = 'assets/reglamento.pdf';

  nombre: string = ''; //cambio
  datosPresiNombre: string = ''; //cambio
  datosPresiCorreo: string = ''; //cambio
  datosViceNombre: string = ''; //cambio
  datosViceCorreo: string = ''; //cambio
  slogan: string = ''; //cambio
  datosSecretarioNombre: string = ''; //cambio
  datosSecretarioCorreo: string = ''; //cambio
  datosTesoreroNombre: string = ''; //cambio
  datosTesoreroCorreo: string = ''; //cambio
  nro_lista: number = 0; //cambio
  datosVocal1Nombre: string = ''; //cambio
  datosVocal1Correo: string = ''; //cambio
  datosVocal2Nombre: string = ''; //cambio
  datosVocal2Correo: string = ''; //cambio
  datosVocal3Nombre: string = ''; //cambio
  datosVocal3Correo: string = ''; //cambio
  logo: string = ''; //cambio
  propuesta: string = ''; //cambio
  estado: boolean = false;

  data: any
  form: FormGroup;
  public pre: any = [];
  public archivos: any = []

  onFile(event: any): any {
    const file: File = event.target.files[0];
    this.previewImage(file);
  }

  previewImage(file: File): any {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.pre = reader.result;
    };
    reader.readAsDataURL(file);
  }

  constructor(private formBuilder: FormBuilder,
    private candidatosService: CandidatosService,
    private sanitazer: DomSanitizer
  ) {
    if (this.candidatosService.selectedCandidato) {
      this.form = formBuilder.group({
        id: [this.candidatosService.selectedCandidato.id],
        nombre: [this.candidatosService.selectedCandidato.nombre, [Validators.required, Validators.minLength(2)]],
        datosPresiNombre: [this.candidatosService.selectedCandidato.datosPresiNombre, [Validators.required, Validators.minLength(2)]],
        datosPresiCorreo: [this.candidatosService.selectedCandidato.datosPresiCorreo, [Validators.required, Validators.email]],
        datosViceNombre: [this.candidatosService.selectedCandidato.datosViceNombre, [Validators.required, Validators.minLength(2)]],
        datosViceCorreo: [this.candidatosService.selectedCandidato.datosViceCorreo, [Validators.required, Validators.email]],
        slogan: [this.candidatosService.selectedCandidato.slogan, [Validators.required, Validators.minLength(2)]],
        datosSecretarioNombre: [this.candidatosService.selectedCandidato.datosSecretarioNombre, [Validators.required, Validators.minLength(2)]],
        datosSecretarioCorreo: [this.candidatosService.selectedCandidato.datosSecretarioCorreo, [Validators.required, Validators.email]],
        datosTesoreroNombre: [this.candidatosService.selectedCandidato.datosTesoreroNombre, [Validators.required, Validators.minLength(2)]],
        datosTesoreroCorreo: [this.candidatosService.selectedCandidato.datosTesoreroCorreo, [Validators.required, Validators.email]],
        nro_lista: [this.candidatosService.selectedCandidato.nro_lista, [Validators.required, Validators.min(1)]],
        datosVocal1Nombre: [this.candidatosService.selectedCandidato.datosVocal1Nombre, [Validators.required, Validators.minLength(2)]],
        datosVocal1Correo: [this.candidatosService.selectedCandidato.datosVocal1Correo, [Validators.required, Validators.email]],
        datosVocal2Nombre: [this.candidatosService.selectedCandidato.datosVocal2Nombre, [Validators.required, Validators.minLength(2)]],
        datosVocal2Correo: [this.candidatosService.selectedCandidato.datosVocal2Correo, [Validators.required, Validators.email]],
        datosVocal3Nombre: [this.candidatosService.selectedCandidato.datosVocal3Nombre, [Validators.required, Validators.minLength(2)]],
        datosVocal3Correo: [this.candidatosService.selectedCandidato.datosVocal3Correo, [Validators.required, Validators.email]],
        logo: [this.candidatosService.selectedCandidato.logo, [Validators.required, Validators.minLength(2)]],
        propuesta: [this.candidatosService.selectedCandidato.propuesta, [Validators.required, Validators.minLength(2)]],
        estado: [this.candidatosService.selectedCandidato.estado, []],
      })
    } else {
      this.form = formBuilder.group({
        //id: [0],
        nombre: ['', [Validators.required, Validators.minLength(2)]],
        datosPresiNombre: ['', []],
        datosPresiCorreo: ['', []],
        datosViceNombre: ['', []],
        datosViceCorreo: ['', []],
        slogan: ['', [Validators.required, Validators.minLength(2)]],
        datosSecretarioNombre: ['', []],
        datosSecretarioCorreo: ['', []],
        datosTesoreroNombre: ['', []],
        datosTesoreroCorreo: ['', []],
        nro_lista: ['', [Validators.required, Validators.min(1)]],
        datosVocal1Nombre: ['', []],
        datosVocal1Correo: ['', []],
        datosVocal2Nombre: ['', []],
        datosVocal2Correo: ['', []],
        datosVocal3Nombre: ['', []],
        datosVocal3Correo: ['', []],
        logo: this.archivos,
        propuesta: ['', [Validators.required, Validators.minLength(2)]],
        estado: [false, []],
      })
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.addCandidato();
      // this.onFileSelected(this.logo)
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Esta seguro de que quiere registrar esta lista?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Registrar lista',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Lista Registrada con Exito!',
            'Se enviará un correo de confirmación si su lista ha sido aceptada',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado!',
            'No se ha Registrado la Lista :)',
            'error'
          )
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No se ha completado el Registro',
        text: 'Complete el registro para continuar!',
      })
    }
    console.log(this.form.valid);
  }



  validateForm() {
    if (this.nombre === '' && this.nombre.length <= 3) {

    }
  }


  addCandidato() {
    this.candidatosService.addCandidato(this.form.value).subscribe(
      response => {
        console.log(response);
      }
    )
    this.data = Object.values(this.form.value);
    console.log("Desde componente" + this.data);
    console.log(this.pre);
    
  }

  // onFileSelected(event: any){
  //   const file : File = event.target.files[0]
  //   this.candidatosService.uploadImage(file)
  // }


  // addCandidatos() {
  //   this.candidatosService.addCandidatos(this.form.value).subscribe(
  //     response =>{
  //       console.log(response);
  //     }
  //   )
  //   this.data = Object.values(this.form.value);
  //   console.log("Desde componente" + this.data);
  // }
  updateCandidatos() {
    this.candidatosService.updateCandidato(this.idField.value, this.form.value);
    console.log(this.candidatosService.candidatos);
  }

  get idField() {
    return this.form.controls['id'];
  }



}


