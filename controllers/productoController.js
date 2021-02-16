let productos = [{idProd: '0001',
                nombre: 'Pilot Strap', 
                precio: 'S/16.00', 
                desc1: 'Accesorio que sirve de complemento para sujetar los mapas, facilitar la observación del piloto en vuelo y la organizacion en la cabina.',
                desc2: 'Hecho de materiales de fácil transporte y durabilidad',
                categ: 'Para el piloto',
                etiqueta: 'Wingstore',
                imgPrinc: '/images/Pilots-mapstrap-example.jpg',
                galImgs: ["/images/Pilots-mapstrap-example-504x504.jpg", 
                        "/images/Pilot-Mapstrap-2-504x504.jpg",
                        "/images/Pilot-Mapstrap-3-504x504.jpg",
                        "/images/Pilot-Mapstrap-504x504.jpg",
                        "/images/Pilots-mapstrap-example-3-504x504.jpg",
                        "/images/Pilots-mapstrap-example-4-504x504.jpg",
                        "/images/Pilots-mapstrap-example-5-504x504.jpg",
                        "/images/Pilots-mapstrap-example-2-504x504.jpg"],
                prodsRel: ['0002', '0003', '0004']},
                {idProd: '0002',
                nombre: 'Headset Piloto', 
                precio: 'S/139.95', 
                desc1: 'Accesorio que sirve de complemento para sujetar los mapas, facilitar la observación del piloto en vuelo y la organizacion en la cabina.',
                desc2: 'Hecho de materiales de fácil transporte y durabilidad',
                categ: 'Para el piloto',
                etiqueta: 'Auriculares o Headsets',
                imgPrinc: '/images/PPA-504x638.png',
                galImgs: [],
                prodsRel: ['0001', '0003', '0004']},
                {idProd: '0003',
                nombre: 'Lanyard Cessna', 
                precio: 'S/20.00', 
                desc1: 'Accesorio que sirve de complemento para sujetar los mapas, facilitar la observación del piloto en vuelo y la organizacion en la cabina.',
                desc2: 'Hecho de materiales de fácil transporte y durabilidad',
                categ: 'Para el piloto',
                etiqueta: 'Regalos',
                imgPrinc: '/images/usher-2.png',
                galImgs: [],
                prodsRel: ['0001', '0002', '0004']},
                {idProd: '0004',
                nombre: 'Camisa Aviador para Pilotos', 
                precio: 'S/55.00', 
                desc1: 'Accesorio que sirve de complemento para sujetar los mapas, facilitar la observación del piloto en vuelo y la organizacion en la cabina.',
                desc2: 'Hecho de materiales de fácil transporte y durabilidad',
                categ: 'Para el piloto',
                etiqueta: 'Uniformes',
                imgPrinc: '/images/camisa-aviador-corbata-galones-y-modelo.jpg',
                galImgs: [],
                prodsRel: ['0001', '0003', '0004']}];

const productController = {
    producto: (req, res) =>{
        let idProd = req.params.idProd;
        let filtro = productos.filter(producto => (producto.idProd == idProd));
        let prod = filtro[0];
        let productosRel = [];
        for (let i = 0; i < prod.prodsRel.length; i++) {
            for(let j = 0; j < productos.length; j++) {
                if(productos[j].idProd == prod.prodsRel[i]) {
                    productosRel.push(productos[j]);
                }
            }
        }
        res.render('./products/productDetail', {producto: prod, productosRel: productosRel});
    },
    
    listado: (req, res) =>{
        res.render('productList');
    },

    editar: (req, res) =>{
        let idProd = req.params.idProd;
        let filtro = productos.filter(producto => (producto.idProd == idProd));
        let prod = filtro[0];
        res.render('./products/editProduct', {producto: prod});
    },
};

module.exports = productController;