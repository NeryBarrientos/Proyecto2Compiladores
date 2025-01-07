const { Expresion, TipoDato } = require("../Expresion");
const NodoAst = require('../simbolo/NodoAst');
const errores = require("../../analizador/utilidad/Errores.js");

class Is extends Expresion {
    
        constructor(valor, tipo, fila, columna) {
            super("ERROR", TipoDato.ERROR, fila, columna);
            this.valor = valor;
            this.tipo = tipo;
    
        }
    
        interpretar(entorno) {
            this.valor.interpretar(entorno);
            console.log(this.valor.tipo);
            console.log(this.valor.valor);
            console.log(this.tipo);

            if (this.valor.tipo == this.tipo) {
                console.log("Adrian hueco")
                this.tipo = TipoDato.BOOLEAN;
                this.valor = true;
                return this;
            }
            else {
                this.tipo = TipoDato.BOOLEAN;
                this.valor = false;
                // console.log("Error semantico: Error en Is ")
                errores.crearError("Error Semántico: ", "Error tipo de dato en la operacion relacional == ", this.fila, this.columna);
                return this;
            }

        }


        getNodo(){
            try{
                let nodo = new NodoAst('Is');
                nodo.agregarHijo('Is');
                nodo.agregarHijo('(');
                nodo.agregarHijo(this.valor.toString());
                nodo.agregarHijo(')');
                nodo.agregarHijo(';');
            
                return nodo;
            }


            catch (error) {
                console.error('Error al generar el nodo:');
                let nodo = new NodoAst('Is');
                nodo.agregarHijo("ERROR")
                return nodo;
        }
        }


    }
    module.exports = Is;