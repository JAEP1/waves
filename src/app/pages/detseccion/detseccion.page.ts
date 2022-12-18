import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-detseccion',
  templateUrl: './detseccion.page.html',
  styleUrls: ['./detseccion.page.scss'],
})
export class DetseccionPage implements OnInit {

fechaHoy: String = new Date().toLocaleString();
s:string="";
a:number=0;
clases = new Array();
addClases ={
  name:"Clase del dia: " + this.fechaHoy
}
// componentes: Componente[] =[
//   {
//     nombre:'Clase 1'
    
//   },
//   {
//     nombre:'Clase 2'
    
//   }
// ];
  constructor(private router:Router, private activedRoute: ActivatedRoute) { 
    this.activedRoute.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.s = this.router.getCurrentNavigation().extras.state.seccion;
        
      }
    })
  }
  ti(it){
    let navigationExtras: NavigationExtras ={
      state:{sec: it.nombreRamo, sec0:it.prof, sec1: it.id }
    }
    this.router.navigate(['/asistentes'],navigationExtras);
  }

  ngOnInit() {
  }
  add(clase){
    this.clases.push(this.addClases)

  }
  

}
// interface Componente{
// nombre: string;
// }
