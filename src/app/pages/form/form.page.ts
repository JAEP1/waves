import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  nombre: string = "";
  apellido: string = "";
  email: string= "";
  telefono: string = "";
  carrera: string = "";
  contra: string = "";



  constructor(private route: Router, public toastController: ToastController) { }

  guardar() {
    if (this.nombre != "" &&
      this.apellido != "" &&
      this.email != "" &&
      this.contra != "" &&
      this.telefono != "" &&
      this.carrera != "") {

      if (this.nombre.length >= 4 && this.nombre.length <= 12) {
        if (this.apellido.length >= 3 && this.apellido.length <= 13) {
          if (this.telefono.length >= 6 && this.telefono.length <=12) {
            if (this.contra.length >= 5 && this.contra.length <= 15) {
              this.route.navigate(['/home']);
            } else {
              this.presentToast("Contraseña invalida")
            }
          }
          else { this.presentToast("Telefono invalido") }
        } else {
          this.presentToast("El apellido no es valido, debe ser entre 3 y 13 caracteres.")
        }
      } else {
        this.presentToast("El nombre no es valido, debe ser entre 4 y 12 caracteres.")
      }
    } else {
      this.presentToast("Campos vacios")
    }
  }


  ngOnInit() {
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

}
