import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {


  tema: Tema = new Tema()
  listaTemas: Tema[]

  constructor(
    private router: Router,
    private temaService: TemaService

  ) { }

  ngOnInit() {
    if(environment.token == ''){
      // alert("Sua seção expirou. Faça o login novamente!")
      this.router.navigate(['/login'])
    }

    if(environment.tipo != 'adm'){
      alert("Você precisa ser administrador para acessar esssa rota")
      this.router.navigate(['/inicio'])
    }

    this.findAllTemas()
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }

  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      alert('Tema criado com sucesso!')
      this.findAllTemas()
      this.tema = new Tema()
    })
  }

}
