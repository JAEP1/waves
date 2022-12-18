import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.page.html',
  styleUrls: ['./secciones.page.scss'],
})
export class SeccionesPage implements OnInit {
  usuario: any[] = [];
  id_rol: string;
  nombre : string;
  code:any;
  nomUser : string;
  clases = new Array();
  addClases = {
    name: "Seccion"
  }

  u: string = "";
  sec: string = "";
  constructor(private menu:MenuController,private router: Router, private activedRoute: ActivatedRoute, private alertController: AlertController, private barcodeScanner: BarcodeScanner,public nativeStorage: NativeStorage,private db: DbservicioService) {
    this.activedRoute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.nomUser = this.router.getCurrentNavigation().extras.state.cadenaTexto;
      }
  
    });
    this.menu.enable(true);
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

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.code = barcodeData.text;
      console.log('Barcode data', this.code);
     }).catch(err => {
         console.log('Error', err);
     });

  }
  botonIr() {
    let navigationExtras: NavigationExtras = {
      state: {
        seccion: this.sec
      }
    }
    this.router.navigate(['/detseccion'], navigationExtras);
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Asistencia',
      subHeader: 'El porcentaje de asistencia: 80%',
      message: '8 de 10 clases',
      buttons: ['OK'],
    });

    await alert.present();
  }

  

  
  
  add(clase) {
    this.clases.push(this.addClases)

  }

}
