"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const interprete_1 = __importDefault(require("./routes/interprete"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const allowedOrigins = ['http://127.0.0.1:5500'];
const options = {
    origin: allowedOrigins
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
const PORT = 3000;
/*
app.get('/ping',(req,res)=>{
    console.log('compilador 1');
    res.send('compi2');
});*/
app.use('/interprete', interprete_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
