const { Instruccion, TipoInstr } = require("../Instruccion");
const Entorno = require("../entorno/Entorno");
const NodoAst = require('../simbolo/NodoAst');
const errores = require('../../analizador/utilidad/Errores.js');

class Do_Until extends Instruccion {
    constructor(instrucciones, expresion, fila, columna) {
        super(TipoInstr.DO_UNTIL, fila, columna);
        this.instrucciones = instrucciones;
        this.expresion = expresion;

    }

    interpretar(entorno) {
        let entornoDoUntil = new Entorno(TipoInstr.DO_UNTIL, entorno);

        do {
            for (let i = 0; i < this.instrucciones.length; i++) {
                const instruccion = this.instrucciones[i];
                instruccion.interpretar(entornoDoUntil);

                if (instruccion.tipo == TipoInstr.BREAK || global.break == true) {
                    global.break = false;
                    this.expresion = TipoInstr.BREAK;
                    return this;
                } else if (instruccion.tipo == TipoInstr.RETURN) {
                    global.retorno = false;
                    this.tipo = TipoInstr.RETURN;
                    return this;
                } else if (instruccion.tipo == TipoInstr.CONTINUE) {
                    global.continue = false;
                    this.tipo = TipoInstr.CONTINUE;
                    break;
                }
            }
        } while (!this.expresion.interpretar(entorno).valor);
    }


    getNodo() {
        try {
            let nodo = new NodoAst('DO_UNTIL');

            nodo.agregarHijo('do');
            nodo.agregarHijo('{');
            for (let instruccion of this.instrucciones) {
                nodo.agregarHijoAST(instruccion.getNodo());
            }
            nodo.agregarHijo('}');
            nodo.agregarHijo('while');
            nodo.agregarHijo('(');
            nodo.agregarHijoAST(this.expresion.getNodo());
            nodo.agregarHijo(')');
            nodo.agregarHijo(';');

            return nodo;
        }



        catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('DO_UNTIL');
            nodo.agregarHijo("ERROR")
            return nodo;
        }

    }
}

module.exports = Do_Until;
