import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { DbservicioService } from '../services/dbservicio.service';
import { Storage } from '@ionic/storage-angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  date2 = new Date((new Date()).valueOf() + 1000*120).toString()
 
  
  cadena ="Programacion de aplicaciones moviles ||" + this.date2;  
  subCadena=this.cadena.slice(-59);
  saludoPalabras = this.cadena.split('||')[1];
  dateTest :string;

  usuarios: any[]=[{
    id: '',
    nombre:'',
    clave:'',
    id_rol:''
  }];

  login: any = {
    Usuario: '',
    Clave: ''
  }

  usuario: any = []
  constructor(private servicioApi: ApiService,private menu:MenuController,private toastController: ToastController, private router: Router, private alertController: AlertController, public storage: Storage, private db: DbservicioService, public nativeStorage: NativeStorage) {
    this.menu.enable(false);
   }


  ngOnInit() {
    this.servicioApi.getUsuarios().subscribe((res)=>{
      this.usuarios = res; 
      for(let x of this.usuarios){
        this.db.registrarUsuario(x.id, x.nombre,x.clave, x.id_rol);
      }
     
    });

    this.nativeStorage.remove('muestrauser');
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchUser().subscribe(item => {
          this.usuario = item;
        })
      }
    });
   
    // this.dateTest =  new Date(this.date2).toLocaleString();
  }
  
  async ingresarJson() {
    
    let navigationExtras: NavigationExtras = {
      state: { cadenaTexto: this.login.Usuario }
    }
    this.nativeStorage.setItem('muestrauser', this.login.Usuario);
    await this.db.loginN1(this.login.Usuario, this.login.Clave);
    await this.db.loginN2(this.login.Usuario, this.login.Clave);

  }


  async ingresar() {
    let navigationExtras: NavigationExtras = {
      state: { cadenaTexto: this.login.Usuario }
    }
    this.nativeStorage.setItem('muestrauser', this.login.Usuario);
    await this.db.login(this.login.Usuario, this.login.Clave);
    await this.db.login2(this.login.Usuario, this.login.Clave);

  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Inicio correcto.',
      duration: 2000
    });
    toast.present();
  }





}
