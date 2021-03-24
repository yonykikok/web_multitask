export class Usuario {
    nombreUsuario;   
    apellidoUsuario;   
    DNIUsuario;  
    correoUsuario;   
    tipoUsuario;  
    fotoUsuario;

    constructor( nombreUsuario,   
        apellidoUsuario,   
        DNIUsuario,  
        correoUsuario,   
        tipoUsuario,  
        fotoUsuario){
            this.nombreUsuario=nombreUsuario;
            this.apellidoUsuario=apellidoUsuario;
            this.DNIUsuario=DNIUsuario;
            this.correoUsuario=correoUsuario;
            this.tipoUsuario=tipoUsuario;
            this.fotoUsuario=fotoUsuario;
    }
  
}
