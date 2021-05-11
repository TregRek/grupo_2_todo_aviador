window.addEventListener("load", ()=>{
    
    let loginForm = document.querySelector('form');
    registerForm.addEventListener("submit", (e) => {
        let errores = [];
        let campoUsuario = document.querySelector('#usuario');
        let campoPassword= document.querySelector('#password'); 
        
        //VALIDANDO CAMPO USUARIO
        if(campoUsuario==""){
            errores.push("Debe ingresar su nombre de usuario");
        } else if (campoUsuario.value.length < 3){
            errores.push("Recuerde: Su nombre de usuario contiene al menos 3 caracteres");
        }
        //VALIDANDO CAMPO DE PASSWORD
        if(campoPassword == ""){
            errores.push("Por favor ingrese su contraseña");
        } else if (campoPassword.value.length < 6){
            errores.push('Su contraseña debe tener al menos 6 caracteres');
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
