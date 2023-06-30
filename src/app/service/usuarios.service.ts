import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  usuarios: any[] = [];
  selectedUsuario: any = null

  constructor() {
    this.loadUsuarios()
  }

  private loadUsuarios() {
    this.usuarios = [];
    this.usuarios.push({
      id: 1,
      nombreUser: "Pepito",
      apellido: "Lopez",
      cedula: "6969696969",
      correo: "plopez@yavirac.edu.ec",
      estado: true
    },
      {
        id: 2,
        nombreUser: "Juan",
        apellido: "perez",
        cedula: "6969696969",
        correo: "jPerez@yavirac.edu.ec",
        estado: false
      }
    )

  }

  /**
   * funtion agregar usuarios
   */
  addUsuario(payLoad: any) {
    this.usuarios.push(payLoad);
  }

  /**
   * function actualizar usuarios 
   */
  updateUsuario(id: number, payLoad: any) {
    const index = this.usuarios.findIndex(usuario => usuario.id === id);
    this.usuarios[index] = payLoad;
  }

  /**
   * function borrar usuarios
   */
  deleteUsuario(id: number, payLoad: any) {
    const index = this.usuarios.findIndex(usuario => usuario.id === id);
    if (index < -1) {
      this.usuarios.splice(index, 1)
    }
  }

  /**
   * function selected usuario
   */
  setSelectedUsuario(id: number) {
    this.selectedUsuario = id
  }
}
