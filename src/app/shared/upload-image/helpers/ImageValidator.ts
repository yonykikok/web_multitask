import { FileItem } from "../../models/file-item";

export class ImageValidator{
    private acceptype=['image/jpeg','image/png'];
    validateType(fileType:string):boolean{
        return  fileType === ''|| fileType === undefined
        ?false
        :this.acceptype.includes(fileType);
    }

    checkDropped(fileName:string,files:FileItem[]):boolean{
        for(const file of files){
            if(file.name===fileName)
            {
                return true;
            }
        }
        return false;
    }
}