import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UsuarioLogin = new UsuarioLogin

  constructor(
  private auth: AuthService,
  private router: Router  
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar(){
    this.auth.login(this.userLogin).subscribe((resp: UsuarioLogin)=>{
      this.userLogin = resp

      environment.token = this.userLogin.token //Entrar já com os atributos do usuário
      environment.nome = this.userLogin.nome  //Entrar já com os atributos do usuário
      environment.foto = this.userLogin.foto  //Entrar já com os atributos do usuário
      environment.id = this.userLogin.id      //Entrar já com os atributos do usuário
      environment.tipo = this.userLogin.tipo

      console.log(environment.token)
      console.log(environment.nome)
      console.log(environment.foto)
      console.log(environment.id)

      this.router.navigate(['/inicio'])
    },erro =>{
      if (erro.status == 500){
        alert("Usuário ou senha incorretos!")
      }
    })
  }

}
