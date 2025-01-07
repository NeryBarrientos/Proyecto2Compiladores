const { TipoDato } = require("../Expresion");
const { Instruccion, TipoInstr } = require("../Instruccion");
const Entorno = require("../entorno/Entorno");
const NodoAst = require('../simbolo/NodoAst');
const errores = require('../../analizador/utilidad/Errores.js');

class If extends Instruccion {
    constructor(condicion, instr_if, instr_else, fila, columna, tiene = false) {
        super(TipoInstr.IF, fila, columna);
        this.condicion = condicion;
        this.instr_if = instr_if;
        this.instr_else = instr_else;
        this.tiene = tiene;
    }

    interpretar(entorno) {
        let entornoIf = new Entorno(TipoInstr.IF, entorno);
        this.condicion.interpretar(entornoIf);



        if (this.condicion.tipo != TipoDato.BOOLEAN) {
            console.log("Error Semántico: la condicion del if debe ser tipo boolean");
            errores.crearError("Error Semántico: ", "la condicion del if debe ser tipo boolean", this.fila, this.columna);
            return this;
        }
        if (String(this.condicion.valor).toLowerCase() === "true") {
            console.log("entro al if");
            console.log(this.condicion.valor);

            for (let instruccion of this.instr_if) {
                // console.log(instruccion.interpretar(entornoIf));
                instruccion.interpretar(entornoIf);

                if (instruccion.tipo == TipoInstr.BREAK) {

                    global.break = true;
                    break;
                } else if (instruccion.tipo == TipoInstr.CONTINUE) {
                    if (entornoIf.anterior.nombre == "FOR" || entornoIf.anterior.nombre == "DO_UNTIL") {
                        global.continue = true;
                        global.ciclo = true;
                    }

                    if (global.ciclo == false) {
                        console.log("Error Semántico: continue fuera de ciclo");
                        errores.crearError("Error Semántico: ", "continue fuera de ciclo", this.fila, this.columna);
                        return this;
                    }

                    global.continue = true;
                    break;
                } else if (instruccion.tipo == TipoInstr.RETURN) {

                    global.retorno = true;
                    this.tipo = TipoInstr.RETURN;

                    break;
                } else if (instruccion.tipo == TipoInstr.RETURN) {

                    this.tipo = TipoInstr.RETURN;
                    break;
                }
            }
        } else {
            if (this.instr_else !== null) {
                if (Array.isArray(this.instr_else) && this.tiene == false) {
                    let condicionCumplida = false;
                    for (let i = 0; i < this.instr_else.length; i += 3) {
                        const condicionElseIf = this.instr_else[i];
                        const instruccionesElseIf = this.instr_else[i + 1];
                        condicionElseIf.interpretar(entornoIf);

                        if (condicionElseIf.tipo != TipoDato.BOOLEAN) {
                            console.log("Error Semántico: la condicion del else if debe ser tipo boolean");
                            errores.crearError("Error Semántico: ", "la condicion del else if debe ser tipo boolean", this.fila, this.columna);
                            return this;
                        }

                        if (String(condicionElseIf.valor).toLowerCase() === "true") {
                            condicionCumplida = true;
                            for (let instruccion of instruccionesElseIf) {
                                instruccion.interpretar(entornoIf);
                                if (instruccion.tipo == TipoInstr.BREAK) {

                                    global.break = true;
                                    return this;
                                } else if (instruccion.tipo == TipoInstr.CONTINUE) {
                                    if (entornoIf.anterior.nombre == "FOR" || entornoIf.anterior.nombre == "DO_UNTIL") {
                                        global.continue = true;
                                        global.ciclo = true;
                                    }
                                    if (global.ciclo == false) {
                                        console.log("Error Semántico: continue fuera de ciclo");
                                        errores.crearError("Error Semántico: ", "continue fuera de ciclo", this.fila, this.columna);
                                        return this;
                                    }

                                    global.continue = true;
                                    break;
                                } else if (instruccion.tipo == TipoInstr.RETURN) {
                                    global.retorno = true;
                                    this.tipo = TipoInstr.RETURN;
                                    break;
                                } else if (instruccion.tipo == TipoInstr.RETURN) {
                                    global.retornoval = true;
                                    this.tipo = TipoInstr.RETURN;
                                    break;
                                }
                            }
                            break;
                        }
                    }
                    if (!condicionCumplida && this.instr_else.length > 0) {
                        for (let instruccion of this.instr_else[this.instr_else.length - 1]) {
                            instruccion.interpretar(entornoIf);
                        }
                    }
                } else {
                    for (let instruccion of this.instr_else) {


                        instruccion.interpretar(entornoIf);
                        if (instruccion.tipo == TipoInstr.RETURN) {

                            global.retorno = true;
                            this.tipo = TipoInstr.RETURN;

                            break;
                        } else if (instruccion.tipo == TipoInstr.RETURN) {

                            this.tipo = TipoInstr.RETURN;
                            break;
                        }
                    }
                }
            }
        }

        return this;
    }
    getNodo() {

        try {
            let nodo = new NodoAst('IF');
            nodo.agregarHijo('if');
            nodo.agregarHijo('(');

            nodo.agregarHijoAST(this.condicion.getNodo());

            nodo.agregarHijo(')');
            nodo.agregarHijo('{');

            for (let instruccion of this.instr_if) {
                nodo.agregarHijoAST(instruccion.getNodo());
            }

            nodo.agregarHijo('}');


            if (Array.isArray(this.instr_else) && this.tiene == false) {
                let i = 0;
                while (i < this.instr_else.length) {
                    let nodoElseIf = new NodoAst('ELSE IF');
                    nodoElseIf.agregarHijo('else if');
                    nodoElseIf.agregarHijo('(');

                    nodoElseIf.agregarHijoAST(this.instr_else[i].getNodo());

                    nodoElseIf.agregarHijo(')');
                    nodoElseIf.agregarHijo('{');
                    for (let instruccion of this.instr_else[i + 1]) {
                        nodoElseIf.agregarHijoAST(instruccion.getNodo());
                    }
                    nodoElseIf.agregarHijo('}');
                    nodo.agregarHijoAST(nodoElseIf);
                    i += 3;
                }
            } else {
                if (this.instr_else !== null) {

                    let nodoElse = new NodoAst('ELSE');
                    nodoElse.agregarHijo('else');
                    nodoElse.agregarHijo('{');

                    for (let instruccion of this.instr_else) {
                        nodoElse.agregarHijoAST(instruccion.getNodo());
                    }

                    nodoElse.agregarHijo('}');

                    nodo.agregarHijoAST(nodoElse);

                }
            }

            return nodo;
        }


        catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('IF');
            nodo.agregarHijo("ERROR")
            return nodo;
        }




    }
}









module.exports = If;
