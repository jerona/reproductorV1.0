/** Crea un nodo con contenido y los inserta en el hijo del nodo de referencia (padre), 
 * se colocan de manera ordenada utilizando un número de orden para cada uno.
 * @param {Node} nodoReferencia 
 * @param {String} etiquetaNodo 
 * @param {String} contenidoNodoText 
 * @param {Int} orden 
 */
function crearNodoInsertBeforeHtml(nodoReferencia,etiquetaNodo,contenidoNodoText,orden){
    var nodoElemento=window.document.createElement(etiquetaNodo);
    var nodoContenidoTexto=window.document.createTextNode(contenidoNodoText);
    nodoElemento.appendChild(nodoContenidoTexto);
    nodoReferencia.insertBefore(nodoElemento,nodoReferencia.childNodes[orden]);

    return nodoElemento;
}


/** Crea un nodo con contenido y los inserta en el hijo del nodo de referencia (padre), 
 * se colocan de manera ordenada utilizando un número de orden para cada uno.
 * @param {Node} nodoReferencia 
 * @param {String} etiquetaNodo 
 * @param {String} contenidoNodoText 
 * @param {Int} orden 
 */
function crearNodoInsertBeforeNSHtml(nodoReferencia,etiquetaNodo,xmlns,contenidoNodoText,orden){
    var nodoElemento=window.document.createElementNS(xmlns,etiquetaNodo);
    var nodoContenidoTexto=window.document.createTextNode(contenidoNodoText);
    nodoElemento.appendChild(nodoContenidoTexto);
    nodoReferencia.insertBefore(nodoElemento,nodoReferencia.childNodes[orden]);

    return nodoElemento;
}