
-- --------------INSERT DE USUARIOS-----------------
insert into user (user_name, first_name, last_name, password, email, status, name_img) values ('asgarcia', 'Augusto', 'Saldarriaga', '$2a$10$ukgJl4I8t.dHEVsGihe7YOyNuw4oCThZXWgLl5YEcf2321r9uqckq', 'asgarcia103@gmail.com', 1, 'claudia.png');
insert into user (user_name, first_name, last_name, password, email, status, name_img) values ('asgarcia103', 'Augusto', 'Saldarriaga', '$2a$10$ukgJl4I8t.dHEVsGihe7YOyNuw4oCThZXWgLl5YEcf2321r9uqckq', 'asgarcia@gmail.com', 1, 'default-user.png');

-- --------------INSERT DE IMAGENES-----------------
insert into image (name_img) values ('Pilots-mapstrap-example-2-504x504.jpg');
insert into image (name_img) values ('PPA-504x638.png');
insert into image (name_img) values ('NAV-504x616.png');
insert into image (name_img) values ('PCA-libro.png');
insert into image (name_img) values ('ILS-libro.png');
insert into image (name_img) values ('MULTI-libro.png');
insert into image (name_img) values ('Pilot-lanyard-con-argolla-e1609813811260.jpg');
insert into image (name_img) values ('Organizational-pack-charts.jpg');
insert into image (name_img) values ('camisa-aviador-corbata-galones-y-modelo.jpg');
insert into image (name_img) values ('Guardianes-de-nasca.png');
insert into image (name_img) values ('Cessna-Lanyard.jpg');
insert into image (name_img) values ('TEST-prep-libro.png');
insert into image (name_img) values ('Defecto.jpg');

-- --------------INSERT DE CATEGORIAS-----------------
insert into category (name_category) values ('Para el piloto');
insert into category (name_category) values ('Regalos');
insert into category (name_category) values ('Libros');
insert into category (name_category) values ('Uniformes');

-- --------------INSERT DE TALLAS---------------------
INSERT INTO size (size) values ('SMALL');
INSERT INTO size (size) values ('MEDIUM');
INSERT INTO size (size) values ('LARGE');
INSERT INTO size (size) values ('XL');

-- --------------INSERT DE COLORES---------------------
INSERT INTO color (color) values ('Rojo');
INSERT INTO color (color) values ('Verde');
INSERT INTO color (color) values ('Azul');
INSERT INTO color (color) values ('Amarillo');
INSERT INTO color (color) values ('Negro');
INSERT INTO color (color) values ('Blanco');
INSERT INTO color (color) values ('Marrón');
INSERT INTO color (color) values ('Turquesa');
INSERT INTO color (color) values ('Dorado');
INSERT INTO color (color) values ('Plateado');

-- --------------INSERT DE MARCAS---------------------
INSERT INTO brand (name_brand) values ('Tommy');
INSERT INTO brand (name_brand) values ('HGT');
INSERT INTO brand (name_brand) values ('Modern Pilot');
INSERT INTO brand (name_brand) values ('Boeing');
INSERT INTO brand (name_brand) values ('H&M');

