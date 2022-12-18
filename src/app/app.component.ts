import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MenuController, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private menu:MenuController,private router: Router, private activeroute: ActivatedRoute,public nativeStorage: NativeStorage,private alertController: AlertController) {}

   salir() {
    this.router.navigate(['/home'])
  }
}
