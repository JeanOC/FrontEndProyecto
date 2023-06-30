import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidatosService {
  candidatos: any[] = [];
  selectedCandidato: any = null;
  url = 'http://localhost:3000/api/v1/listas';
  
  constructor(private http:HttpClient) { 
    this.loadListas();
   }

   loadListas() {
    return this.http.get(this.url);
  }

   addCandidato(payload: any) {
    let data = Object.values(payload)
    console.log("Data: "+ data);
    return this.http.post(this.url , payload);
  }

  updateCandidato(id: number, payload: any) {
    const index = this.candidatos.findIndex(candidato => candidato.id === id);
    this.candidatos[index] = payload;
  }

  deleteCandidato(id: number) {
    const index = this.candidatos.findIndex(candidato => candidato.id === id);
    if (index > -1) {
      this.candidatos.splice(index, 1);
    }
  }

  setSelectedCandidato(id:number){
    this.selectedCandidato = id
  }
}
