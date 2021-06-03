window.addEventListener("load", ()=>{

    let mas = document.querySelector('#mas');
    let menos = document.querySelector('#menos');
    let num_prod = document.querySelector('#num_prod');
    let subt = document.querySelector('span #subtotal');
    let price = document.querySelector('span #precio')

    subt.textContent = parseFloat(parseFloat(price.textContent) * parseFloat(num_prod.value)).toFixed(2);

    mas.addEventListener('click',(e)=>{
        e.preventDefault();
        num_prod.value = (parseInt(num_prod.value) + 1);
        subt.textContent = parseFloat(parseFloat(subt.textContent) + parseFloat(price.textContent)).toFixed(2);
    })

    menos.addEventListener('click',(e)=>{
        e.preventDefault();
        if(num_prod.value > 1){
        num_prod.value -= 1;
        subt.textContent = parseFloat(parseFloat(subt.textContent) - parseFloat(price.textContent)).toFixed(2);
        }
    })

})