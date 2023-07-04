import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  usuarios: any[] = [];
  listarUsuario:any;
  selectedUsuario: any;

  constructor(private usuariosService: UsuariosService, 
    private router: Router,  private usuarioService: UsuariosService
    ) {
      this.loadUsuarios()
  }
  loadUsuarios() {
    this.usuarioService.loadUsuarios().subscribe(
      (res) => {
        this.listarUsuario = <any>res;
        this.usuarios = Object.values(this.listarUsuario);
        this.usuarios = Object.values(this.usuarios[0]);
       // this.tipoLista = Object.values(this.data[0].tipoLista)
      },
      (err) => console.log(err)
    );
  }

  verDetalleUsuario(item: any) {
    this.usuariosService.setSelectedUsuario(item);
    this.router.navigate(['/agregar-usuario']);
  }

  createUsuario() {
    this.usuariosService.selectedUsuario = null;
    this.router.navigate(['agregar-usuarios']);
  }

  editUsuario(usuario: any) {
    this.usuariosService.selectedUsuario = usuario;
    this.router.navigate(['agregar-usuarios']);
  }
/*
  deleteUsuario(id_user: number) {
    this.usuariosService.deleteUsuario(id_user);
    console.log(this.selectedUsuario.usuario);
  }
*/



  confirmarEliminacion() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Eliminar Usuario',
      text: "¿Esta seguro de eliminar este usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Usuario Eliminado!',
          'Se ha eliminado el usuario con exito',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Usuario no eliminado :)',
          'error'
        )
      }
    })
  }

  exportToExcel(): void {
    // Datos de ejemplo, reemplázalos con los datos de tu tabla
    // Crea un nuevo libro de trabajo de Excel
    const workbook = XLSX.utils.book_new();
  
    // Crea una hoja de trabajo y asigna los datos de la tabla a la misma
    const worksheet = XLSX.utils.json_to_sheet(this.usuarios);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');
  
    // Genera el archivo Excel
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  
    // Guarda el archivo utilizando FileSaver.js
    saveAs(data, 'usuarios.xlsx');
  }
  /**
   * function agregar usuarios
   */

  handleFileInput(event: any) {
    const file: File = event.target.files[0];
    const fileReader: FileReader = new FileReader();
  
    fileReader.onload = (e: any) => {
      const arrayBuffer: any = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(arrayBuffer, { type: 'array' });
      const worksheet: XLSX.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log(Object.values(jsonData));
      
  for(let i = 0;  i < jsonData.length; i++){
    console.log(jsonData[i]);
    
    this.usuariosService.addUsuarios(jsonData[i]).subscribe(
      response =>{
        console.log(response);
      }
     )
  }
// Aquí puedes trabajar con los datos del archivo Excel
    };
  
    fileReader.readAsArrayBuffer(file);
  }
}
