import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  co: String = "";
  cn: String = "";
  cnn: String = "";

  constructor(private route: Router, public toastController:ToastController) {}

  update(){
    if(
      this.co != "" &&
      this.cn != "" &&
      this.cnn != "") {
        if(this.cnn == this.cn) {
          this.route.navigate(['/home']);
        }
        else{ this.presentToast("Correo y/o contraseña incorrecta")
        }
    }else{
      this.presentToast("Rellene los campos vacios.")
  }
  }

  ngOnInit() {
  }
  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create(
      {
        message: message,
        duration: duration ? duration : 3000
      }
    );
    toast.present();
  }

}
