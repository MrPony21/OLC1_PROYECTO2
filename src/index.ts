import express from 'express';
import router from './routes/interprete';

const app = express();
app.use(express.json());
const PORT = 5000;
/*
app.get('/ping',(req,res)=>{
    console.log('compilador 1');
    res.send('compi2');
});*/

app.use('/interprete', router);

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})