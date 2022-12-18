import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MenuController, AlertController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.page.html',
  styleUrls: ['./pagina1.page.scss'],
})
export class Pagina1Page implements OnInit {
  nomUser: string;
  usuario: any[] = [];
  nombre: string;
  id_rol:string;
  constructor(private menu:MenuController,private router: Router, private activeroute: ActivatedRoute,public nativeStorage: NativeStorage,private alertController: AlertController, private db: DbservicioService) {

    this.activeroute.queryParams.subscribe(params => {
    if(this.router.getCurrentNavigation().extras.state){
      this.nomUser = this.router.getCurrentNavigation().extras.state.cadenaTexto;
    }

  }); 
}
ngOnInit() {
  this.nativeStorage.getItem('muestrauser').then((data)=>{
    this.nomUser = data;
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
          this.nombre = this.usuario[i].nombre;
          this.id_rol = this.usuario[i].id_rol;
        }
      }
    })

  });

}

  openFirst(){
    this.menu.enable(true,'first');
    this.menu.open('first');

  }
  openEnd(){
    this.menu.open('end');

  }

  
  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
