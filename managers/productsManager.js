class ProductsManager{
	constructor(){
		this.productsCollection = [];
	}

	//Métodos

	getProducts = async() => {
		try{
			console.log('Obteniendo los porductos', this.productsCollection)
		}catch(err){
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
			//Agregar al arreglo
			this.productsCollection.push(newProduct);
			return newProduct;
			console.log('Agregando un producto', this.productsCollection)
		}catch(err){}
		
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