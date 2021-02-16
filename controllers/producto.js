let productos = 
[
    {
        idProd: '0001',
        nombre: 'Pilot Strap', 
        precio: 'S/16.00', 
        desc1: 'Accesorio que sirve de complemento para sujetar los mapas, facilitar la observación del piloto en vuelo y la organizacion en la cabina.',
        desc2: 'Hecho de materiales de fácil transporte y durabilidad',
        categ: 'Para el piloto',
        etiqueta: 'Wingstore',
        imgPrinc: '/images/Pilots-mapstrap-example.jpg',
        galImgs: 
        [
            "/images/Pilots-mapstrap-example-504x504.jpg", 
            "/images/Pilot-Mapstrap-2-504x504.jpg",
            "/images/Pilot-Mapstrap-3-504x504.jpg",
            "/images/Pilot-Mapstrap-504x504.jpg",
            "/images/Pilots-mapstrap-example-3-504x504.jpg",
            "/images/Pilots-mapstrap-example-4-504x504.jpg",
            "/images/Pilots-mapstrap-example-5-504x504.jpg",
            "/images/Pilots-mapstrap-example-2-504x504.jpg"
        ],
        prodsRel: ['0002', '0003', '0004']
    },     
    {
        idProd: '0002',
        nombre: 'Libro "Piloto Privado de Avión"', 
        precio: 'S/139.95', 
        desc1: 'Accesorio que sirve de complemento para sujetar los mapas, facilitar la observación del piloto en vuelo y la organizacion en la cabina.',
        desc2: 'Hecho de materiales de fácil transporte y durabilidad',
        categ: 'Para el piloto',
        etiqueta: 'Libros',
        imgPrinc: '/images/PPA-504x638.png',
        galImgs: 
        [
            '/images/PPA-504x638.png',
            '/images/PPA-2.jpg',
        ],
        prodsRel: ['0001', '0003', '0004']
    },        
    {
        idProd: '0003',
        nombre: 'Lanyard Cessna', 
        precio: 'S/20.00', 
        desc1: 'Accesorio que sirve de complemento para sujetar los mapas, facilitar la observación del piloto en vuelo y la organizacion en la cabina.',
        desc2: 'Hecho de materiales de fácil transporte y durabilidad',
        categ: 'Para el piloto',
        etiqueta: 'Regalos',
        imgPrinc: '/images/usher-2.png',
        galImgs: 
        [
            '/images/usher-2.png',

        ],
        prodsRel: ['0001', '0002', '0004']
    },        
    {
        idProd: '0004',
        nombre: 'Camisa Aviador para Pilotos', 
        precio: 'S/55.00', 
        desc1: 'Accesorio que sirve de complemento para sujetar los mapas, facilitar la observación del piloto en vuelo y la organizacion en la cabina.',
        desc2: 'Hecho de materiales de fácil transporte y durabilidad',
        categ: 'Para el piloto',
        etiqueta: 'Uniformes',
        imgPrinc: '/images/camisa-aviador-corbata-galones-y-modelo.jpg',
        galImgs: 
        [
            '/images/camisa-aviador-corbata-galones-y-modelo.jpg',
            '/images/camisa-aviador-corbata-galones-y-modelo-2.jpg',
        ],
        prodsRel: ['0001', '0003', '0004']
    },
    {
        idProd: '0005',
        nombre: 'Libro "los guardianes de nasca"', 
        precio: 'S/60.00', 
        desc1: 'Accesorio que sirve de complemento para sujetar los mapas, facilitar la observación del piloto en vuelo y la organizacion en la cabina.',
        desc2: 'Hecho de materiales de fácil transporte y durabilidad',
        categ: 'Libros',
        etiqueta: 'Regalos',
        imgPrinc: '/images/guardianes-de-nasca-1.png',
        galImgs: 
        [
            '/images/guardianes-de-nasca-1.png',
            '/images/guardianes-de-nasca-2.png',
            '/images/guardianes-de-nasca-3.png',
            '/images/guardianes-de-nasca-4.png',
        ],
        prodsRel: ['0001', '0003', '0004']
    }
];

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
        res.render('./products/productList',{producto: productos});

    },

    editar: (req, res) =>{
        let idProd = req.params.idProd;
        let filtro = productos.filter(producto => (producto.idProd == idProd));
        let prod = filtro[0];
        res.render('./products/editProduct', {producto: prod});
    },

    crear: (req, res) =>{
        let idProd = req.params.idProd;
        let filtro = productos.filter(producto => (producto.idProd == idProd));
        let prod = filtro[0];
        res.render('./products/createProduct', {producto: prod});
    },
};

module.exports = productController;