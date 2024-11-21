import { conectionSource } from "src/config/typeorm";
import ICategory from "src/interfaces/ICategory";
import { Category } from "src/modules/products/categorys.entity";



const cateogoryesToLoad:ICategory[] = [
    {name: 'Electrónica' },
    {name: 'Audio' },
    {name: 'Accesorios de PC' },
    {name: 'Muebles de Oficina' },
    {name: 'Fotografía' },
    {name: 'Videojuegos' },
    {name: 'Wearables' },
    {name: 'Televisores' },
    {name: 'Parlantes' },
    {name: 'Impresoras' },
    {name: 'Cargadores y Adaptadores' },
    {name: 'Hogar' },
]
export const preLoadCategorys = async () =>{
    try {
        
        const categorys = await conectionSource.getRepository(Category).find()
        if (!categorys.length)
            await conectionSource.createQueryBuilder()
        .insert()
        .into(Category)
        .values(cateogoryesToLoad)
        .execute();
        console.log("Categorys preloaded");
    } catch (error) {
     console.error('error al preCargar categorys', error)   
    }
}