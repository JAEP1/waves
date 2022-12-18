import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './usuario';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { Seccion } from './seccion';
import { Asistencia } from './asistencia';
import { Usuarios } from './usuarios'



@Injectable({
  providedIn: 'root'
})
export class DbservicioService {
  //variable para guardar  y manipular la BD
  public database: SQLiteObject;
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  //variable para crear tablas e insertar registros por defecto en tablas
  // tablaUsuario: string = "CREATE TABLE IF NOT EXISTS Usuario(id_usuario INTEGER PRIMARY KEY autoincrement, rut VARCHAR(50) , nombre VARCHAR(50) NOT NULL, nombredato VARCHAR(50) ,apellidos VARCHAR(50) ,correo VARCHAR(50),clave VARCHAR(50) NOT NULL, id_rol VARCHAR(50) NOT NULL)";
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS Usuario(id_usuario INTEGER PRIMARY KEY autoincrement, rut VARCHAR(50) , usuario VARCHAR(50) NOT NULL, nombre VARCHAR(50) ,apellidos VARCHAR(50) ,correo VARCHAR(50),clave VARCHAR(50) NOT NULL, id_rol INTEGER, foto BLOB)";
  tablaSeccion: string = "CREATE TABLE IF NOT EXISTS Seccion( id INTEGER PRIMARY KEY autoincrement, nombreRamo VARCHAR(50) NOT NULL, sigla VARCHAR(50) NOT NULL, prof VARCHAR(50) NOT NULL, userId VARCHAR(50) NOT NULL,FOREIGN KEY(userId) REFERENCES Usuario(id_usuario)ON DELETE CASCADE ON UPDATE CASCADE)";
  tablaAsistencia: string= "CREATE TABLE IF NOT EXISTS Asistencia( id_asistencia INTEGER PRIMARY KEY autoincrement,alumno VARCHAR(50) NOT NULL, fecha TEXT VARCHAR(50) NULL, profe VARCHAR(50) NOT NULL,seccion VARCHAR(50) NOT NULL,seccionId INTEGER NOT NULL, userId VARCHAR(50), FOREIGN KEY(seccionId) REFERENCES seccion(id)ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY(userId) REFERENCES Usuario(id_usuario)ON DELETE CASCADE ON UPDATE CASCADE);";
  //crea tabla de json
  // tablaUsuariosLogin: string = "CREATE TABLE IF NOT EXISTS usuarioLog(id_usuario INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(30) NOT NULL, clave TEXT NOT NULL, id_rol INTEGER);";
  tablaUsuariosLogin: string = "CREATE TABLE IF NOT EXISTS usuarioLog(id_usuario INTEGER PRIMARY KEY autoincrement, rut VARCHAR(50),nombre VARCHAR(30) NOT NULL ,nombredato VARCHAR(50) ,apellidos VARCHAR(50) ,correo VARCHAR(50) , clave TEXT NOT NULL, id_rol INTEGER);";

  //insersion registros
  
  // profesor: string = "INSERT or IGNORE INTO Usuario(id_usuario,rut,usuario,nombre,apellidos,correo,clave,id_rol) VALUES (1,'11.111.111-1','v.rosendo','Victor','Rosendo','alonsoespinozaperez@gmail.com','J.12mm8','1')";
  // profesor2: string = "INSERT or IGNORE INTO Usuario(id_usuario,rut,usuario,nombre,apellidos,correo,clave,id_rol) VALUES (6,'66.666.666-6','v.rosendo5','Victor','Rosendo','alonsoespinozaperez@gmail.com','J.12mm5','1')";
  // alumno1: string = "INSERT or IGNORE INTO Usuario(id_usuario,rut,usuario,nombre,apellidos,correo,clave,id_rol) VALUES (2,'22.222.222-2','j.baez','Juan','Baez','vamojk@gmail.com','B.34vf8','2')";
  // alumno2: string = "INSERT or IGNORE INTO Usuario(id_usuario,rut,usuario,nombre,apellidos,correo,clave,id_rol) VALUES (3,'33.333.333-3','a.diaz','Alexis','Diaz','alonsoespinozaperez@gmail.com','C.54yt78','2')";
  // alumno3: string = "INSERT or IGNORE INTO Usuario(id_usuario,rut,usuario,nombre,apellidos,correo,clave,id_rol) VALUES (4,'44.444.444-4','j.baez','Juan','Baez','jo.espinozap@duocuc.cl','B.34vf8','2')";
  // alumno4: string = "INSERT or IGNORE INTO Usuario(id_usuario,rut,usuario,nombre,apellidos,correo,clave,id_rol) VALUES (5,'55.555.555-5','test','test','1','asd','123','2')";
  ramo1: any ="INSERT or IGNORE INTO Seccion(id, nombreRamo , sigla ,prof,userId) VALUES(1,'Diseño de prototipos','001D','Victor Rosendo','3');";
  ramo2: string ="INSERT or IGNORE INTO Seccion(id ,nombreRamo ,sigla ,prof ,userId) VALUES(2,'Programación de aplicaciones móviles','001D','Victor Rosendo','3');";
  asistenteTest: string ="INSERT or IGNORE INTO Asistencia(id_asistencia,alumno,fecha,profe,seccion,seccionId,userId) VALUES(1,'Alexis','Asistió el Día:16/10/2022 10:00:00','Victor','Programación de aplicaciones móviles',2,'3')";
  asistenteTest2: string ="INSERT or IGNORE INTO Asistencia(id_asistencia,alumno,fecha,profe,seccion,seccionId,userId) VALUES(2,'Juanito','Asistió el Día:16/10/2022 11:00:00','Victor','Programación de aplicaciones móviles',2,'3')";

