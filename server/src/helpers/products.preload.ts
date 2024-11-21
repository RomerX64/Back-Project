import { conectionSource } from "src/config/typeorm";
import IProduct from "src/interfaces/IProduct";
import { Category } from "src/modules/products/categorys.entity";
import { Product } from "src/modules/products/product.entity";



const productsToPreLoad:IProduct[] = [{    name: 'Laptop HP Pavilion',
    description: 'Laptop con procesador Intel Core i5 de última generación.',
    price: 750.99,
    stock: 15,
    imgUrl: 'https://example.com/images/laptop-hp-pavilion.jpg',
    categories: [1, 3],
  },
  {   name: 'Smartphone Samsung Galaxy S23',
    description: 'Smartphone de alto rendimiento con cámara triple.',
    price: 999.99,
    stock: 30,
    imgUrl: 'https://example.com/images/galaxy-s23.jpg',
    categories: [1],
  },
  {
    name: 'Auriculares Sony WH-1000XM5',
    description: 'Auriculares inalámbricos con cancelación activa de ruido.',
    price: 349.99,
    stock: 20,
    imgUrl: 'https://example.com/images/sony-wh1000xm5.jpg',
    categories: [2],
  },
  {
    name: 'Monitor Dell UltraSharp 27"',
    description: 'Monitor QHD para profesionales y gamers.',
    price: 420.00,
    stock: 12,
    imgUrl: 'https://example.com/images/dell-monitor.jpg',
    categories: [3],
  },
  {    name: 'Teclado mecánico Logitech G Pro',
    description: 'Teclado mecánico RGB para gamers.',
    price: 129.99,
    stock: 25,
    imgUrl: 'https://example.com/images/logitech-keyboard.jpg',
    categories: [3],
  },
  {
    name: 'Mouse inalámbrico MX Master 3',
    description: 'Mouse ergonómico con alta precisión.',
    price: 99.99,
    stock: 40,
    imgUrl: 'https://example.com/images/mx-master-3.jpg',
    categories: [3],
  },
  {
    name: 'Silla gamer DXRacer',
    description: 'Silla ergonómica ideal para largas sesiones de juego.',
    price: 199.99,
    stock: 10,
    imgUrl: 'https://example.com/images/dxracer-chair.jpg',
    categories: [4],
  },
  {
    name: 'Tablet Apple iPad Pro',
    description: 'Tablet de alta gama con pantalla Liquid Retina.',
    price: 1099.99,
    stock: 8,
    imgUrl: 'https://example.com/images/ipad-pro.jpg',
    categories: [1],
  },
  {    name: 'Cámara Canon EOS R6',
    description: 'Cámara profesional mirrorless con estabilización avanzada.',
    price: 2499.99,
    stock: 5,
    imgUrl: 'https://example.com/images/canon-eos-r6.jpg',
    categories: [5],
  },
  {
    name: 'Consola PlayStation 5',
    description: 'La última consola de Sony con gráficos de nueva generación.',
    price: 499.99,
    stock: 18,
    imgUrl: 'https://example.com/images/ps5.jpg',
    categories: [6],
  },
  {
    name: 'Consola Xbox Series X',
    description: 'Potente consola de Microsoft para gamers exigentes.',
    price: 499.99,
    stock: 20,
    imgUrl: 'https://example.com/images/xbox-series-x.jpg',
    categories: [6],
  },
  {
    name: 'Reloj inteligente Apple Watch Series 9',
    description: 'Smartwatch con funciones avanzadas de salud y fitness.',
    price: 399.99,
    stock: 25,
    imgUrl: 'https://example.com/images/apple-watch.jpg',
    categories: [7],
  },
  {    name: 'Smart TV LG OLED',
    description: 'Televisor OLED con calidad 4K y colores vibrantes.',
    price: 1299.99,
    stock: 10,
    imgUrl: 'https://example.com/images/lg-oled.jpg',
    categories: [8],
  },
  {
    name: 'Altavoz portátil JBL Flip 6',
    description: 'Altavoz Bluetooth resistente al agua.',
    price: 129.99,
    stock: 35,
    imgUrl: 'https://example.com/images/jbl-flip-6.jpg',
    categories: [9],
  },
  {
    name: 'Impresora Epson EcoTank L3250',
    description: 'Impresora multifuncional con sistema de tanque de tinta.',
    price: 199.99,
    stock: 22,
    imgUrl: 'https://example.com/images/epson-ecotank.jpg',
    categories: [10],
  },
  {
    name: 'Disco Duro Externo Seagate 2TB',
    description: 'Almacenamiento portátil y confiable.',
    price: 89.99,
    stock: 50,
    imgUrl: 'https://example.com/images/seagate-2tb.jpg',
    categories: [3],
  },
  {
    name: 'Cargador Rápido Anker 45W',
    description: 'Cargador USB-C compatible con dispositivos múltiples.',
    price: 39.99,
    stock: 40,
    imgUrl: 'https://example.com/images/anker-charger.jpg',
    categories: [11],
  },
  {    name: 'Cable HDMI 4K 2M',
    description: 'Cable de alta calidad para transmitir video en 4K.',
    price: 15.99,
    stock: 60,
    imgUrl: 'https://example.com/images/hdmi-cable.jpg',
    categories: [3],
  },
  {    name: 'Lentes de Realidad Virtual Oculus Quest 2',
    description: 'Experimenta la realidad virtual de manera inmersiva.',
    price: 399.99,
    stock: 14,
    imgUrl: 'https://example.com/images/oculus-quest.jpg',
    categories: [6],
  },
  {    name: 'Cafetera Nespresso Essenza Mini',
    description: 'Cafetera compacta con gran sabor.',
    price: 159.99,
    stock: 32,
    imgUrl: 'https://example.com/images/nespresso-mini.jpg',
    categories: [12],
  },]


  export const preLoadProducts = async () => {
    try {
      const productRepository = conectionSource.getRepository(Product);
      const categoryRepository = conectionSource.getRepository(Category);
  
      const existingProducts = await productRepository.find();
      if (existingProducts.length) {
        console.log('Productos ya existen. No se cargan duplicados.');
        return;
      }
  
      for (const productData of productsToPreLoad) {
        // Buscar categorías por sus IDs
        const categories = await categoryRepository.findByIds(productData.categories);
  
        if (categories.length !== productData.categories.length) {
          console.warn(
            `Algunas categorías no se encontraron para el producto: ${productData.name}`
          );
        }
  
        // Crear y guardar el producto con las categorías asociadas
        const product = productRepository.create({
          ...productData,
          categories, // Asignar las categorías encontradas
        });
  
        await productRepository.save(product);
      }
  
      console.log('Productos precargados exitosamente.');
    } catch (error) {
      console.error('Error al precargar productos:', error);
    }
  };