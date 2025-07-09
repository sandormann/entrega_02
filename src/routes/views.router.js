import { Router } from 'express';
const viewsRouter = Router();

viewsRouter.get('/',(req, res) => {
	res.render('products', { 
		link1: 'Productos', 
		link2:'Formulario' 
	});
});
viewsRouter.get('/form',(req, res) => {
	res.render('form', { 
		link1: 'Productos', 
		link2:'Formulario' 
	});
});
export default viewsRouter;