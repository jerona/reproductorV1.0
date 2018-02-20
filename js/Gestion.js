
//ArchivoMultimedia(id, nombre, rutaRelativa, tipo, formatos, cover)
"use strict";
var listaMultimedia=[new ArchivoMultimedia(1,"audio 1","audio/cancion_1","audio",["mp3"],"img/portada_1.jpg"),
                 new ArchivoMultimedia(2,"video 1","video/video1_1280x720","video",["mp4"],"",[new Subtitulo(0,"subtitulo español","es","sub/0.vtt")]),
                 new ArchivoMultimedia(3,"audio 2","audio/cancion_2","audio",["mp3"],"img/portada_2.jpg"),
                 new ArchivoMultimedia(4,"video 2","video/video_2","video",["mp4","webm","ogg"],""),
                 new ArchivoMultimedia(5,"audio 3","audio/cancion_3","audio",["mp3"],"img/portada_3.jpg"),
                 new ArchivoMultimedia(6,"video 3","video/video_3","video",["mp4"],"") ]

var posListaReproduccion;
var play=true, muted=false, pause=false, subtitulo_ocultar=false;
var volumenActual=1;
var tipoElementoReproducir;

$(function(){
    //DOM
    posListaReproduccion=0;
    crearListaDOM();
    svgPlayActual();
    //eventos
    $("#svg_play").on("click",accionReproducir);
    $("#svg_pausa").on("click",accionPausar);
    $("#svg_detener").on("click",accionDetener);
    $("#svg_retroceder").on("click",accionRetroceder);
    $("#svg_avanzar").on("click",accionAvanzar);
    $("#aumentar_volumen_svg").on("click",accionAumentarVolumen);
    $("#bajar_volumen_svg").on("click",accionDisminuirVolumen);
    $("#silenciar_volumen_svg").on("click",accionRestaurarSilenciarVolumen);
    $("#poner_volumen_svg").on("click",accionRestaurarSilenciarVolumen);
    $("#rango_tiempo").on("change",accionPosicionarse);
    $("#rango_volumen").on("change",accionPosicionarseVolumen);
    $("#rango_volumen").on("mousemove",accionPosicionarseVolumen);
    $("#svg_cc_subtitulo").on("click",accionSubtitulos);
    $("#svg_cc_no_subtitulo").on("click",accionSubtitulos);
    $("aside").find("ul").find("li").on("click",accionCambiarCancionLista);
    $("audio")[0].ontimeupdate=actualizarTiempos;
    $("audio")[0].onended = accionTerminarReproduccion;
    $("video")[0].ontimeupdate=actualizarTiempos;
    $("video")[0].onended = accionTerminarReproduccion;

    configuracion();
})


function configuracion(){
    $("#silenciar_volumen_svg").css("display","none");
    $("#svg_pausa").css("display","none");
    $("#rango_volumen")[0].value="100";
   
    posListaReproduccion=0;
    cargarTipoElemento();
    mostrarOcultarAudioVideo();
    cargarArchivo();
    cargarVolumen();
    accionReproducir();
}


function accionReproducir(){
    $("#svg_play").css("display","none");
    $("#svg_pausa").css("display","block");
    pause=false;
    reproducir();
}

function accionPausar(){
    $("#svg_play").css("display","block");
    $("#svg_pausa").css("display","none");

    pause=true;
    $(tipoElementoReproducir)[0].pause();
    
}

function accionCambiarCancionLista(){
    var nombre=$(this).text();

    for(var i=0;i<listaMultimedia.length;i++){
        if(nombre==listaMultimedia[i].nombre){
            posListaReproduccion=i;
            i=nombre.length+1;
        }
    }

    $(tipoElementoReproducir)[0].pause();
    cargarTipoElemento();
    mostrarOcultarAudioVideo();
    cargarArchivo();
    cargarVolumen();
    accionReproducir();

}

