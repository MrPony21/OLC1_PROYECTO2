import express from 'express';
import router from './routes/interprete';
import cors from 'cors';

const app = express();

const allowedOrigins = ['http://127.0.0.1:5500']

const options: cors.CorsOptions = {
    origin: allowedOrigins
}

app.use(cors(options));
app.use(express.json());

const PORT = 3000;
/*
app.get('/ping',(req,res)=>{
    console.log('compilador 1');
    res.send('compi2');
});*/

app.use('/interprete', router);

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})