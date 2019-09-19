const Router = require('koa-router')
const router = new Router()

router.get('/regin', async (ctx) => { //登录
    ctx.body = '123'
})

router.post('/regin', async (ctx) => {  //注册
    let { user, password } = ctx.request.body
    let result_json = {
        code: 0,
        data: {}
    }
    let querySql = 'select * from users where user=? and password=?'
    let temp = await ctx.db.query(querySql, [user, password])
    if (temp.length === 0) {
        let insertSql = "insert into users (user,password) value (?,?)"
        try {  //用来捕获sql语句是否异常
            result_json.data = await ctx.db.query(insertSql, [user, password]);
            result_json.code = 200;
        } catch (error) {
            result_json.code = -1;
            result_json.msg = error;
        }
    } else {
        result_json.code = -1;
        result_json.msg = '数据已存在'
    }
    ctx.body = result_json
})


router.post('/login', async (ctx) => { //登录
    let { user, password } = ctx.request.body
    let result_json = {
        code: 0,
        data: {}
    }
    let querySql = 'select * from users where user=? and password=?'
    try {  //用来捕获sql语句是否异常
        let result = await ctx.db.query(querySql, [user, password]);
        if (result.length == 0) { //错误
            result_json.code = -1;
            result_json.msg = "账号或者密码错误";
        } else {
            result_json.code = 200;
        }
    } catch (error) {
        result_json.code = -1;
        result_json.msg = error;
    }
    ctx.body = result_json
})


module.exports = router.routes()