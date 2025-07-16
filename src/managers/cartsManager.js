import fs from 'fs';

class CartsManager{
	constructor(){
		this.cartsCollection = [];
		this.path = './src/db/carritos.json';
	}
	//Métodos

	getCarts = async() => {
		try{
			const carts = await fs.promises.readFile(this.path, 'utf-8');
			const cartsList = JSON.parse(carts);
			console.log('Lista de carritos', cartsList);
			return cartsList;
		}catch(error){
			console.log('No se pudo obtener la lista de carritos', error.message);
			await fs.promises.writeFile(this.path, JSON.stringify([]))
			return [];
		}
		
	}

	getCartById = async(cid)=> {
		try{
			const carts = await this.getCarts();
			const cart = carts.find(c => c.cid === parseInt(cid));
			//Validación
			if(!cart){ 
				res.status(404).json({
					status:"Error",
					msg:"Carrito no encontrado"
				});
			}

			console.log('Carrito encontrado', cart)
			return cart;
			
		}catch(error){
			console.log('Carrito no encontrado',error);
		}
	}
	addCart = async(newCart) => {
		try{
			const carts = await this.getCarts();

			const nextId = carts.length > 0 ? Math.max(...carts.map(c => c.cid)) + 1 : 1;
			newCart.cid = nextId;

			carts.push(newCart);
			await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
			console.log('Agregando un carrito', typ); 
			return newCart;
		}catch(error){
			console.log('No se pudo crear el carrito', error.message);
		}
	}
}

export default CartsManager;