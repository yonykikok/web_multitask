export class Usuario {
    nombre;
    apellido;
    dni;
    correo;
    tipo;
    foto;

    constructor(nombre,
        apellido,
        dni,
        correo,
        tipo,
        foto) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.correo = correo;
        this.tipo = tipo;
        this.foto = foto;
    }

    toString() {
        return "---Apellido " + this.apellido +
            "---Nombre " + this.nombre +
            "---DNI " + this.dni +
            "---Correo " + this.correo +
            "---Tipo " + this.tipo +
            "---foto: " + this.foto;
    }

}
