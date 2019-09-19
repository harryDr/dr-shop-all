const mysql = require('mysql')
const co = require('co-mysql')

let conn = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '123123',
    database : 'db_blog'
})

module.exports = co(conn)