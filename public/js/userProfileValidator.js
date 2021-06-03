window.addEventListener("load", ()=>{

    let formUserData = document.querySelector('.user-data');
    formUserData.addEventListener("submit", (e) => {
        e.preventDefault();
        let erroresInfoPersonal = [];
        let campoImgUser = document.querySelector('#image');
        let campoUsuario = document.querySelector('#usuario').value;
        let campoNombre = document.querySelector('#nombres').value;
        let campoApellido = document.querySelector('#apellidos').value;
        let campoEmail = document.querySelector('#email').value; 

        
        const validExtentions = [".jpg", ".jpeg", ".png", ".gif"]; 
        const validEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;


        
        //VALIDANDO CAMPO USUARIO
        if(!validExtentions.includes(campoImagen.value.substr(campoImagen.value.length - 4)) && campoImagen.value != ""){
            erroresInfoPersonal.push(`La extensiones permitidas son ${validExtentions.join(', ')}`);
        }
        //VALIDAONDO CAMPO USUARIO
        if(campoUsuario === ""){
            erroresInfoPersonal.push("Debe registrar un nombre de usuario");
        } else if (campoUsuario.length < 3){
            erroresInfoPersonal.push("El nombre de usuario debe tener al menos 3 caracteres");
        }
        //VALIDANDO CAMPO NOMBRE
        if(campoNombre === ""){
            erroresInfoPersonal.push("Por favor ingrese su nombre");
        } else if (campoNombre.length < 2){
            erroresInfoPersonal.push('Su nombre debe tener al menos 2 caracteres');
        }
        //VALIDANDO CAMPO APELLIDO
        if(campoApellido === ""){
            erroresInfoPersonal.push("Por favor ingrese su apellido");
        } else if (campoApellido.length < 2){
            erroresInfoPersonal.push('Su apellido debe tener al menos 2 caracteres');
        }
        //VALIDANDO CAMPO EMAIL
        if (!validEmail.test(campoEmail)){
            erroresInfoPersonal.push('Ha ingresado un email incorrecto');
        }

        console.log(erroresInfoPersonal);
        //IMPRIMIR LOS ERRORES INFORMACION PERSONAL
        if(erroresInfoPersonal.length > 0 ){
            e.preventDefault();
            let ulErrores = document.querySelector('.errores ul');
            for(let i = 0; i<erroresInfoPersonal.length;i++){
                ulErrores.innerHTML+="<li>" + erroresInfoPersonal[i] + "</li>"
            }
        }
    });

    let formUserPassword = document.querySelector('.user-password');
    formUserPassword.addEventListener("submit", (e) => {
        
        let erroresInfoPassword = [];
        let campoPasswordActual= document.querySelector('#actPassword').value;
        let campoNewPassword= document.querySelector('#newPassword').value;
        let campoConfirmPassword= document.querySelector('#confPassword').value;

        //VALIDANDO CAMPO DE PASSWORD ACTUAL
        if(campoPasswordActual === ''){
            erroresInfoPassword.push("Por favor ingrese tu contraseña actual");
        } else if (campoPasswordActual.length < 8){
            erroresInfoPassword.push('La contraseña debe tener al menos 8 caracteres');
        } 

        //VALIDANDO CAMPO DE NEW PASSWORD 


        if(campoNewPassword === '' && campoConfirmPassword === ''){ 
            erroresInfoPassword.push("Por favor ingrese tu nueva contraseña y confirmala");
        } else if(campoNewPassword === '' ){
            erroresInfoPassword.push("Por favor ingrese tu nueva contraseña ");
        } else if(campoConfirmPassword === ''){
            erroresInfoPassword.push("Por favor repite la nueva contraseña ");
        } 

        if(campoNewPassword.length < 8 && campoConfirmPassword.length < 8){
            erroresInfoPassword.push('La contraseña debe tener al menos 8 caracteres');
        }else if(campoNewPassword !== campoConfirmPassword){
            erroresInfoPassword.push("Las contraseñas deben ser iguales");
        }   

        console.log(erroresInfoPassword);
        //IMPRIMIR LOS ERRORES INFORMACION DE LA CONTRASEÑA
        if(erroresInfoPassword.length >= 0 ){
            e.preventDefault();
            let ulErrores = document.querySelector('.errores2 ul');
            for(let i = 0; i<erroresInfoPassword.length;i++){
                ulErrores.innerHTML+="<li>" + erroresInfoPassword[i] + "</li>"
            }
        }
       
    });
    
});
