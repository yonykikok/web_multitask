import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/shared/models/file-item';
import { StorageService } from 'src/app/shared/upload-image/storage.service';
@Component({
  selector: 'app-subir-imagenes-component',
  templateUrl: './subir-imagenes-component.component.html',
  styleUrls: ['./subir-imagenes-component.component.css']
})
export class SubirImagenesComponentComponent implements OnInit {

  files:FileItem[]=[];
  isOverDrop=false;

  constructor(private readonly storageService:StorageService) { }



  onUpload():void{
    console.log(this.files);
    
    // this.storageService.uploadImage(this.files);
  }
  ngOnInit(): void {
  }

}
