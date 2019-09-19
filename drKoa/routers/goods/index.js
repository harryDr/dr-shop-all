const Router = require('koa-router')
const router = new Router()
const tablet_name = "goods_table"
const table_title = ['title','orgPrice','price','sale','href','link','type']

router.get('/', async (ctx) => {  //查
    let result_json = {
        code: 0,
        data: {}
    }
    let query = `select * from ${tablet_name}`
    try {  //用来捕获sql语句是否异常
        result_json.data = await ctx.db.query(query);
        result_json.code = 200;
    } catch (error) {
        result_json.code = -1;
        result_json.msg = error;
    }
    ctx.body = result_json
})


router.post('/add', async (ctx) => { //增
    let result_json = {
        code: 0,
        data: {}
    }
    let {title,orgPrice,price,sale,href,link,type} = ctx.request.body
    console.log(title,orgPrice,price,sale,href,link,type,ctx.request.body)
    let insert = `INSERT INTO ${tablet_name} (${table_title}) VALUES (?,?,?,?,?,?,?)`
    console.log(insert)
    try {  //用来捕获sql语句是否异常
        result_json.data = await ctx.db.query(insert,[title,orgPrice,price,sale,href,link,type]);
        result_json.code = 200;
    } catch (error) {
        result_json.code = -1;
        result_json.msg = error;
    }
    ctx.body = result_json
})

router.post('/modify/:id', async (ctx) => { //改
    let result_json = {
        code: 0,
        data: {}
    }
    let {id} = ctx.params
    let {title,orgPrice,price,sale,href,link,type} = ctx.request.body
    let updata = `UPDATE ${tablet_name} SET title=?, orgPrice=?,price=?,sale=?, href=?, link=?,type=? WHERE id=?`
    try {  //用来捕获sql语句是否异常
        result_json.data = await ctx.db.query(updata,[title,orgPrice,price,sale,href,link,type,id]);
        result_json.code = 200;
    } catch (error) {
        result_json.code = -1;
        result_json.msg = error;
    }
    ctx.body = result_json
})

router.post('/delete/:id', async (ctx) => { //删
    let result_json = {
        code: 0,
        data: {}
    }
    let {id} = ctx.params
    let deleteSql = `DELETE FROM ${tablet_name} WHERE id=?`
    try {  //用来捕获sql语句是否异常
        result_json.data = await ctx.db.query(deleteSql,[id]);
        result_json.code = 200;
    } catch (error) {
        result_json.code = -1;
        result_json.msg = error;
    }
    ctx.body = result_json
})

module.exports = router.routes()