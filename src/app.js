import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import viewsRouter from './routes/views.router.js';

const app = express();
const PORT = 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Carpeta Public
app.use(express.static(path.join(__dirname, 'public')))

//Config HBS
app.engine('handlebars', engine({
	extname:'.handlebars',
	defaultLayout:'main',
	layoutsDir:path.join(__dirname, './views/layouts'),
	partialsDir:path.join(__dirname,'./views/partials')
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

//Rutas
app.use('/', viewsRouter);
app.listen(PORT, ()=>{
	console.log(`On port ${ PORT }`)
});
