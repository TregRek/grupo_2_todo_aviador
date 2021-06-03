window.addEventListener("load", ()=>{

    let mas = document.querySelector('#mas');
    let menos = document.querySelector('#menos');
    let num_prod = document.querySelector('#num_prod');
    let subt = document.querySelector('span #subtotal');
    let price = document.querySelector('span #precio')

    subt.textContent = (parseInt(price.textContent) * parseInt(num_prod.value));

    mas.addEventListener('click',(e)=>{
        e.preventDefault();
        num_prod.value = (parseInt(num_prod.value) + 1);
        subt.textContent = (parseInt(subt.textContent) + parseInt(price.textContent));
    })

    menos.addEventListener('click',(e)=>{
        e.preventDefault();
        if(num_prod.value > 1){
        num_prod.value -= 1;
        subt.textContent = (parseInt(subt.textContent) - parseInt(price.textContent));
        }
    })

})