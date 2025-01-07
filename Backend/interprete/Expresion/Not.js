const { Expresion, TipoDato } = require("../Expresion");
const NodoAst = require('../simbolo/NodoAst');
const errores = require("../../analizador/utilidad/Errores.js");

class Not extends Expresion{
    
    constructor(expresion, fila, columna){
        super("ERROR", TipoDato.ERROR, fila, columna);
        this.expresion = expresion;
    }

    interpretar(entorno){

        this.expresion.interpretar(entorno);
        // console.log("a");
        // console.log(this.expresion.tipo);
        if(this.expresion.tipo === TipoDato.BOOLEAN){
            // console.log("b");
            this.tipo = TipoDato.BOOLEAN;
            if (this.expresion.valor == true) {
                this.valor = false;
                return this;
            } else if (this.expresion.valor == false){
                this.valor = true;
                return this;
            }else{
                console.log("Error Semántico: Error en la operacion NOT.")
                errores.crearError("Error Semántico: ","Error en la operacion NOT.",this.fila,this.columna);
                return this;
            }

        }


    }


    getNodo() {
        try{
            let nodo = new NodoAst('RELACIONAL');
            nodo.agregarHijo('NOT');
            nodo.agregarHijoAST(this.expresion.getNodo());
        
    
            return nodo;
        }


        catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('RELACIONAL');
            nodo.agregarHijo("ERROR")
            return nodo;
    }
    }



}

module.exports = Not;