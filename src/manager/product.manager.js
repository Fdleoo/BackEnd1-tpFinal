import ProductModel from "../models/product.model.js";

class ProductManager{
    async addProduct({title, description, price, img, code, stock, category, thumbnails}) {
        try{
            if (!title || !description || !price || !img || !code || !stock || !category || !thumbnails){
                console.log("Rellene todos los campos porfavor");
                return;
            }

            const productExist = await ProductModel.findOne({ code: code});

            if (productExist){
                console.log("El codigo no se puede repetir");
                return;
            }

            const newProduct = new ProductModel({
                title,
                description,
                price,
                img,
                code,
                stock,
                category,
                status: true,
                thumbnails: thumbnails || []
            });

            console.log("Producto guardado con exito, yeyyy")
            await newProduct.save();
        }catch(error){
            console.log("Error al intentar agregar un producto :(", error);
            throw error;
        }
    }

    async getProducts({ limit = 10, page = 1, sort, query } = {}){
        try {
            const skip = (page - 1) * limit;
            let queryOptions = {};

            if (query){
                queryOptions = { category: query};
            }

            const sortOptions = {};
            if (sort){
                if (sort === "asc" || sort === "desc"){
                    sortOptions.price = sort === "asc" ? 1 : -1;
                }
            }
            const productos = await ProductModel
                .find(queryOptions)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit)

            const totalProducts = await ProductModel.countDocuments(queryOptions);
            const totalPages = Math.ceil(totalProducts / limit);
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;

            return {
                docs: productos,
                totalPages,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
                nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
            };
        } catch (error) {
            console.log("Error al obtener los productos", error)
            throw error;
        }
    }

    async getProductById(id){
        try {
            const product = await ProductModel.findById(id);
            if(!product){
                console.log('No pudimos encontrar el producto solicitado')
                return null;
            }
            console.log("Producto encontrado");
            return product;
        } catch (error) {
            console.log('Error al buscar producto por id')
        }
    }
    async updateProductById(id, productoActualizado){
        try {
            const actualizado = await ProductModel.findByIdAndUpdate(id, productoActualizado)
            if (!actualizado){
                console.log('No se encontro el producto')
                return null;
            }
            console.log("Producto actualizado correctamente");
            return actualizado;
        } catch (error) {
            console.log("Error al intentar actualizar el producto", error)
            throw error; 
        }
    }
}

export default ProductManager;