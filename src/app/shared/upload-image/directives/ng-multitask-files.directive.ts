import { Directive, Input, Output,EventEmitter, HostListener } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { ImageValidator } from '../helpers/ImageValidator';
import { StorageService } from '../storage.service';
import {InfoCompartidaService} from 'src//app/servicios/info-compartida.service';
@Directive({
  selector: '[appNgMultitaskFiles]'
})
export class NgMultitaskFilesDirective extends ImageValidator{


  @Input()files:FileItem[]=[];
  @Output()mouseOver:EventEmitter<boolean>=new EventEmitter();
  

  @HostListener('dragover',['$event'])
  onDragEnter(event:any){
    this.preventAndStop(event);
    this.mouseOver.emit(true);
  }
  @HostListener('dragleave',['$event'])
  onDragLeave(){
    this.mouseOver.emit(false);
  }
  @HostListener('drop',['$event'])
  onDrop(event:any){
    const dataTransfer=this.getDataTransfer(event);
    
    if(!dataTransfer){
      return;
    }
    this.preventAndStop(event);
    this.extractFiles(dataTransfer.files);
    this.mouseOver.emit(false);
  }

  



  private getDataTransfer(event:any){
    return event.dataTransfer
    ?event.dataTransfer
    :event.originalEvent.dataTransfer;
  }

private extractFiles(fileList:FileList):void{
  let auxList=[];
  let divPreview=document.getElementById('preview');
  for(let i=0;i<fileList.length;i++){
    const temporaleFile=fileList[i];
    if(this.canBeUploaded(temporaleFile)){
      if(auxList.length<3 && divPreview.childElementCount<3){//verifico que no se pasen de 3 fotos. osea solo selecciono las 3 primeras
          auxList.push(obtenerSrcDeImagen(fileList[i],divPreview) );
          InfoCompartidaService.hayImagenesSeleccionadas(true);
          const newFile= new FileItem(temporaleFile);
          this.files.push(newFile);
        }
        else{
          alert("Solo 3 fotos como maximo no insista, usa bien mi software!");
          break;
        }
    }else{
      alert("No se admite este tipo de archivo");
    }
  }
  
  StorageService.imagenesDropeadas=auxList;
  StorageService.filesDropped=this.files;

}



  private  canBeUploaded(file:File):boolean{
    if(!this.checkDropped(file.name,this.files) && 
    this.validateType(file.type)  
    ){
      return true;
    }else{
      return false;
    }
  }
  private preventAndStop(event:any):void{
    event.preventDefault();
    event.stopPropagation();
  }

}
async function obtenerSrcDeImagen(file:any,preview:any )  {
    let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = await function(){
      let       image = document.createElement('img');
  
      image.src = reader.result as string;
      preview.appendChild(image);
      image.width=100;
  
    };
  
  return reader.result as string;
}