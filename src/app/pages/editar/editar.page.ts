import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicio.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  nombre: string = "";
  apellido: string = "";
  email: string= "";
  telefono: string = "";
  carrera: string = "";
  contra: string = "";
  nomUser: string;
  rut : string;
  nombre1 : string;
  apellido1 : string;
  correo1 : string;
  rut1 : string;


  constructor(private active: ActivatedRoute,private router: Router, public nativeStorage: NativeStorage,public toastController: ToastController, private db: DbservicioService) {
    this.active.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.nombre1 = this.router.getCurrentNavigation().extras.state.nombre1;
        this.apellido1 = this.router.getCurrentNavigation().extras.state.apellido1;
        this.correo1 = this.router.getCurrentNavigation().extras.state.correo1;
        this.rut1 = this.router.getCurrentNavigation().extras.state.rut1;
      }
    })
   }
  // guardar() {
  //   if (this.nombre != "" &&
  //     this.apellido != "" &&
  //     this.email != "" &&
  //     this.contra != "" &&
  //     this.telefono != "" &&
  //     this.carrera != "") {

  //     if (this.nombre.length >= 4 && this.nombre.length <= 12) {
  //       if (this.apellido.length >= 3 && this.apellido.length <= 13) {
  //         if (this.telefono.length >= 6 && this.telefono.length <=12) {
  //           if (this.contra.length >= 5 && this.contra.length <= 15) {
  //             this.route.navigate(['/home']);
  //           } else {
  //             this.presentToast("Contraseña invalida")
  //           }
  //         }
  //         else { this.presentToast("Telefono invalido") }
  //       } else {
  //         this.presentToast("El apellido no es valido, debe ser entre 3 y 13 caracteres.")
  //       }
  //     } else {
  //       this.presentToast("El nombre no es valido, debe ser entre 4 y 12 caracteres.")
  //     }
  //   } else {
  //     this.presentToast("Campos vacios")
  //   }
  // }

  ngOnInit() {
    this.nativeStorage.getItem('muestrauser').then((data) => {
      this.nomUser = data;
    });
  }
  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create(
      {
        message: message,
        duration: duration ? duration : 2000
      }
    );
    toast.present();
  }
  editar(){
    this.db.editarPerfil(this.nomUser, this.nombre, this.apellido,this.email,this.rut);
    this.db.presentAlert("Reinicie la sesión para ver los cambios.","Modificación exitosa");
    this.router.navigate(['/perfil']);
    
  }

}
