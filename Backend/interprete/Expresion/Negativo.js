const { Expresion, TipoDato } = require("../Expresion");
const NodoAst = require('../simbolo/NodoAst');
const errores = require("../../analizador/utilidad/Errores.js");

class Negativo extends Expresion{
    
    constructor(expresion, fila, columna){
        super("ERROR", TipoDato.ERROR, fila, columna);
        this.expresion = expresion;
    }

    interpretar(entorno){

        this.expresion.interpretar(entorno);

        if(this.expresion.tipo === TipoDato.INT){
            this.tipo = TipoDato.INT;
            this.valor = -1 * this.expresion.valor;
            return this;
        }
        else if (this.expresion.tipo === TipoDato.DOUBLE){
            this.tipo = TipoDato.DOUBLE;
            this.valor = -1 * this.expresion.valor;
            this.valor = this.valor.toFixed(1);
            return this;
        }

        console.log("Error Semántico: Error en la operacion negativo.")
        errores.crearError("Error Semántico: ","Error en la operacion negativo.",this.fila,this.columna);
        return this;
    }

    getNodo() {
        try{
            let nodo = new NodoAst('EXPRESION');
            nodo.agregarHijo('-');
            nodo.agregarHijoAST(this.expresion.getNodo());
        
            return nodo;
        }


        catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('EXPRESION');
            nodo.agregarHijo("ERROR")
            return nodo;
    }
    }
    

}

module.exports = Negativo;