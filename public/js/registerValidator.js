window.addEventListener("load", ()=>{

    let registerForm = document.querySelector('form');
    registerForm.addEventListener("submit", (e) => {
        let errores = [];
        let campoUsuario = document.querySelector('#usuario');
        let campoNombre = document.querySelector('#nombres');
        let campoApellido = document.querySelector('#apellidos');
        let campoEmail = document.querySelector('#email'); 
        let campoPassword= document.querySelector('#password');
        
        //VALIDANDO CAMPO USUARIO
        if(campoUsuario==""){
            errores.push("Debe registrar un nombre de usuario");
        } else if (campoUsuario.value.length < 3){
            errores.push("El nombre de usuario debe tener al menos 3 caracteres");
        }
        //VALIDANDO CAMPO NOMBRE
        if(campoNombre == ""){
            errores.push("Por favor ingrese su nombre");
        } else if (campoNombre.value.length < 2){
            errores.push('Su nombre debe tener al menos 2 caracteres');
        }
        //VALIDANDO CAMPO APELLIDO
        if(campoApellido == ""){
            errores.push("Por favor ingrese su apellido");
        } else if (campoApellido.value.length < 2){
            errores.push('Su apellido debe tener al menos 2 caracteres');
        }
        //VALIDANDO CAMPO EMAIL
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(campoEmail.value)){
            return (true)
        } else {
            errores.push('Ha ingresado un email incorrecto');
        }
        //VALIDANDO CAMPO DE PASSWORD
        if(campoPassword == ""){
            errores.push("Por favor ingrese una contraseña");
        } else if (campoPassword.value.length < 6){
            errores.push('La contraseña debe tener al menos 6 caracteres');
        }else if (campoPassword.value)
        if(errores.length > 0){
            e.preventDefault();
            let ulErrores = document.querySelector('div.errores ul');
            for(let i = 0; i<errores.length;i++){
                ulErrores.innerHTML+="<li>"+errores[i]+"</li>"
            }
        }
    });
});
