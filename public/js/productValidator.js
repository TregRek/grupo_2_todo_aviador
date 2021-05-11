window.addEventListener("load", ()=>{
    let formularioProducto = document.querySelector('form');
    formularioProducto.addEventListener("submit", (e) => {
        let errores = [];
        let campoNombre = document.querySelector('#name');
        let campoDescripcion = document.querySelector('#description');
        let campoImagen = document.querySelector('#image');
        let validExtentions = [".jpg", ".jpeg", ".png", ".gif"];  
        if(campoNombre==""){
            errores.push("El producto debe tener un nombre");
        } else if (campoNombre.value.length < 5){
            errores.push("El nombre del producto debe tener al menos 5 caracteres");
        }
        if(campoDescripcion == ""){
            errores.push("El producto debe tener una descripción");
        } else if (campoDescripcion.value.length < 20){
            errores.push('La descripción del producto debe tener al menos 20 caracteres');
        }
        if(!validExtentions.includes(campoImagen.value.substr(campoImagen.value.length - 4)) && campoImagen.value != ""){
            errores.push(`La extensiones permitidas son ${validExtentions.join(', ')}`);
        }
        if(errores.length > 0){
            e.preventDefault();
            let ulErrores = document.querySelector('div.errores ul');
            ulErrores.innerHTML="";
            for(let i = 0; i<errores.length;i++){
                ulErrores.innerHTML+="<li>"+errores[i]+"</li>"
            }
        }
    });
});
