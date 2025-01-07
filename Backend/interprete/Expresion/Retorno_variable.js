const { Expresion, TipoDato } = require("../Expresion");
const { TipoInstr } = require("../Instruccion");
const NodoAst = require('../simbolo/NodoAst');
const errores = require("../../analizador/utilidad/Errores.js");

class Retorno_variable extends Expresion {
    constructor(id, fila, columna, indice = null, indice2 = null, final = "") {
        super("ERROR", TipoDato.ERROR, fila, columna);
        this.id = id;
        this.indice = indice;
        this.indice2 = indice2;
        this.final = final;

    }

    interpretar(entorno) {

        this.entorno = entorno;


        let simbolo = entorno.getSimbolo(this.id);


        let entornoActual = entorno;
        while (entornoActual && !simbolo) {
            entornoActual = entornoActual.anterior;
            if (entornoActual) {
                simbolo = entornoActual.getSimbolo(this.id);
            }
        }



        if (this.indice == null) {
            if (simbolo) {

                this.tipo = simbolo.tipo;
                this.valor = simbolo.valor.valor;
                this.final = this.valor;
                return this;

            } else {
                console.log("Error semántico: variable " + this.id + " no declarada");
                errores.crearError("Error Semántico: ", "Variable " + this.id + " no declarada", this.fila, this.columna);
            }
            return this;
        } else {
            if (this.indice2 == null) {
                if (simbolo) {
                    if (simbolo.valor.length - 1 < this.indice.interpretar(entorno).valor) {
                        console.log("Error semántico: índice fuera de rango");
                        errores.crearError("Error Semántico: ", "Indice fuera de rango en retorno variable " + this.id, this.fila, this.columna);
                        return this;
                    } else {


                        let indice = this.indice.interpretar(entorno);
                        this.tipo = simbolo.tipo;

                        this.valor = simbolo.valor[indice.valor];
                        this.final = this.valor;



                        return this;





                    }

                } else {
                    console.log("Error semántico: variable " + this.id + " no declarada");
                    errores.crearError("Error Semántico: ", "Variable " + this.id + " no declarada ", this.fila, this.columna);
                }

            } else {
                //2d
                if (simbolo) {
                    if (simbolo.valor[0].length - 1 < this.indice.interpretar(entorno).valor | simbolo.valor[1].length - 1 < this.indice2.interpretar(entorno).valor) {
                        console.log("Error semántico: índice fuera de rango");
                        errores.crearError("Error Semántico: ", "índice fuera de rango en retorno variable " + this.id, this.fila, this.columna);
                        return this;
                    } else {

                        let indice = this.indice.interpretar(entorno);
                        let indice2 = this.indice2.interpretar(entorno);

                        this.tipo = simbolo.tipo;

                        this.valor = simbolo.valor[indice.valor][indice2.valor];
                        this.final = this.valor;
                        return this;

                    }









                } else {
                    console.log("Error semántico: variable " + this.id + " no declarada");
                    errores.crearError("Error Semántico: ", "Variable " + this.id + " no declarada", this.fila, this.columna);
                }
            }


            return this;
        }


    }


    getNodo() {
        try {
            let nodo = new NodoAst('ID');
            nodo.agregarHijo("Retorno variable:  " + this.id + " =");
            nodo.agregarHijo(this.final.toString());
            return nodo;
        } catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('ID');
            nodo.agregarHijo("ERROR")
            return nodo;

        }

    }


}



module.exports = Retorno_variable;
