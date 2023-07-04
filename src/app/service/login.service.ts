import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    url = 'http://localhost:3000/api/v1/auth/login';

    constructor(private http: HttpClient) {
        this.isAdmin()
    }

    login(payload: any) {
        return this.http.post(this.url, payload)
    }
    isLogin():boolean{
        const token = localStorage.getItem('token');        
        return !!localStorage.getItem('token')
    }
    isAdmin(){
        const rol = localStorage.getItem('role')
    }


}