function accionRestaurarSilenciarVolumen(){
    var tipoMultimedia=listaMultimedia[posListaReproduccion].tipo=="audio"?"audio":"video";

    if($(tipoElementoReproducir)[0].muted==true){
        $("#silenciar_volumen_svg").css("display","none");
        $("#poner_volumen_svg").css("display","block");
        $(tipoElementoReproducir)[0].muted=false;
        muted=false;
    }
    else{
        $("#silenciar_volumen_svg").css("display","block");
        $("#poner_volumen_svg").css("display","none");
        $(tipoElementoReproducir)[0].muted=true;
        muted=true;
    }
    
}

function accionPosicionarse(){
    var posicion=(this).value;
    $(tipoElementoReproducir)[0].currentTime=posicion;
}

function accionPosicionarseVolumen(){
    var posicion=(this).value;
    $(tipoElementoReproducir)[0].volume=this.value/100;
    $("#volumen_actual").text(posicion+"%");
    volumenActual=this.value/100;
}


function accionAvanzar(){
    $(tipoElementoReproducir)[0].currentTime+=10;
}

function accionRetroceder(){
    if($(tipoElementoReproducir)[0].currentTime<1 && posListaReproduccion>0){
        $(tipoElementoReproducir)[0].pause();
        posListaReproduccion--;
        cargarTipoElemento();
        mostrarOcultarAudioVideo();
        cargarArchivo();
        cargarVolumen();
        reproducir();
    }
    else{
        $(tipoElementoReproducir)[0].currentTime-=10;
    }

}

function accionDetener(){
    var tipoMultimedia=listaMultimedia[posListaReproduccion].tipo=="audio"?"audio":"video";

    $(tipoElementoReproducir)[0].currentTime=0;
    $("#rango_tiempo")[0].value=0;
    pause=true;
    accionPausar();
    $("#svg_play").css("display","flex");
    $("#svg_pausa").css("display","none")
}

function accionDisminuirVolumen(){
    var tipoMultimedia=listaMultimedia[posListaReproduccion].tipo=="audio"?"audio":"video";
    let elemento=$(tipoMultimedia)[0];

    if(elemento.volume>0.0){
        elemento.volume=((parseInt(elemento.volume*100-5))/100);
        $("#volumen_actual").text(parseInt(elemento.volume*100)+"%");
    }
    
}

function accionTerminarReproduccion(){
    posListaReproduccion=(posListaReproduccion+1)<listaMultimedia.length?++posListaReproduccion:0;
    cargarTipoElemento();
    mostrarOcultarAudioVideo();
    cargarArchivo();
    cargarVolumen();
    reproducir();
}


function cargarTipoElemento(){
    tipoElementoReproducir=listaMultimedia[posListaReproduccion].tipo=="audio"
    ?tipoElementoReproducir="audio":tipoElementoReproducir="video";
    
}

function cargarVolumen(){
    $(tipoElementoReproducir)[0].muted=muted;
    $(tipoElementoReproducir)[0].volume= volumenActual;
   
}

function mostrarOcultarAudioVideo(){
    if(tipoElementoReproducir=="audio"){
        $("audio").css("display","none");
        $("video").css("display","none");
    }
    else if(tipoElementoReproducir=="video"){
        $("audio").css("display","none");
        $("video").css("display","block");
    }
}

