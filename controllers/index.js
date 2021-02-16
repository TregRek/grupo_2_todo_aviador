const indexController = {
    index: (req, res) =>{
        res.render('index', {productos: productos});
    },
    login: (req, res) =>{
        res.render('login');
    },
    register: (req, res) =>{
        res.render('register');
    },
    cart:  (req, res) =>{
        res.render('productCart');
    }
};

let productos = [   {idProd: '0001',
                    nombre: 'Pilot Mapstrap', 
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
                    desc1: 'Hecho de materiales de fácil transporte y durabilidad',
                    desc2: 'Hecho de materiales de fácil transporte y durabilidad',
                    categ: 'Para el piloto',
                    etiqueta: 'Wingstore',
                    imgPrinc: 'static/images/Cessna Lanyard.jpg',
                    galImgs: [],
                    prodsRel: ['0001', '0003', '0004']},
                
                    {idProd: '0004',
                    nombre: 'Camisa Aviador para Pilotos', 
                    precio: 'S/55.00', 
                    desc1: 'Accesorio que sirve de complemento para sujetar los mapas, facilitar la observación del piloto en vuelo y la organizacion en la cabina.',
                    desc2: 'Hecho de materiales de fácil transporte y durabilidad',
                    categ: 'Para el piloto',
                    etiqueta: 'Uniformes',
                    imgPrinc: '/images/camisa-aviador-corbata-galones-y-modelo.jpg',
                    galImgs: [],
                    prodsRel: ['0001', '0003', '0004']},
                ];

module.exports = indexController;