-- --------------INSERT DE PRODUCTOS---------------------
INSERT INTO product (name_product, description) VALUES ('Pilot Mapstrap','Accesorio que sirve de complemento para sujetar los mapas, facilitar la observación del piloto en vuelo y la organización en la cabina. Hecho de materiales de fácil transporte y durabilidad.');
INSERT INTO product (name_product, description) VALUES ('Libro Piloto Privado de Avión', 'Como es habitual en los tomos de HDIW, propone una metodología de instrucción completamente diferente a lo ya conocido. Para este excelente material, la propuesta es formar parte de un día típico en la vida de un Piloto Privado en instrucción. Desde su llegada a la escuela de vuelo, la preparación de la aeronave, la planificación de la aeronave, briefings, maniobras de vuelo, arribo al aeródromo y como paso final, llegar al aula y además de evaluar los conceptos vistos, continuar con el aprendizaje de los conceptos básicos de las materias más importantes, como: AERODINÁMICA, NAVEGACIÓN, MOTORES e INSTRUMENTOS DE VUELO.');
INSERT INTO product (name_product, description) VALUES ('Libro Navegación IFR & Comms','En esta nueva edición, conoceremos el fascinante mundo de la navegación aérea y sus comunicaciones en lo que propone ser un día típico en un VUELO DE LINEA AEREA. Abarcando cada tramo de una navegación, interactuando con los diferentes controles de transito con las estructuras de comunicación adecuadas a cada fase de vuelo. Sin duda una herramienta indispensable para todo aquel Piloto en entrenamiento o para aquellos fanáticos de la aviación comercial, ya que entre varias atracciones dentro de este material, lograremos vivir en primera persona, un día completo en la vida de un vuelo de línea.');
INSERT INTO product (name_product, description) VALUES ('Libro Piloto Comercial','');
INSERT INTO product (name_product, description) VALUES ('Libro ILS CAT I-II-III','HDIW ILS CAT I-II-III se presenta como la edición mas compleja y profesional de HDIW En esta quinta edición aprenderemos todo lo relacionado con un sistema de aterrizaje por instrumentos, sus componentes, su principio de funcionamiento, su operación y lo mejor de todo, VOLAREMOS UN ILS! HDIW ILS CAT I-II-III propone aprender todos los secretos para volar un ILS en condiciones normales y en condiciones de visibilidad marginal. Apoyado en toda la cartografía Jeppesen, recorreremos los aeropuertos mas complejos del mundo y aprenderemos a volar una aproximación ILS en cada uno de ellos. En HDIW ILS CAT I-II-III la aventura continua sin visibilidad! Ediciones portadas color y contenidos en blanco y negro.');
INSERT INTO product (name_product, description) VALUES ('Libro Multimotor & CRM','Bienvenidos al fascinante mundo de la Aviación. En esta oportunidad, HDIW ofrece la posibilidad de aprender todo lo relacionado al curso o habilitación de aviones “Multi-Motor”, y como valor agregado a este entretenido manual, abarcaremos conceptos básicos y operativos de CRM y manejo de fallas en cabinas compartidas. Durante el transcurso de esta lectura encontraremos capítulos fascinantes donde aprenderemos todo lo relacionado a los conocimientos que implica poseer la habilitación de “Avión Multi- Motor”, otorgada por la autoridad aeronáutica de cada país.');
INSERT INTO product (name_product, description) VALUES ('Pilot Lanyard','Accesorio que te permite portar licencias, identificaciones, alcohol en gel o llaves de una manera práctica. Pídelos con gancho o con argolla!!');
INSERT INTO product (name_product, description) VALUES ('Organization Pack','ORGANIZATION PACK: Tener tu material enmicado te permite reutilizar tus cartas en vez de usar una hoja cada vuelo. ♻️ Además este accesorio permite organizar tu piernera para tu progresión de navegación. El pack incluye un documento de drive con las frecuencias de todo el Peru, que ira actualizándose a medida que hayan cambios. PACK: 1. Carta de navegación (Dead reckoning) 2. Carta de Frecuencias (Grounds, VHFs, VORs, ILS) 3. Carta de notas (METAR, NOTAMs, TAFs, Notes, Cross wind component, pressure altitude and density altitude)');
INSERT INTO product (name_product, description) VALUES ('Camisa Aviador para Pilotos','Camisa para Pilotos, Slim Fit. Pilotos de Línea aérea lo recomiendan. En manga corta y manga larga. Recomendado para escuelas de vuelo. Tallas desde XS a XL. Blancas 70% Algodón 30% Poliéster. Marca: Todo Aviador Perú Los demás accesorios se venden por separado.');
INSERT INTO product (name_product, description) VALUES ('Libro “Los Guardianes de Nasca”','Es una novela de ciencia ficción basada en la historia de un piloto que no llega a Nasca por casualidad. Hoy una misión para él. Autor: Christian Yong. Material: Formato papel, tapa blanda. ISBN 9788740493481');
INSERT INTO product (name_product, description) VALUES ('Lanyard Cessna','Accesorio que te permite portar licencias, identificaciones, alcohol en gel o llaves de una manera práctica. Modelo: Con Gancho Color: Negro');
INSERT INTO product (name_product, description) VALUES ('Libro Test Prep','Conoces tu verdadero nivel académico? El más completo banco de preguntas basados en los conocimientos necesarios para transitar cada uno de los niveles en al carrera de un piloto profesional. 100 preguntas para el nivel INICIAL. 100 preguntas para el nivel INTERMEDIO. 100 preguntas para el nivel AVANZADO. 100 preguntas para el nivel TLA. Obtiene tu promedio de cada nivel y descubrí tu verdadero nivel académico! Ediciones portadas color y contenidos en blanco y negro');