function cargarArchivo(){
    var archivoMultimedia=listaMultimedia[posListaReproduccion];
    $(".aside").find("svg").remove();
    $("article:nth-child(1)").find("img").remove();
    $("article:nth-child(1)").find("track").remove();
    $("audio").find("source").remove();
    $("video").find("source").remove();

    $(".aside").find("li").css("fontWeight","normal");
    $(".aside").find("li")[posListaReproduccion].style.fontWeight="bold";

    svgPlayActual();

    if(tipoElementoReproducir=="audio"){
        $("audio").after("<img>").next("img")
        .attr("src",archivoMultimedia.cover)
        .attr("alt","caratula "+tipoElementoReproducir);
    }

    for(var i=0;i<archivoMultimedia.formatos.length;i++){
        let formato=archivoMultimedia.formatos[i];
        let rutaArchivo=archivoMultimedia.rutaRelativa+"."+formato;

        $(tipoElementoReproducir).append("<source>").children().last()
        .attr("src",rutaArchivo).attr("tipo",tipoElementoReproducir+"/"+formato).parent();
    }

    if(archivoMultimedia.subtitulos!=null && archivoMultimedia.subtitulos!=undefined ){
        if(subtitulo_ocultar==true){
            $("#svg_cc_no_subtitulo").css("display","flex");
            $("#svg_cc_subtitulo").css("display","none");
        }
        else{
            $("#svg_cc_no_subtitulo").css("display","none");
            $("#svg_cc_subtitulo").css("display","flex");
        }
        
        for(var i=0;i<archivoMultimedia.subtitulos.length;i++){
            let subtitulo=archivoMultimedia.subtitulos[i];

            $(tipoElementoReproducir).append("<track>").find("track").last()
            .attr("kind","subtitles").attr("label",subtitulo.titulo)
            .attr("src",subtitulo.rutaFuente)
            .attr("srclang",subtitulo.lenguaje)
            .attr("default",true).parent();
        }
    }
    else{
        $("#svg_cc_subtitulo").css("display","none");
        $("#svg_cc_no_subtitulo").css("display","none");
    }
    
    /**Chapuza **/
    if(archivoMultimedia.nombre=="video 1"){
        $("source").first()
        .attr("media","screen and (min-device-width:1280px)")
        .after("<source>").next()
        .attr("media","screen and (min-device-width:1280px)")
        .attr("src","video1_1280x720.webm")
        .after("<source>").next()
        .attr("src","video1_640x720.mp4")
        .attr("media","screen and (max-device-width:640px)")
        .after("<source>").next()
        .attr("src","video1_640x720.webm")
        .attr("media","screen and (max-device-width:640px)");
    }
    /**Fin chapuza */
    
    $(tipoElementoReproducir)[0].load();//carga nueva fuente
    $("#rango_tiempo")[0].value=0;
}

function cargarDuracionTotal(){
    var tiempo=horasMinutosSegundos($(tipoElementoReproducir)[0].duration);


    let hora=tiempo[0]<10?"0"+tiempo[0]:tiempo[0];
    let min=tiempo[1]<10?"0"+tiempo[1]:tiempo[1];
    let seg=tiempo[2]<10?"0"+tiempo[2]:tiempo[2];

    $("#rango_tiempo").attr("max",parseInt($(tipoElementoReproducir)[0].duration,10));
    $("#tiempoAcabado").text(hora+":"+min+":"+seg);

}

function actualizarTiempos(){
    cargarTiempoActual();
    cargarDuracionTotal();
}

function accionAumentarVolumen(){
    let elemento=$(tipoElementoReproducir)[0];

    if(elemento.volume<1){
        elemento.volume=((parseInt(elemento.volume*100+5))/100);
        $("#volumen_actual").text(parseInt(elemento.volume*100)+"%");
    }
   
}



function reproducir(){
    if(pause==false){
        $(tipoElementoReproducir)[0].play();
    }
}

function cargarTiempoActual(){
    var tiempo;

        tiempo=horasMinutosSegundos($(tipoElementoReproducir)[0].currentTime);
        let hora=tiempo[0]<10?"0"+tiempo[0]:tiempo[0];
        let min=tiempo[1]<10?"0"+tiempo[1]:tiempo[1];
        let seg=tiempo[2]<10?"0"+tiempo[2]:tiempo[2];
        $("#rango_tiempo")[0].value=parseInt($(tipoElementoReproducir)[0].currentTime);
        $("#tiempoReproducido").text(hora+":"+min+":"+seg);
}

