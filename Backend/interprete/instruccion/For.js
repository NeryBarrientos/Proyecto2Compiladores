const { TipoDato } = require("../Expresion");
const { Instruccion, TipoInstr } = require("../Instruccion");
const Entorno = require("../entorno/Entorno");
const { TipoSimbolo } = require("../Entorno/Simbolo");
const NodoAst = require('../simbolo/NodoAst');
const errores = require('../../analizador/utilidad/Errores.js');

class For extends Instruccion {
    constructor(declaracion, condicion, incremento, instrucciones, fila, columna) {
        super(TipoInstr.FOR, fila, columna);
        this.declaracion = declaracion;
        this.condicion = condicion;
        this.incremento = incremento;
        this.instrucciones = instrucciones;
    }

    interpretar(entorno) {
        global.ciclo = true;
        let entornoValidacionFor = new Entorno(TipoInstr.VALIDACIONFOR, entorno);
        let entornoFor = new Entorno(TipoInstr.FOR, entornoValidacionFor);


        this.declaracion.interpretar(entornoValidacionFor);

        while (this.condicion.interpretar(entornoValidacionFor).valor) {

            for (let instruccion of this.instrucciones) {

                console.log(instruccion);

                if (instruccion.tipo == TipoInstr.FOR) {
                    // console.log('entro a for, while, do until: ' );
                    console.log(instruccion.declaracion.expresion.valor);
                    instruccion.declaracion.expresion.valor = instruccion.declaracion.expresion.valorOriginal;
                } else if (instruccion.tipo == TipoInstr.DO_UNTIL) {
                    //relacional con variable o true

                }

                instruccion.interpretar(entornoFor);

                if (global.break == true | instruccion.tipo === TipoInstr.BREAK) {
                    //console.log("Break detectado. Saliendo del ciclo for");
                    global.break = false;
                    global.ciclo = false;
                    return this;
                } else if (global.continue == true | instruccion.tipo === TipoInstr.CONTINUE) {
                    //console.log("Continue detectado. Saltando a la siguiente iteración del ciclo for");
                    global.continue = false;
                    global.ciclo = false;
                    break;
                } else if (global.retorno == true | instruccion.tipo === TipoInstr.RETURN) {
                    global.retorno = false;
                    global.ciclo = false;
                    return this;
                } else if (global.retornoval == true) {
                    global.retornoval = false;
                    global.ciclo = false;

                    return this;
                }
            }
            this.incremento.interpretar(entornoValidacionFor);
        }

        global.ciclo = false;
        return this;
    }

    getNodo() {

        try {
            let nodo = new NodoAst('FOR');
            nodo.agregarHijo('for');
            nodo.agregarHijo('(');
            nodo.agregarHijoAST(this.declaracion.getNodo());
            nodo.agregarHijoAST(this.condicion.getNodo());
            nodo.agregarHijo(';');
            nodo.agregarHijoAST(this.incremento.getNodo());
            nodo.agregarHijo(')');
            nodo.agregarHijo('{');
            for (let instruccion of this.instrucciones) {
                nodo.agregarHijoAST(instruccion.getNodo());
            }


            nodo.agregarHijo('}');

            return nodo;
        }



        catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('FOR');
            nodo.agregarHijo("ERROR")
            return nodo;
        }

    }
}

module.exports = For;
