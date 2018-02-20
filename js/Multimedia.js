/**Representa un archivo multimedia.
    * @author Joel Alberto Armas Reyes.
    * @since 12/02/2018.
    */
    
    /**Constructor.
     * 
     * @param {*} id 
     * @param {*} nombre
     * @param {*} rutaRelativa 
     * @param {*} tipo 
     * @param {*} formatos 
     * @param {*} cover 
     * @param {*} subtitulos 
     */
    function ArchivoMultimedia(id, nombre, rutaRelativa, tipo, formatos, cover, subtitulos) {
        this.id = id;
        this.nombre = nombre;
        this.rutaRelativa=rutaRelativa;
        this.tipo=tipo;
        this.formatos=formatos;
        this.cover=cover;
        this.subtitulos=subtitulos;
    }

    /*Setter && Getter */
    ArchivoMultimedia.prototype={
        setId: function(id){
            this.id=id;
        }
        ,
        getId: function(){
            return this.id;
        }
        ,
        setNombre: function(nombre){
            this.nombre=nombre;
        }
        ,
        getNombre: function(){
            return this.nombre;
        }
        ,
        setRutaRelativa: function(rutaRelativa){
            this.rutaRelativa=rutaRelativa;
        }
        ,
        getRutaRelativa: function(){
            return this.rutaRelativa;
        }
       ,
        setTipo: function(tipo){
            this.tipo=tipo;
        },
        getTipo: function(){
            return this.tipo;
        }
        ,
        setCover: function(cover){
            this.cover=cover;
        },
        getCover: function(){
            return this.cover;
        }
        ,
        setSubtitulos: function(subtitulos){
            this.subtitulos=subtitulos;
        }
        ,
        getSubtitulos: function(){
            return this.subtitulos;
        }
    }
