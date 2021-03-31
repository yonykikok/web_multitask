import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileItem } from '../models/file-item';
import { finalize} from 'rxjs/operators';
import { AuthService } from 'src/app/servicios/auth.service';
@Injectable()
export class StorageService {
private MEDIA_STORAGE_PATH='multitask'
  constructor(private readonly storage:AngularFireStorage,private authService: AuthService) { 

  }

  private generateFileName(name:string):string{
    return `${'publicaciones/'+this.authService.user.dni+'/'}/${new Date().getTime()}_${name}`
  }

  uploadImage(images:FileItem[]){
    for(const item of images){
      item.uploading=true;
      const filePath=this.generateFileName(item.name);
      const fileRef=this.storage.ref(filePath);
      const task=this.storage.upload(filePath,item.file);

      item.uploadPercent=task.percentageChanges();
      task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          item.downloadURL=fileRef.getDownloadURL();
          item.uploading=false;
      })
      ).subscribe();
    }
  }


}
