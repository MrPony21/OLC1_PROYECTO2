import { Type } from "../abstract/Tipo_primitivo";

export const TSuma = [
    [Type.INT, Type.DOUBLE, Type.INT, Type.INT, Type.STRING],
    [Type.DOUBLE, Type. DOUBLE, Type.DOUBLE, Type.DOUBLE, Type.STRING],
    [Type.INT, Type.DOUBLE, Type.NULL, Type.NULL, Type.STRING],
    [Type.INT, Type.DOUBLE, Type.NULL, Type.STRING, Type.STRING],
    [Type.STRING, Type.STRING, Type.STRING, Type.STRING, Type.STRING]
]


export const TResta = [
    [Type.INT, Type.DOUBLE, Type.INT, Type.INT, Type.NULL],
    [Type.DOUBLE, Type.DOUBLE, Type.DOUBLE, Type.DOUBLE, Type.NULL],
    [Type.INT, Type.DOUBLE, Type.NULL, Type.NULL, Type.NULL],
    [Type.INT, Type.DOUBLE, Type.NULL, Type.NULL, Type.NULL],
    [Type.NULL,Type.NULL,Type.NULL,Type.NULL,Type.NULL]
]


export const TMultiplicacion = [
    [Type.INT, Type.DOUBLE, Type.NULL, Type.INT, Type.NULL],
    [Type.DOUBLE, Type.DOUBLE, Type.NULL, Type.DOUBLE, Type.NULL],
    [Type.NULL,Type.NULL,Type.NULL,Type.NULL,Type.NULL],
    [Type.INT, Type.DOUBLE, Type.NULL, Type.NULL, Type.NULL],
    [Type.NULL,Type.NULL,Type.NULL,Type.NULL,Type.NULL]
]


export const TDivision = [
    [Type.DOUBLE, Type.DOUBLE, Type.NULL, Type.DOUBLE, Type.NULL],
    [Type.DOUBLE, Type.DOUBLE, Type.NULL, Type.DOUBLE, Type.NULL],
    [Type.NULL, Type.NULL, Type.NULL, Type.NULL, Type.NULL],
    [Type.DOUBLE, Type.DOUBLE, Type.NULL, Type.NULL, Type.NULL],
    [Type.NULL, Type.NULL, Type.NULL, Type.NULL, Type.NULL]
]


export const TPotencia = [
    [Type.INT, Type.DOUBLE, Type.NULL, Type.NULL, Type.NULL],
    [Type.DOUBLE, Type.DOUBLE, Type.NULL, Type.NULL, Type.NULL],
    [Type.NULL, Type.NULL, Type.NULL, Type.NULL, Type.NULL],
    [Type.NULL, Type.NULL, Type.NULL, Type.NULL, Type.NULL],
    [Type.NULL, Type.NULL, Type.NULL, Type.NULL, Type.NULL]
]


export const TModulo = [
    [Type.DOUBLE, Type.DOUBLE, Type.NULL, Type.NULL, Type.NULL],
    [Type.DOUBLE, Type.DOUBLE, Type.NULL, Type.NULL, Type.NULL],
    [Type.NULL, Type.NULL, Type.NULL, Type.NULL, Type.NULL],
    [Type.NULL, Type.NULL, Type.NULL, Type.NULL, Type.NULL],
    [Type.NULL, Type.NULL, Type.NULL, Type.NULL, Type.NULL]
]

