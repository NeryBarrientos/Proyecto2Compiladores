const {Expresion} = require("../Expresion.js")
const errores = require("../../analizador/utilidad/Errores.js");

class Dato extends Expresion {
    constructor(valor, tipo,fila, columna){
        super(valor, tipo, fila, columna);
        this.valorOriginal = valor;
    }

    interpretar(entorno){
        
        return this;
    }


  
}


module.exports = Dato;