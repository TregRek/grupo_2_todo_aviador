window.addEventListener("load", ()=>{

    let registerForm = document.querySelector('form');
    registerForm.addEventListener("submit", (e) => {
        let errores = [];
        let campoUsuario = document.querySelector('#usuario');
        let campoNombre = document.querySelector('#nombres');
        let campoApellido = document.querySelector('#apellidos');
        let campoEmail = document.querySelector('#email'); 
        let campoPassword= document.querySelector('#password');
        let campoImagen = document.querySelector('#image');
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let validExtentions = [".jpg", ".jpeg", ".png", ".gif"];  
        
        //VALIDANDO CAMPO USUARIO
        if(campoUsuario==""){
            errores.push("Debe registrar un nombre de usuario");
        } else if (campoUsuario.value.length < 3){
            errores.push("El nombre de usuario debe tener al menos 3 caracteres");
        }
        //VALIDANDO CAMPO NOMBRE
        if(campoNombre.value == ""){
            errores.push("Por favor ingrese su nombre");
        } else if (campoNombre.value.length < 2){
            errores.push('Su nombre debe tener al menos 2 caracteres');
        }
        //VALIDANDO CAMPO APELLIDO
        if(campoApellido.value == ""){
            errores.push("Por favor ingrese su apellido");
        } else if (campoApellido.value.length < 2){
            errores.push('Su apellido debe tener al menos 2 caracteres');
        }
        //VALIDANDO CAMPO EMAIL
        if (campoEmail.value==""){
            errores.push('Debe ingresar un email');
        } else if (!re.test(campoEmail.value)){
            errores.push('Debe ingresar un email valido');
        }
        //VALIDANDO CAMPO DE PASSWORD
        if(campoPassword.value == ""){
            errores.push("Por favor ingrese una contraseña");
        } else if (campoPassword.value.length < 8){
            errores.push('La contraseña debe tener al menos 8 caracteres');
        }
        //VALIDANDO CAMPO DE IMAGEN
        if(!validExtentions.includes(campoImagen.value.substr(campoImagen.value.length - 4)) && campoImagen.value != ""){
            errores.push(`La extensiones permitidas son ${validExtentions.join(', ')}`);
        }

        if(errores.length > 0){
            e.preventDefault();
            let ulErrores = document.querySelector('div.errores ul');
            ulErrores.innerHTML=""
            for(let i = 0; i<errores.length;i++){
                ulErrores.innerHTML+="<li>"+errores[i]+"</li>"
            }
        }
    });
});
