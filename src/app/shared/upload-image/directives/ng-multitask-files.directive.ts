import { Directive, Input, Output,EventEmitter, HostListener } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { ImageValidator } from '../helpers/ImageValidator';

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
  for(let i=0;i<fileList.length;i++){
    const temporaleFile=fileList[i];
    if(this.canBeUploaded(temporaleFile)){

      console.log(i);
        obtenerPathImagen(fileList[i]);

      const newFile= new FileItem(temporaleFile);
      this.files.push(newFile);
    }
  }
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
async function obtenerPathImagen(file:any) {
    let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = await function(){
      let preview = document.getElementById('preview'),
              image = document.createElement('img');
  
      image.src = reader.result as string;
      preview.appendChild(image);
      image.width=100;
  
    };
  
  
}