const { Instruccion, TipoInstr } = require("../Instruccion");
const NodoAst = require('../simbolo/NodoAst');
const errores = require('../../analizador/utilidad/Errores.js');

class Incremento_Decremento extends Instruccion {
    constructor(id, tipo, fila, columna) {
        super(TipoInstr.INCREMENTO_DECREMENTO, fila, columna);
        this.id = id;
        this.tipo = tipo;
        this.entorno = null;
    }

    interpretar(entorno) {
        this.entorno = entorno;
        let simbolo = entorno.getSimbolo(this.id);
        console.log(simbolo);

        if (simbolo) {
            if (simbolo.tipo == "INT" || simbolo.tipo == "DOUBLE") {

                if (this.tipo == "++") {

                    simbolo.valor.valor = Number(simbolo.valor.valor) + 1;
                } else {
                    simbolo.valor.valor = Number(simbolo.valor.valor) - 1;
                }


                entorno.modificarSimbolo(this.id, simbolo.valor);
            } else {
                console.log("Error semántico: variable " + this.id + " no es de tipo numérico");
                errores.crearError("Error Semántico: ", "variable " + this.id + " no es de tipo numérico", this.fila, this.columna);

                return this;
            }
        } else {
            console.log("Error semántico: variable " + this.id + " no declarada");
            errores.crearError("Error Semántico: ", "variable " + this.id + " no declarada", this.fila, this.columna);
            return this;
        }
    }

    getNodo() {

        try {
            let simbolo = this.entorno.getSimbolo(this.id);
            let nodo = new NodoAst('INCREMENTO_DECREMENTO');
            nodo.agregarHijo(this.id);
            nodo.agregarHijoAST(simbolo.valor.getNodo());
            nodo.agregarHijo(this.tipo);
            nodo.agregarHijo(';');
            return nodo;
        }



        catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('INCREMENTO_DECREMENTO');
            nodo.agregarHijo("ERROR")
            return nodo;
        }
    }


}
module.exports = Incremento_Decremento;