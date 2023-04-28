"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterController = void 0;
const environment_1 = require("./code/abstract/environment");
const out_1 = require("./code/salidas/out");
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
            out_1.outs.splice(0, out_1.outs.length);
            const Entorno_global = new environment_1.Environment(null);
            for (const inst of ast) {
                inst.execute(Entorno_global);
            }
            res.json({ consola: out_1.outs.join("\n"), errores: null });
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
