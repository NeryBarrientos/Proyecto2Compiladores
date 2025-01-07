const { Expresion, TipoDato } = require("../Expresion");
const NodoAst = require('../simbolo/NodoAst');
const errores = require("../../analizador/utilidad/Errores.js");

class length extends Expresion{
        
        constructor(id, fila, columna,d=false,d1=false,final=""){
            super("ERROR", TipoDato.ERROR, fila, columna);
            this.d = d;
            this.id = id;
            this.d1 = d1;
            this.final = final;
        }
    
        interpretar(entorno){

            if(this.id.tipo == TipoDato.CADENA){
                this.id.interpretar(entorno);
                this.tipo = TipoDato.INT;
                this.valor = this.id.valor.length;
                this.final = this.valor;
                return this;
            }else if(Array.isArray(this.id) && this.d == false && this.d1 == false){
                this.tipo = TipoDato.INT;
                this.valor = this.id.length;
                this.final = this.valor;
                return this;
            
            }else if(Array.isArray(this.id) && this.d == true){
                this.tipo = TipoDato.INT;
                this.valor = this.id.length;
                this.final = this.valor;
                return this;

            }else if(Array.isArray(this.id) && this.d == true && this.d1 == true){
                this.tipo = TipoDato.INT;
                this.valor = this.id.length;
                this.final = this.valor;
                return this;
            


            }else{

                let simbolo = entorno.getSimbolo(this.id);

            let entornoActual = entorno;
            while (entornoActual && !simbolo) {
                entornoActual = entornoActual.anterior;
                if (entornoActual) {
                    simbolo = entornoActual.getSimbolo(this.id);
                }
            }
         

            if(simbolo){
                if(simbolo.valor instanceof Array){
                    this.tipo = TipoDato.INT;
                    this.valor = simbolo.valor.length;
                    this.final=this.valor;
                    return this;
                }else{
                    this.tipo = TipoDato.INT;
                    this.valor = simbolo.valor.valor.length;
                    this.final=this.valor;
                    return this;
                }

            }
            console.log("Error Semántico: Variable " + this.id + " no declarada.");
            errores.crearError("Error Semántico: ","Variable " + this.id + " no declarada.",this.fila,this.columna);
            return this;

            }
            

        }

        getNodo(){
            try{
                let nodo = new NodoAst("LENGTH");
                nodo.agregarHijo(this.id)
                nodo.agregarHijo(".")
                nodo.agregarHijo("LENGTH")
                nodo.agregarHijo("(")
                nodo.agregarHijo(") ")
                nodo.agregarHijo("; ")
                nodo.agregarHijo("= ")
                nodo.agregarHijo(this.final.toString())
                
                return nodo;
            }


            catch (error) {
                console.error('Error al generar el nodo:');
                let nodo = new NodoAst('LENGTH');
                nodo.agregarHijo("ERROR")
                return nodo;
        }
        }
    
    }
    module.exports = length;    