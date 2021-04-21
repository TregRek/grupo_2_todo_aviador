
USE `todo_aviador_dev` ;

-- -----------------------------------------------------
-- Table `todo_aviador_dev`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo_aviador_dev`.`user` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `firts_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `update_at` DATETIME NOT NULL,
  `status` CHAR(1) NOT NULL,
  `name_img` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_user`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo_aviador_dev`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo_aviador_dev`.`product` (
  `id_product` INT NOT NULL AUTO_INCREMENT,
  `name_product` VARCHAR(45) NOT NULL,
  `description` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id_product`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo_aviador_dev`.`size`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo_aviador_dev`.`size` (
  `id_size` INT NOT NULL AUTO_INCREMENT,
  `size` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_size`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo_aviador_dev`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo_aviador_dev`.`category` (
  `id_category` INT NOT NULL AUTO_INCREMENT,
  `name_category` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_category`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo_aviador_dev`.`color`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo_aviador_dev`.`color` (
  `id_color` INT NOT NULL AUTO_INCREMENT,
  `color` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_color`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo_aviador_dev`.`product_entry`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo_aviador_dev`.`product_entry` (
  `id_product_entry` INT NOT NULL AUTO_INCREMENT,
  `product_id_product` INT NOT NULL,
  `size_id_size` INT NOT NULL,
  `category_id_category` INT NOT NULL,
  `color_id_color` INT NOT NULL,
  `price` FLOAT NOT NULL,
  `stock` INT NOT NULL,
  `status` CHAR(1) NOT NULL,
  PRIMARY KEY (`id_product_entry`),
  CONSTRAINT `fk_product_entry_product1`
    FOREIGN KEY (`product_id_product`)
    REFERENCES `todo_aviador_dev`.`product` (`id_product`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_entry_size1`
    FOREIGN KEY (`size_id_size`)
    REFERENCES `todo_aviador_dev`.`size` (`id_size`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_entry_category1`
    FOREIGN KEY (`category_id_category`)
    REFERENCES `todo_aviador_dev`.`category` (`id_category`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_entry_color1`
    FOREIGN KEY (`color_id_color`)
    REFERENCES `todo_aviador_dev`.`color` (`id_color`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo_aviador_dev`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo_aviador_dev`.`cart` (
  `id_cart` INT NOT NULL AUTO_INCREMENT,
  `user_id_user` INT NOT NULL,
  `date` DATETIME NULL,
  `total` FLOAT NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`id_cart`),
  CONSTRAINT `fk_cart_user1`
    FOREIGN KEY (`user_id_user`)
    REFERENCES `todo_aviador_dev`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo_aviador_dev`.`cart_prod`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo_aviador_dev`.`cart_prod` (
  `id_cart_prod` INT NOT NULL AUTO_INCREMENT,
  `cart_id_cart` INT NOT NULL,
  `product_entry_id_product_entry` INT NOT NULL,
  `amount` INT NOT NULL,
  PRIMARY KEY (`id_cart_prod`),
  CONSTRAINT `fk_cart_prod_cart1`
    FOREIGN KEY (`cart_id_cart`)
    REFERENCES `todo_aviador_dev`.`cart` (`id_cart`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cart_prod_product_entry1`
    FOREIGN KEY (`product_entry_id_product_entry`)
    REFERENCES `todo_aviador_dev`.`product_entry` (`id_product_entry`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo_aviador_dev`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo_aviador_dev`.`order` (
  `id_order` INT NOT NULL,
  `user_id_user` INT NOT NULL,
  `cart_id_cart` INT NOT NULL,
  `payment` VARCHAR(255) NOT NULL,
  `province` VARCHAR(45) NOT NULL,
  `district` VARCHAR(45) NOT NULL,
  `adress` VARCHAR(45) NOT NULL,
  `ordercol` VARCHAR(45) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_order`),
  CONSTRAINT `fk_order_user`
    FOREIGN KEY (`user_id_user`)
    REFERENCES `todo_aviador_dev`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_cart1`
    FOREIGN KEY (`cart_id_cart`)
    REFERENCES `todo_aviador_dev`.`cart` (`id_cart`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo_aviador_dev`.`image`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo_aviador_dev`.`image` (
  `id_image` INT NOT NULL AUTO_INCREMENT,
  `name_img` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_image`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo_aviador_dev`.`prod_image`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo_aviador_dev`.`prod_image` (
  `id_prod_image` INT NOT NULL AUTO_INCREMENT,
  `product_id_product` INT NOT NULL,
  `image_id_image` INT NOT NULL,
  PRIMARY KEY (`id_prod_image`),product_id_productproduct_id_productproduct_id_product
  CONSTRAINT `fk_prod_image_product1`
    FOREIGN KEY (`product_id_product`)
    REFERENCES `todo_aviador_dev`.`product` (`id_product`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_prod_image_image1`
    FOREIGN KEY (`image_id_image`)
    REFERENCES `todo_aviador_dev`.`image` (`id_image`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

