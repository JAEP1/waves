import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  
  dateAsistente: String = new Date().toLocaleString();
  // theDate = new Date((new Date()).valueOf() + 1000*3600*24);
  theDate = new Date((new Date()).valueOf() + 1000*120);
  
  date2 = new Date((new Date()).valueOf() + 1000*120).toString()
  ramo :string;
  qrCodeString :any;
  profe : string;
  seccion : string;
 
  
 
  
  constructor(private router: Router,private active: ActivatedRoute) { 
    this.active.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.ramo = this.router.getCurrentNavigation().extras.state.ramo1;
        this.profe = this.router.getCurrentNavigation().extras.state.profe1;
        this.seccion = this.router.getCurrentNavigation().extras.state.seccion1;
      }
    })
  }

  ngOnInit() {
    this.qrCodeString = this.ramo +"||" + this.date2 +"||" + this.profe + "||" + this.seccion ;
  
  }
  

}
