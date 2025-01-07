const { Instruccion, TipoInstr } = require("../Instruccion");
const NodoAst = require('../simbolo/NodoAst');
const errores = require('../../analizador/utilidad/Errores.js');

class Asignacion extends Instruccion {
    constructor(id, expresion, fila, columna, indice = null, indice2 = null) {
        super(TipoInstr.ASIGNACION, fila, columna);
        this.id = id;
        this.expresion = expresion;
        this.indice = indice;
        this.indice2 = indice2;

    }

    interpretar(entorno) {

        let simbolo = entorno.getSimbolo(this.id);
        console.log("------------------------------------");
        console.log(simbolo);
        console.log("------------------------------------");

        let entornoActual = entorno;
        while (entornoActual && !simbolo) {
            entornoActual = entornoActual.anterior;
            if (entornoActual) {
                simbolo = entornoActual.getSimbolo(this.id);
            }
        }
        if (this.indice == null) {
            if (simbolo) {
                let valor = this.expresion.interpretar(entorno);
                if (simbolo.tipo == valor.tipo) {
                    simbolo.valor = valor;
                    // Verificar si el this.modificable es true
                    if (simbolo.modificable == false) {
                        console.log("Error semántico: variable " + this.id + " no es modificable");
                        errores.crearError("Error Semántico: ", "variable " + this.id + " no es modificable", this.fila, this.columna);
                        return this;
                    }
                    entorno.modificarSimbolo(this.id, simbolo.valor);
                } else {
                    console.log("Error semántico: variable " + this.id + " no es de tipo " + valor.tipo);
                    errores.crearError("Error Semántico: ", "Variable " + this.id + " no es de tipo", this.fila, this.columna);
                }
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
                        errores.crearError("Error Semántico: ", "índice fuera de rango en " + this.id, this.fila, this.columna);
                        return this;
                    } else {
                        let valor = this.expresion.interpretar(entorno);
                        if (simbolo.tipo == valor.tipo) {
                            let indice = this.indice.interpretar(entorno);
                            simbolo.valor[indice.valor] = valor.valor;


                            // Verificar si el this.modificable es true
                            if (simbolo.modificable == false) {
                                console.log("Error semántico: variable " + this.id + " no es modificable");
                                errores.crearError("Error Semántico: ", "variable " + this.id + " no es modificable", this.fila, this.columna);
                                return this;
                            }
                            entorno.modificarSimbolo(this.id, simbolo.valor);

                        } else {
                            console.log("Error semántico: variable " + this.id + " no es de tipo " + valor.tipo);
                            errores.crearError("Error Semántico: ", "variable " + this.id + " no es de tipo " + valor.tipo, this.fila, this.columna);
                        }










                    }

                } else {
                    console.log("Error semántico: variable " + this.id + " no declarada");
                    errores.crearError("Error Semántico: ", "variable " + this.id + " no declarada", this.fila, this.columna);
                }

            } else {
                //2d
                if (simbolo) {
                    if (simbolo.valor[0].length - 1 < this.indice.interpretar(entorno).valor | simbolo.valor[1].length - 1 < this.indice2.interpretar(entorno).valor) {
                        console.log("Error semántico: índice fuera de rango");
                        errores.crearError("Error Semántico: ", "índice fuera de rango en" + this.id, this.fila, this.columna);
                        return this;
                    } else {


                        let valor = this.expresion.interpretar(entorno);
                        console.log("------------------------------------");
                        console.log(valor.tipo);
                        console.log("------------------------------------");
                        if (simbolo.tipo == valor.tipo) {
                            let indice = this.indice.interpretar(entorno);
                            let indice2 = this.indice2.interpretar(entorno);


                            simbolo.valor[indice.valor][indice2.valor] = valor.valor;


                            // Verificar si el this.modificable es true
                            if (simbolo.modificable == false) {
                                console.log("Error semántico: variable " + this.id + " no es modificable");
                                errores.crearError("Error Semántico: ", "variable " + this.id + " no es modificable", this.fila, this.columna);
                                return this;
                            }
                            entorno.modificarSimbolo(this.id, simbolo.valor);

                        } else {
                            console.log("Error semántico: variable " + this.id + " no es de tipo " + valor.tipo);
                            errores.crearError("Error Semántico: ", "variable " + this.id + " no es de tipo " + valor.tipo, this.fila, this.columna);
                        }






                    }









                } else {
                    console.log("Error semántico: variable " + this.id + " no declarada");
                    errores.crearError("Error Semántico: ", "variable " + this.id + " no declarada" + valor.tipo, this.fila, this.columna);
                }
            }


            return this;
        }

























    }


    getNodo() {
        try {
            let nodo = new NodoAst('ASIGNACION');
            nodo.agregarHijo(this.id);
            nodo.agregarHijo("=");
            nodo.agregarHijoAST(this.expresion.getNodo());
            nodo.agregarHijo(";");
            return nodo;
        }



        catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('ASIGNACION');
            nodo.agregarHijo("ERROR")
            return nodo;
        }
    }




}
module.exports = Asignacion;