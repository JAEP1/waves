import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { DbservicioService } from 'src/app/services/dbservicio.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-asistentes',
  templateUrl: './asistentes.page.html',
  styleUrls: ['./asistentes.page.scss'],
})
export class AsistentesPage implements OnInit {
  asistencia: any[] = [];
  usuario: any[] = [];
  userId: string;
  id_rol: any;
  idAsis:number;
  nombreSeccion: any;
  profeSeccion:any;
  nomUser :string;

  constructor(private db: DbservicioService, public nativeStorage: NativeStorage,private router: Router, private active: ActivatedRoute) { 
    this.active.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.idAsis = this.router.getCurrentNavigation().extras.state.sec1;
        this.nombreSeccion = this.router.getCurrentNavigation().extras.state.sec;
        this.profeSeccion = this.router.getCurrentNavigation().extras.state.sec0;
      }
    })
     
  }
  

  ngOnInit() {
    this.nativeStorage.getItem('muestrauser').then((data)=>{
      this.nomUser = data;
    });
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchAsistencia().subscribe(async it => {
          this.asistencia = it;
        })
        console.log(this.asistencia);
      }
    });

    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchUser().subscribe(async item => {
          this.usuario = item;
        })


      }
      this.nativeStorage.getItem('muestrauser').then((x) => {//llamo al rut que ingrese al loguear y defini que x = correo
        for (let i = 0; i < this.usuario.length; i++) {//select  en que la varible x es = a correo diciendo que revise todo lo que esta en el puesto 0
          if (this.usuario[i].usuario == x) {//si el rut que estaba en login es == a el rut de la lista 0 
            this.id_rol = this.usuario[i].id_rol;
            this.userId = this.usuario[i].id_usuario;

          }
        }
      })

    });
  }
  presentar() {
    let navigationExtras: NavigationExtras = {
      state: { sec1: this.idAsis, sec: this.nombreSeccion, se0: this.profeSeccion }
      
    }
    this.router.navigate(['/generar'], navigationExtras);
    console.log(this.idAsis, this.nombreSeccion, this.profeSeccion);
  }

}
