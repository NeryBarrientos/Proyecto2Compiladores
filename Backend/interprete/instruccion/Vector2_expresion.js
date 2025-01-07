const { Instruccion, TipoInstr } = require("../Instruccion");
const { TipoSimbolo } = require("../entorno/Simbolo");
const { TipoDato } = require("../Expresion");
const Dato = require('../Expresion/Dato.js');
const NodoAst = require('../simbolo/NodoAst');
const errores = require('../../analizador/utilidad/Errores.js');
const simbolos = require('../../analizador/utilidad/Simbolos.js');

class Vector2_expresion extends Instruccion {
    constructor(tipo1, id, tipo2, expresion1, expresion2, fila, columna,final="") {
        super(TipoInstr.DECLARAR, fila, columna);
        this.tipo1 = tipo1; 
        this.id = id;
        this.tipo2 = tipo2; 
        this.expresion1 = expresion1; 
        this.expresion2 = expresion2;
        this.final=final;
    }

    interpretar(entorno) {
        
        let tamañoDim1 = this.expresion1.interpretar(entorno).valor;
        let tamañoDim2 = this.expresion2.interpretar(entorno).valor;

       
        let matriz = new Array(tamañoDim1);
        for (let i = 0; i < tamañoDim1; i++) {
            matriz[i] = new Array(tamañoDim2);
        }

        
        let valorPredeterminado;
        switch (this.tipo2) {
            case TipoDato.INT:
                valorPredeterminado = 0;
                break;
            case TipoDato.DOUBLE:
                valorPredeterminado = 0.0;
                break;
            case TipoDato.CHAR:
                valorPredeterminado = '\u0000';
                break;
            case TipoDato.BOOLEAN:
                valorPredeterminado = true;
                break;
            case TipoDato.CADENA:
                valorPredeterminado = "";
                break;
            default:
                console.log("Error Semántico: Tipo de dato no reconocido");
                errores.crearError("Error Semántico: ","Tipo de dato no reconocido "+ this.tipo2, this.fila,this.columna);
                return this;
        }

        
        for (let i = 0; i < tamañoDim1; i++) {
            for (let j = 0; j < tamañoDim2; j++) {
                matriz[i][j] = valorPredeterminado;
            }
        }
        this.final = matriz;
        entorno.addSimbolo(this.id, matriz, this.tipo1, TipoSimbolo.VARIABLE, this.fila, this.columna);
        simbolos.crearSimbolo(this.id, "VECTOR 2D", this.tipo1,entorno.nombre,this.fila, this.columna);

        
        return this;
    }

    getNodo() {
        try{
            let nodo = new NodoAst('DECLARAR VECTOR 2D');
  
            nodo.agregarHijo(this.tipo1);
            nodo.agregarHijo(this.id);
            nodo.agregarHijo('[');
            nodo.agregarHijo(']');
            nodo.agregarHijo('[');
            nodo.agregarHijo(']');
            nodo.agregarHijo('=');
            nodo.agregarHijo('NEW');
            nodo.agregarHijo(this.tipo2);
            nodo.agregarHijo('[');
            nodo.agregarHijo(this.final[0].toString());
            nodo.agregarHijo(']');
            nodo.agregarHijo('[');
            nodo.agregarHijo(this.final[1].toString());
            nodo.agregarHijo(']');
            
            nodo.agregarHijo(';');
    
            return nodo;
        }
       


        catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('DECLARAR VECTOR 2D');
            nodo.agregarHijo("ERROR")
            return nodo;
    }




       
    }





}

module.exports = Vector2_expresion;