/**Muestra el subtitulo correspondiente.
 * Va cambiando el tipo de subtitulo que se tenga disponible.
 * Si ya se han seleccionado anteriormente todos los subtitulos se desactivan
 * hasta que le vuelvan a dar el usuario, volviendo a empezar.
 */
function accionSubtitulos(){
    var multimedia=listaMultimedia[posListaReproduccion];
    var subtitulos=[];
    var cambioSubtitulo=false;

    if(multimedia.subtitulos!=null && multimedia.subtitulos!=undefined){
        subtitulos=multimedia.subtitulos;
        
        for(var i=0;i<subtitulos.length;i++){
            if($(tipoElementoReproducir)[0].textTracks[i].mode=="showing"){
                if((i+1)==subtitulos.length){
                    $(tipoElementoReproducir)[0].textTracks[i].mode="disabled";
                    $("#svg_cc_no_subtitulo").css("display","flex");
                    $("#svg_cc_subtitulo").css("display","none");
                    subtitulo_ocultar=true;
                }
                else{
                    $(tipoElementoReproducir)[0].textTracks[i].mode="disabled";
                    $(tipoElementoReproducir)[0].textTracks[(i+1)].mode="showing";
                    $("#svg_cc_no_subtitulo").css("display","none");
                    $("#svg_cc_subtitulo").css("display","flex");
                    subtitulo_ocultar=false;
                }
                cambioSubtitulo=true;
                i==subtitulos.length+1;
            }
        }
        if(cambioSubtitulo==false){
            $(tipoElementoReproducir)[0].textTracks[0].mode="showing";
            $("#svg_cc_no_subtitulo").css("display","none");
            $("#svg_cc_subtitulo").css("display","flex");
            subtitulo_ocultar=false;
        }
    }
}

function horasMinutosSegundos(segundos){
    segundos=parseInt(segundos);
    
    let seg=segundos%60;
    let cociente=parseInt(segundos/60);
    let min=cociente%60;
    let hora=parseInt(cociente/60);
    //console.log("horas: "+hora +" - minutos: "+min+" - segundos: "+seg+" - real: "+segundos+" cociente: "+cociente);
    return [hora,min,seg];
}

function crearListaDOM(){
    var ulNodo=$(".aside").append("<ul>").children();

    for(var i=0;i<listaMultimedia.length;i++){
        $(ulNodo).append("<li>").children().last().text(listaMultimedia[i].nombre).after("<div>");
    }

}


/**Crea la estructura del svg con symbol y use.
 * 
 */
function svgPlayActual(){
    var xmlns,nodoSVG,nodoDivLi,nodoPath, cont;

    xmlns="http://www.w3.org/2000/svg";

    cont=0;

    nodoDivLi=$(".aside").find("li").next()[posListaReproduccion];

    nodoSVG=crearNodoInsertBeforeNSHtml(nodoDivLi,"svg",xmlns,"",cont++);
    nodoSVG.setAttributeNS(null,"id","svg_play_actual");
    nodoSVG.setAttributeNS(null,"height","20px");
    nodoSVG.setAttributeNS(null,"width","20px");
    nodoSVG.setAttributeNS(null,"viewBox","0 0 100 140");
    nodoPath=crearNodoInsertBeforeNSHtml(nodoSVG,"path",xmlns,"",cont++);
    nodoPath.setAttributeNS(null,"id","svg_play_actual_path");
    nodoPath.setAttributeNS(null,"fill","green");
    nodoPath.setAttributeNS(null,"stroke","black");
    nodoPath.setAttributeNS(null,"d","M10.112,112.872V12.128c0-6.721,7.274-10.922,13.096-7.564l87.311,50.372c5.825,3.36,5.825,11.767,0,15.127l-87.311,50.372C17.387,123.794,10.112,119.593,10.112,112.872z");
}