-- --------------INSERT DE PRODUCT_ENTRY---------------------
INSERT INTO product_entry (id_product, id_size, id_category, id_brand, id_color, price, stock, status) VALUES (1, 1, 1, 1, 1, 16, 20, 1);
INSERT INTO product_entry (id_product, id_size, id_category, id_brand, id_color, price, stock, status) VALUES (2, 2, 2, 2, 2, 75, 10, 1);
INSERT INTO product_entry (id_product, id_size, id_category, id_brand, id_color, price, stock, status) VALUES (3, 3, 3, 3, 3, 75, 6, 1);
INSERT INTO product_entry (id_product, id_size, id_category, id_brand, id_color, price, stock, status) VALUES (4, 4, 4, 4, 4, 55, 45, 1);
INSERT INTO product_entry (id_product, id_size, id_category, id_brand, id_color, price, stock, status) VALUES (5, 1, 1, 1, 5, 49.95, 12, 1);
INSERT INTO product_entry (id_product, id_size, id_category, id_brand, id_color, price, stock, status) VALUES (6, 2, 2, 2, 1, 55, 7, 1);
INSERT INTO product_entry (id_product, id_size, id_category, id_brand, id_color, price, stock, status) VALUES (7, 3, 3, 3, 2, 20, 25, 1);
INSERT INTO product_entry (id_product, id_size, id_category, id_brand, id_color, price, stock, status) VALUES (8, 4, 4, 4, 3, 22, 13, 1);
INSERT INTO product_entry (id_product, id_size, id_category, id_brand, id_color, price, stock, status) VALUES (9, 1, 1, 1, 4, 55, 9, 1);
INSERT INTO product_entry (id_product, id_size, id_category, id_brand, id_color, price, stock, status) VALUES (10, 2, 2, 2, 5, 60, 3, 1);
INSERT INTO product_entry (id_product, id_size, id_category, id_brand, id_color, price, stock, status) VALUES (11, 3, 3, 3, 1, 20, 7, 1);
INSERT INTO product_entry (id_product, id_size, id_category, id_brand, id_color, price, stock, status) VALUES (12, 4, 4, 4, 2, 55, 5, 1);

-- --------------INSERT DE PRODUCT_IMAGE---------------------
INSERT INTO prod_image (id_product, id_image) values ('1','1');
INSERT INTO prod_image (id_product, id_image) values ('2','2');
INSERT INTO prod_image (id_product, id_image) values ('3','3');
INSERT INTO prod_image (id_product, id_image) values ('4','4');
INSERT INTO prod_image (id_product, id_image) values ('5','5');
INSERT INTO prod_image (id_product, id_image) values ('6','6');
INSERT INTO prod_image (id_product, id_image) values ('7','7');
INSERT INTO prod_image (id_product, id_image) values ('8','8');
INSERT INTO prod_image (id_product, id_image) values ('9','9');
INSERT INTO prod_image (id_product, id_image) values ('10','10');
INSERT INTO prod_image (id_product, id_image) values ('11','11');
INSERT INTO prod_image (id_product, id_image) values ('12','12');
