import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController, MenuController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicio.service';
import { EmailComposer, EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';





@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  scannedCode = "";
  nomUser: string;
  usuario: any[] = [];
  nombre: string;
  apellido: string;
  nCompleto: string;
  alumno: any;
  correo: string;
  profe: any;
  rut: string;
  seccionId: number;
  nombreSeccion: any;
  code: any;
  id_rol: string;
  seccion: any[] = [];
  asistencia: any[] = [];
  userId: any;
  codigo: any;
  codigoc: any;
  contra1: any;
  contra2: any;
  dateComparar: number;
  dateComparar2: number;
  dateCode: string;
  ramoCode: string;
  dateCode2: string;
  profeCode: string;
  seccionCode: string;
  image="";
  foto: any;
  dateSubCoparar2 = new Date().toString();
  constructor(private emailComposer: EmailComposer, private camera: Camera, private menu: MenuController, private router: Router, private barcodeScanner: BarcodeScanner, private activeroute: ActivatedRoute, public nativeStorage: NativeStorage, private alertController: AlertController, private db: DbservicioService) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.nomUser = this.router.getCurrentNavigation().extras.state.cadenaTexto;
      }

    });
    this.menu.enable(true);
  }


  ti(it) {
    let navigationExtras: NavigationExtras = {
      state: { sec: it.nombreRamo, sec0: it.prof, sec1: it.id }
    }
    this.profe = it.prof;
    this.seccionId = it.id;
    this.nombreSeccion = it.nombreRamo;

  }
  qr() {
    let navigationExtras: NavigationExtras = {
      state: { ramo1: this.nombreSeccion, profe1 : this.nomUser, seccion1 : this.seccionId }
    }
    this.router.navigate(['/qr'], navigationExtras);

  }
  edit(){
    let navigationExtras: NavigationExtras = {
      state: { nombre1: this.nombre , apellido1 : this.apellido , correo1 : this.correo , rut1 : this.rut }
    }
    this.router.navigate(['/editar'], navigationExtras);

  }
  ngOnInit() {
    this.dateComparar2 = Date.parse(this.dateSubCoparar2);
    this.nativeStorage.getItem('muestrauser').then((data) => {
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
        this.db.fetchSec().subscribe(async it => {
          this.seccion = it;
        })
      }
    });
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchUser().subscribe(async item => {
          this.usuario = item;

        })
      }
      this.nativeStorage.getItem('muestrauser').then((x) => {
        for (let i = 0; i < this.usuario.length; i++) {
          if (this.usuario[i].usuario == x) {
            this.nombre = this.usuario[i].nombre;
            this.apellido = this.usuario[i].apellidos;
            this.correo = this.usuario[i].correo;
            this.rut = this.usuario[i].rut;
            this.id_rol = this.usuario[i].id_rol;
            this.userId = this.usuario[i].id_usuario;
            this.foto = this.usuario[i].foto;
            this.nCompleto = this.nombre + " " + this.apellido;


          }
        }
      })

    });
  }
  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.code = barcodeData.text;
      this.dateCode = this.code.split('||')[1];
      this.dateCode2 = new Date(this.dateCode).toLocaleString();
      this.ramoCode = this.code.split('||')[0];
      this.profeCode = this.code.split('||')[2];
      this.seccionCode = this.code.split('||')[3];
      this.dateComparar = Date.parse(this.dateCode)


    })
  }
  async asistir() {
    if (this.dateComparar < this.dateComparar2) {
      this.db.presentAlert('Debes escanear un codigo valido.', 'Codigo erroneo.')
      this.code = "";
      this.router.navigate(['/perfil']);
    } else {
      this.db.registrarAsistencia(this.nomUser, this.dateCode2, this.profeCode, this.ramoCode, this.seccionCode, this.userId);
      this.db.presentAlert('Asistencia Registrada', 'Se ha registrado tu Asistencia')
    
      this.code = "";
      this.router.navigate(['/perfil']);
    }
  }
  async openEmail() {

    this.codigo = Math.round(Math.random() * (1000 - 0) + 0);
    const email: EmailComposerOptions = {
      app: 'gmail',
      to: this.correo,
      subject: 'Codigo verificación 🔐',
      body: 'Su codigo de verificacion es: ' + this.codigo,

    };
    await this.emailComposer.open(email);

  }
  guardar() {
    if (this.codigoc == "" && this.contra1 == "" && this.contra2 == "") {
      this.db.presentAlert('Complete el formulario para poder realizar el cambio', 'Campos Vacios')

    }
    else {

      if (this.codigoc == this.codigo && this.contra1 == this.contra2) {
        this.db.editarPass(this.nomUser, this.contra2);
        this.db.presentAlert('Datos Correctos', 'Se ha cambiado su clave.')
      }
      else {
        this.db.presentAlert('Los datos ingresados son incorrectos', 'Datos incorrectos')

      }
    }

  }
  fotoGaleria() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 1024,
      targetWidth: 1024,
      correctOrientation: true,
      saveToPhotoAlbum: true

    }).then(resultado => {
      this.image = "data:image/jpeg;base64," + resultado
    }).catch(error => {
      console.log(error);
    })

  }
  guardarFoto() {
    if (this.image.length>1) {
      this.db.editarFoto(this.nomUser, this.image);
      this.db.presentAlert('Imagen correcta', 'Se ha cambiado su imagen.')
      
      

    }
    else {
      this.db.presentAlert('Seleccione una imagen.', 'Contenedor vacio')
    }


  }




}

