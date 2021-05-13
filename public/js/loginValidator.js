window.addEventListener("load", ()=>{
    
    let loginForm = document.querySelector('form');
    loginForm.addEventListener("submit", (e) => {
        let errores = [];
        let campoUsuario = document.querySelector('#usuario');
        let campoPassword= document.querySelector('#password'); 
        
        //VALIDANDO CAMPO USUARIO
        if(campoUsuario.value == ""){
            errores.push("Debe ingresar su nombre de usuario");
        } else if (campoUsuario.value.length < 3){
            errores.push("Recuerde: Su nombre de usuario contiene al menos 3 caracteres");
        }
        //VALIDANDO CAMPO DE PASSWORD
        if(campoPassword.value == ""){
            errores.push("Por favor ingrese su contraseña");
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
