import { TestBed } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Storage } from '@ionic/storage-angular';

import { DbservicioService } from './dbservicio.service';

describe('DbservicioService', () => {
  let service: DbservicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers :[SQLite,Storage]
    
    });
    service = TestBed.inject(DbservicioService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
});
