const { TipoDato } = require("../Expresion");
const { Instruccion, TipoInstr } = require("../Instruccion");
const Entorno = require("../entorno/Entorno");
const NodoAst = require('../simbolo/NodoAst');
const errores = require('../../analizador/utilidad/Errores.js');
const Aritmetica = require("../Expresion/Aritmetica.js");


class Swich extends Instruccion {
    constructor(expresion, casos, fila, columna, id = false) {
        super(TipoInstr.SWITCH, fila, columna);
        this.expresion = expresion;
        this.casos = casos;
        this.id = id;
    }

    interpretar(entorno) {
        let entornoSwich = new Entorno(TipoInstr.SWITCH, entorno);
        let ejecutarDefault = true;
        let ejecutadoCase = false;

        this.expresion.interpretar(entornoSwich);
        let valor = this.expresion.valor;

        let continuarEjecutando = false;
        // console.log(valor);
        // console.log(this.casos);
        // console.log("Inicio la prueba");
        for (let i = 0; i < this.casos.length; i++) {
            let caso = this.casos[i];
            console.log(caso);
            // console.log("Termino la prueba");
            let valorCaso = caso[0] ? caso[0].valor : null;
            if (caso[0] instanceof Aritmetica) {
                caso[0].interpretar(entornoSwich);
                valorCaso = caso[0].valor;

            }

            if (continuarEjecutando || valor == valorCaso) {
                ejecutadoCase = true;
                caso[1].forEach(instruccion => {
                    instruccion.interpretar(entornoSwich);
                });

                if (caso[1].some(instruccion => instruccion.tipo === TipoInstr.BREAK)) {
                    ejecutarDefault = false;
                    global.break = true;
                    return this;
                } else if (caso[1].some(instruccion => instruccion.tipo === TipoInstr.CONTINUE)) {
                    if (entornoSwich.anterior.nombre == "FOR" | entornoSwich.anterior.nombre == "FOR" | entornoSwich.anterior.anterior.nombre == "FOR") {

                        global.ciclo = true;
                    } if (global.ciclo == false) {
                        console.log("Error Semántico: continue fuera de ciclo");
                        errores.crearError("Error Semántico: ", "Continue fuera de ciclo en Switch", this.fila, this.columna);
                        return this;
                    }

                } else if (caso[1].some(instruccion => instruccion.tipo === TipoInstr.RETURN)) {
                    this.tipo = TipoInstr.RETURN;
                    return this;
                } else {
                    continuarEjecutando = true;
                }
            }
        }


        if (ejecutarDefault && !ejecutadoCase) {
            for (let i = 0; i < this.casos.length; i++) {
                let caso = this.casos[i];
                if (!caso[0]) {
                    caso[1].forEach(instruccion => {
                        instruccion.interpretar(entornoSwich);
                    });

                    if (caso[1].some(instruccion => instruccion.tipo === TipoInstr.BREAK)) {
                        global.break = true;
                        return this;
                    } else if (caso[1].some(instruccion => instruccion.tipo === TipoInstr.CONTINUE)) {
                        if (entornoSwich.anterior.nombre == "FOR" | entornoSwich.anterior.anterior.nombre == "FOR") {
                            global.ciclo = true;
                        }
                        if (global.ciclo == false) {
                            console.log("Error Semántico: continue fuera de ciclo");
                            errores.crearError("Error Semántico: ", "Continue fuera de ciclo en Switch", this.fila, this.columna);
                            return this;
                        }
                    }
                    else if (caso[1].some(instruccion => instruccion.tipo === TipoInstr.RETURN)) {
                        this.tipo = TipoInstr.RETURN;
                        return this;
                    }



                    break;
                }
            }
        }

        return this;
    }

    getNodo() {


        try {
            let nodo = new NodoAst('SWITCH');
            nodo.agregarHijo('switch');
            nodo.agregarHijo('(');
            nodo.agregarHijoAST(this.expresion.getNodo());
            nodo.agregarHijo(')');
            nodo.agregarHijo('{');

            for (let caso of this.casos) {
                let nodoCase = new NodoAst('CASE');
                if (caso[0]) {
                    nodoCase.agregarHijo('case');
                    nodoCase.agregarHijoAST(caso[0].getNodo());
                    nodoCase.agregarHijo(':');
                } else {
                    nodoCase.agregarHijo('default');
                    nodoCase.agregarHijo(':');
                }
                if (caso[1].valor == "") {
                    nodoCase.agregarHijo('');
                } else {
                    for (let instruccion of caso[1]) {
                        nodoCase.agregarHijoAST(instruccion.getNodo());
                    }
                }


                nodo.agregarHijoAST(nodoCase);
            }


            nodo.agregarHijo('}');

            return nodo;

        }



        catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('SWITCH');
            nodo.agregarHijo("ERROR")
            return nodo;
        }


    }


}
module.exports = Swich;
