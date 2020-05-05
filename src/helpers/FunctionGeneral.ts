export function responseFunction(response: any, codigo: number, mensaje: string, data: object) {
    response.status(codigo).send({mensaje: mensaje, data: data, codigo: codigo});
}
export const status = {
    success: 200,
    error: 500,
    notfound: 404,
    unauthorized: 401,
    conflict: 409,
    created: 201,
    bad: 400,
    nocontent: 204,
    forbidden: 403,
    unprocesable: 422,
};
