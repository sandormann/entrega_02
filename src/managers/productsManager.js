import fs from 'fs';

class ProductsManager{
	constructor(){
		this.productsCollection = [];
		this.path = './src/db/productos.json';
	}

	//Métodos

	getProducts = async() => {
		try{
			const productsList = await fs.promises.readFile(this.path, 'utf-8')
			return JSON.parse(productsList);
			console.log('Lista de productos',productsList)
		}catch(err){
			console.log('No se pudo obtener la lista de productos');
			await fs.promises.writeFile(this.path, JSON.stringify([]))
			return [];
		}
	}

	getProductById = async(pid)=> {
		const product = this.productsCollection.find(p => p.pid === parseInt(pid))
		console.log('Producto encontrado', product)
	}
	deleteProduct = async(pid)=> {
		//Filtrar para mostrar el arreglo para mostrarlo sin el elemento
		this.productsCollection = this.productsCollection.filter(p => p.pid !== parseInt(pid));
		console.log('Producto eliminado', pid);
	}
	addProduct = async(newProduct) => {
		try{
			const products = await this.getProducts();
			//Agregar al arreglo
			products.push(newProduct);
			await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
			console.log('Agregando un producto', products)
			return newProduct;
		}catch(error){
			console.log('No se pudo agregar el producto', error.message);
			throw error;
		}		
	}
	updateProduct = async(pid, updatedFields) => {
		const product = this.productsCollection.find(u => u.pid === parseInt(pid))
		if(!product){
			console.log('Producto no actualizado', pid);
			return null;	
		}else{
			console.log('Producto actualizado', pid);		
		}
		const {
		    title,
		    description,
		    code,
		    price,
		    status,
		    stock,
		    category,
		    thumbnails
		} = updatedFields;

		//actualizar los datos
		product.title = title || product.title
		product.description = description || product.description
		product.code = code || product.code
		product.price = price || product.price
		product.status = status || product.status
		product.stock = stock || product.stock
		product.category = category || product.category
		product.thumbnails = thumbnails || product.thumbnails

		return product;
	}
}

export default ProductsManager;