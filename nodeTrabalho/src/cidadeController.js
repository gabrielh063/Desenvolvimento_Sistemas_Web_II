async function connect() {
    if (global.connection && global.connection.state != 'disconnect'){
        return global.connection;
    }
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection(
        {
            host: '127.0.0.1', user: 'root', password: '', database: 'cidades'
        }
    );
    global.connection = connection;
    return connection;
}

exports.post = async (req, res, next) => {
    const conn = await connect();
    const sql = "INSERT INTO cidades " + "(nomeCidade, uf, populacao, anoFundacao) " + "VALUES (?,?,?,?)";
    const values = [req.body.nome, req.body.telefone, req.body.email, req.body.senha];
    await conn.query(sql, values);
    res.status(201).send("ok");
}
exports.put = async (req, res, next) => {
    let id = req.params.id;
    const conn = await connect();
    const sql = "UPDATE cidades " + "SET nomeCidade = ?, uf = ?, populacao = ?, anoFundacao = ? " + "WHERE idCidade = ?" ;
    const values = [req.body.nome, req.body.telefone, req.body.email, req.body.senha, id];
    await conn.query(sql, values);
    res.status(201).send("ok");
}
exports.delete = async (req, res, next) => {
    let id = req.params.id;
    const conn = await connect();
    const sql = "DELETE FROM cidades WHERE idCidade = ? ";
    const values = [id];
    await conn.query(sql, values);
    res.status(200).send("ok");
}
exports.get = async (req, res, next) => {
    const conn = await connect();
    const [row] = await conn.query("select * from cidades");
    res.status(200).send(row);
}
exports.getById = async (req, res, next) => {
    let id = req.params.id;
    const conn = await connect();
    const sql = ("SELECT * FROM cidades WHERE idCidades = ?");
    const values = [id];
    let [row] = await conn.query(sql, values); 
    if(row.length == 0){
        res.status(404).send("ERROR 404 NOT FOUND");
    } else{     
        res.status(200).send(row[0]);
    }
}