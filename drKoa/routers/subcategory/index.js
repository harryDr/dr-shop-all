const Router = require('koa-router')
const router = new Router()
const tablet_name = "subcategroy_table"

router.get('/', async (ctx) => {  //查
    let result_json = {
        code: 0,
        data: {}
    }
    let {maitKey_id} = ctx.query
    let query = ""
    if(maitKey_id == undefined){
        query = `select * from ${tablet_name}`
    }else{
        query = `select * from ${tablet_name} where maitKey_id=${maitKey_id}`
    }
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
    let {img,link,title, sort, maitKey_id} = ctx.request.body
    let insert = `INSERT INTO ${tablet_name} (img,link,title, sort, maitKey_id) VALUES (?,?,?,?,?)`
    try {  //用来捕获sql语句是否异常
        result_json.data = await ctx.db.query(insert,[img,link,title, sort, maitKey_id]);
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
    let {img,link,title, sort, maitKey_id} = ctx.request.body
    let updata = `UPDATE ${tablet_name} SET img=?, link=?, title=?, sort=?, maitKey_id=? WHERE id=?`
    try {  //用来捕获sql语句是否异常
        result_json.data = await ctx.db.query(updata,[img,link,title, sort, maitKey_id, id]);
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