  //observable para manipular los registros de una tabla
  Usuarios = new BehaviorSubject([]);
  Seccion = new BehaviorSubject([]);
  Asistencia = new BehaviorSubject([]);
  listaUsuariosLog = new BehaviorSubject([]);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController, public storage: Storage, private toastController: ToastController,private router: Router) {
    this.crearBD();
  }

  dbState() {
    return this.isDbReady.asObservable();
  }
  

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'waves10.db',
        location: 'default'

      }).then((Database: SQLiteObject) => {
        this.database = Database;
        this.crearTablas();
      }).catch(e => {
        this.presentAlert(e, "Error Creación de BD");
      })
    })
  }
  async crearTablas() {
    try {
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaUsuariosLogin, []);
      // await this.database.executeSql(this.profesor, []);
      // await this.database.executeSql(this.profesor2, []);
      // await this.database.executeSql(this.alumno1, []);
      // await this.database.executeSql(this.alumno2, []);
      // await this.database.executeSql(this.alumno3, []);
      // await this.database.executeSql(this.alumno4, []);
      await this.database.executeSql(this.tablaSeccion, []);
      await this.database.executeSql(this.ramo1, []);
      await this.database.executeSql(this.ramo2, []);
      await this.database.executeSql(this.tablaAsistencia, []);
      //await this.database.executeSql(this.asistenteTest, []);
      //await this.database.executeSql(this.asistenteTest2, []);
      this.listarUser();
      this.listarsec();
      this.listarAsistencia();
      this.buscarUsuariosLog();
      this.isDbReady.next(true);
    } catch (e) {
      this.presentAlert("Error al crear base de datos", e);
    }
  }
  //método para mostrar mensajes mediante alertas
  async presentAlert(msj: string, lugar: string) {
    const alert = await this.alertController.create({
      header: lugar,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000

    });
    toast.present();
  }

  


  

  fetchUser(): Observable<Usuario[]> {
    return this.Usuarios.asObservable();
  }
  fetchSec(): Observable<Seccion[]> {
    return this.Seccion.asObservable();
    
  }
  fetchAsistencia(): Observable<Asistencia[]> {
    return this.Asistencia.asObservable();
    
  }
  fetchUsuariosLog(): Observable<Usuarios[]> {
    return this.listaUsuariosLog.asObservable();
  }

  buscarUsuariosLog() {
    //ejecuto la consulta
    return this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      //creo el arreglo para los registros
      let items: Usuarios[] = [];
      //si existen filas
      if (res.rows.length > 0) {
        //recorro el cursor y lo agrego al arreglo
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id_usuario,
            nombre: res.rows.item(i).nombre,
            contra: res.rows.item(i).clave,
            idr: res.rows.item(i).id_rol
          })
        }
      }
      //actualizo el observable
      this.listaUsuariosLog.next(items);

    })
  }



  listarUser() {
    return this.database.executeSql('SELECT * FROM Usuario', []).then(res => {
      let items: Usuario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.row.length; i++) {
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            rut: res.rows.item(i).rut,
            usuario: res.rows.item(i).usuario,
            nombre: res.rows.item(i).nombre,
            apellidos: res.rows.item(i).apellidos,
            correo: res.rows.item(i).correo,
            clave: res.rows.item(i).clave,
            id_rol: res.rows.item(i).id_rol,
            foto: res.rows.item(i).foto
          });

        }
      }
      this.Usuarios.next(items);
    });
  }
  listarsec() {
    return this.database.executeSql('SELECT * FROM seccion', []).then(res => {
      let items: Seccion[] = [];

      if (res.rows.length > 0) {

        for (var i = 0; i < res.rows.length; i++) {

          items.push({
            id: res.rows.item(i).id,
            nombreRamo: res.rows.item(i).nombreRamo,
            sigla: res.rows.item(i).sigla,
            prof: res.rows.item(i).prof,
            userId: res.rows.item(i).userRut,
          });
        }
      }
      this.Seccion.next(items);
    });
  }
  listarAsistencia() {
    return this.database.executeSql('SELECT * FROM asistencia', []).then(res => {
      let items: Asistencia[] = [];

      if (res.rows.length > 0) {

        for (var i = 0; i < res.rows.length; i++) {

          items.push({
            id_asistencia: res.rows.item(i).id_asistencia,
            alumno: res.rows.item(i).alumno,
            fecha: res.rows.item(i).fecha,
            profe: res.rows.item(i).profe,
            seccion: res.rows.item(i).seccion,
            seccionId: res.rows.item(i).seccionId,
            userId: res.rows.item(i).userId
          });
        }
      }

      this.Asistencia.next(items);
    });
  }
  registrarAsistencia(alumno,fecha,profe,seccion,seccionId,userId){
    let data = [ alumno,fecha,profe,seccion,seccionId,userId];
    return this.database.executeSql('INSERT INTO Asistencia (alumno,fecha,profe,seccion,seccionId,userId) VALUES (?,?,?,?,?,?)', data)
      .then(res => {
        this.listarAsistencia();
      })
      
  }



  login(usuario, clave) {
    let data = [usuario, clave]
    return this.database.executeSql('SELECT * from Usuario where usuario = ? and clave = ? and id_rol="1"', [data[0], data[1]]).then(res => {
    let items: Usuario[] = [];
    if (res.rows.length > 0) {
      for (var i = 0; i < res.rows.length; i++) {
        items.push({
          id_usuario: res.rows.item(i).id_usuario,
            rut: res.rows.item(i).rut,
            usuario: res.rows.item(i).usuario,
            nombre: res.rows.item(i).nombre,
            apellidos: res.rows.item(i).apellidos,
            correo: res.rows.item(i).correo,
            clave: res.rows.item(i).clave,
            id_rol: res.rows.item(i).id_rol,
            foto: res.rows.item(i).foto
        });
      }
      this.router.navigate(['/perfil'])
    }
    this.Usuarios.next(items);
    });
  }
  login2(usuario, clave) {
    let data = [usuario, clave]
    return this.database.executeSql('SELECT * from Usuario where usuario = ? and clave = ? and id_rol="2"', [data[0], data[1]]).then(res => {
    let items: Usuario[] = [];
    if (res.rows.length > 0) {
      for (var i = 0; i < res.rows.length; i++) {
        items.push({
          id_usuario: res.rows.item(i).id_usuario,
            rut: res.rows.item(i).rut,
            usuario: res.rows.item(i).usuario,
            nombre: res.rows.item(i).nombre,
            apellidos: res.rows.item(i).apellidos,
            correo: res.rows.item(i).correo,
            clave: res.rows.item(i).clave,
            id_rol: res.rows.item(i).id_rol,
            foto: res.rows.item(i).foto
        });
      }
      this.router.navigate(['/perfil'])
      
    }
    this.Usuarios.next(items);
    });
  }

