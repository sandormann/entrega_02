import { Router } from 'express';
const cartRouter = Router();

let cartCollection = [];

//Listar carrito
cartRouter.get('/', (req,res)=>{
	res.status(200).json({status: 'success', cartCollection });
});
export default cartRouter;
//Agregar un carrito
// export 