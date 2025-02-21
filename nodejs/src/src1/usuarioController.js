async function connect() {
    if (global.connection && global.connection.state != 'disconnect'){
        return global.connection;
    }
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection(
        {
            host: '54.91.193.137', user: 'libertas', password: '123456', database: 'libertas5per'
        }
    );
    global.connection = connection;
    return connection;
}

exports.post = async (req, res, next) => {
    const conn = await connect();
    const sql = "INSERT INTO usuario " + "(nome, telefone, email, senha) " + "VALUES (?,?,?,?)";
    const values = [req.body.nome, req.body.telefone, req.body.email, req.body.senha];
    await conn.query(sql, values);
    res.status(201).send("ok");
}
exports.put = async (req, res, next) => {
    const conn = await connect();
    const sql = "UPDATE usuario " + "SET nome = ?, telefone = ?, email = ?, senha = ? " + "WHERE idusuario = ?" ;
    const values = [req.body.nome, req.body.telefone, req.body.email, req.body.senha];
    await conn.query(sql, values);
    res.status(201).send("ok");
}
exports.delete = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send("rota delete " + id);
}
exports.get = async (req, res, next) => {
    const conn = await connect();
    const [row] = await conn.query("select * from usuario");
    res.status(200).send(row);
}
exports.getById = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send("rota getById " + id);
}