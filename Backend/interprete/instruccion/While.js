const { Instruccion, TipoInstr } = require("../Instruccion");
const Entorno = require("../entorno/Entorno");
const NodoAst = require('../simbolo/NodoAst');
const errores = require('../../analizador/utilidad/Errores.js');
const { TipoDato } = require("../Expresion");

class While extends Instruccion {
    constructor(expresion, instrucciones, fila, columna) {
        super(TipoInstr.WHILE, fila, columna);
        this.expresion = expresion;
        this.instrucciones = instrucciones;
    }

    interpretar(entorno) {
        let entornoWhile = new Entorno(TipoInstr.WHILE, entorno);
        global.ciclo = true;

        while (this.expresion.interpretar(entorno).valor) {
            let duranteWhile = new Entorno(TipoInstr.WHILE, entornoWhile);

            if (this.expresion.tipo != TipoDato.BOOLEAN) {
                console.log("Error Semántico: la condición del while debe ser de tipo boolean");
                errores.crearError("Error Semántico: ", "La condición del while debe ser tipo boolean", this.fila, this.columna);
                return this;
            }

            for (let i = 0; i < this.instrucciones.length; i++) {
                const instruccion = this.instrucciones[i];

                let resultado = instruccion.interpretar(duranteWhile);

                if (instruccion.tipo == TipoInstr.BREAK || global.break == true) {
                    this.tipo = TipoInstr.BREAK;
                    global.break = false;
                    return this;
                } else if (instruccion.tipo == TipoInstr.CONTINUE || global.continue == true) {
                    this.tipo = TipoInstr.CONTINUE;
                    global.continue = false;
                    break;  // Rompe el ciclo for y pasa a la siguiente iteración del while
                } else if (instruccion.tipo == TipoInstr.RETURN) {
                    global.retorno = false;
                    this.tipo = TipoInstr.RETURN;
                    return this;
                }
            }
        }

        return this;
    }
    getNodo() {


        try {
            let nodo = new NodoAst('WHILE');

            nodo.agregarHijo('while');
            nodo.agregarHijo('(');
            nodo.agregarHijoAST(this.expresion.getNodo());
            nodo.agregarHijo(')');
            nodo.agregarHijo('{');
            for (let instruccion of this.instrucciones) {
                nodo.agregarHijoAST(instruccion.getNodo());
            }


            nodo.agregarHijo('}');

            return nodo;
        } catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('WHILE');
            nodo.agregarHijo("ERROR")
            return nodo;
        }


    }
}

module.exports = While;
