/**Representa los subtitulos de un archivo multimedia.
    * @author Joel Alberto Armas Reyes.
    * @since 12/02/2018.
    */
    
    /**Constructor.
     * @param {*} id 
     * @param {*} titulo 
     * @param {*} lenguaje
     * @param {*} rutaFuente 
     */
    function Subtitulo(id, titulo, lenguaje, rutaFuente) {
        this.id = id;
        this.titulo = titulo;
        this.lenguaje=lenguaje;
        this.rutaFuente=rutaFuente;
    }

    /*Setter && Getter */
    Subtitulo.prototype={
        setId: function(id){
            this.id=id;
        }
        ,
        getId: function(){
            return this.id;
        }
        ,
        setTitulo: function(titulo){
            this.titulo=titulo;
        }
        ,
        getTitulo: function(){
            return this.titulo;
        }
        ,
        setLenguaje: function(lenguaje){
            this.lenguaje=lenguaje;
        }
        ,
        getLenguaje: function(){
            return this.lenguaje;
        }
        ,
        setRutaFuente: function(rutaFuente){
            this.rutaFuente=rutaFuente;
        }
        ,
        getRutaFuente: function(){
            return this.rutaFuente;
        }
       ,
    }
