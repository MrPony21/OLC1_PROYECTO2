"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterController = void 0;
const environment_1 = require("./code/abstract/environment");
class interpreteController {
    pong(req, res) {
        res.send("ESTE ES INTERPRETER CONTROLLER");
    }
    interpretar(req, res) {
        //parser
        var parser = require("./code/grammar/gramatica");
        const code = req.body.code;
        console.log(code);
        try {
            const ast = parser.parse(code);
            const Entorno_global = new environment_1.Environment(null);
            for (const inst of ast) {
                inst.execute(Entorno_global);
            }
            res.json({ consola: "ejecutado con exito", errores: null });
        }
        catch (err) {
            console.log(err);
            res.json({
                consola: err,
                errores: err,
            });
        }
    }
}
exports.InterController = new interpreteController();
