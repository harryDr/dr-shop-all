const Router = require('koa-router')
const router = new Router()
const tablet_name = "recommond_table"

router.get('/', async (ctx) => {  //查
    let result_json = {
        code: 0,
        data: {}
    }
    let query = `select * from ${tablet_name}`
    try {  //用来捕获sql语句是否异常
        result_json.data.list = await ctx.db.query(query);
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
    let {title, sort, image, link} = ctx.request.body
    let insert = `INSERT INTO ${tablet_name} (title, sort, image, link) VALUES (?,?,?,?)`
    try {  //用来捕获sql语句是否异常
        result_json.data = await ctx.db.query(insert,[title, sort, image, link]);
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
    let {title, sort, image, link} = ctx.request.body
    let updata = `UPDATE ${tablet_name} SET title=?, sort=?, image=?, link=? WHERE id=?`
    try {  //用来捕获sql语句是否异常
        result_json.data = await ctx.db.query(updata,[title, sort, image, link, id]);
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