////////////////////////LOGIN NATIVO//////////////////////////
loginN1(usuario, clave) {
  let data = [usuario, clave]
  return this.database.executeSql('SELECT * from usuarioLog where nombre = ? and clave = ? and id_rol="1"', [data[0], data[1]]).then(res => {
  let items: Usuarios[] = [];
  if (res.rows.length > 0) {
    for (var i = 0; i < res.rows.length; i++) {
      items.push({
        id: res.rows.item(i).id_usuario,
            nombre: res.rows.item(i).nombre,
            contra: res.rows.item(i).clave,
            idr: res.rows.item(i).id_rol
      });
    }
    this.router.navigate(['/perfil'])
  }
  this.listaUsuariosLog.next(items);
  });
}

loginN2(usuario, clave) {
  let data = [usuario, clave]
  return this.database.executeSql('SELECT * from usuarioLog where nombre = ? and clave = ? and id_rol="2"', [data[0], data[1]]).then(res => {
  let items: Usuarios[] = [];
  if (res.rows.length > 0) {
    for (var i = 0; i < res.rows.length; i++) {
      items.push({
        id: res.rows.item(i).id_usuario,
            nombre: res.rows.item(i).nombre,
            contra: res.rows.item(i).clave,
            idr: res.rows.item(i).id_rol
      });
    }
    this.router.navigate(['/perfil'])
  }
  this.listaUsuariosLog.next(items);
  });
}



  editarPerfil(usuario,nombre,apellidos, correo, rut){
    let data = [nombre, apellidos, correo, rut, usuario];
    return this.database.executeSql('UPDATE Usuario set nombre = ?, apellidos = ?, correo = ?, rut = ? WHERE usuario = ?', data)
      .then(data2 => {
        this.listarUser();
      })


  }
  editarPass(usuario,clave){
    let data3 = [clave,  usuario];
    return this.database.executeSql('UPDATE Usuario set clave = ? WHERE usuario = ?', data3)
      .then(data2 => {
        this.listarUser();
      })


  }
  editarFoto(usuario, foto){
    let data5 = [foto, usuario]
    return this.database.executeSql('UPDATE Usuario set foto = ? WHERE usuario = ?', data5).then(data2 => {
      this.listarUser();
    })
    
  }

  registrarUsuario(id,nombre,clave,rol) {
    let data = [id, nombre, clave, rol];
    return this.database.executeSql('INSERT or IGNORE INTO Usuario(id_usuario, usuario, clave, id_rol) VALUES (?,?,?,?)', data).then(data2 => {
      this.listarUser();
      // this.presentAlert("Datos del JSON leidos correctamente", "JSON INSERTADO");
     
    })
  }


  


}
