const Router = require('koa-router')
const router = new Router()

router.get('/',async(ctx)=>{
    ctx.body='admin'
})
router.get('/user',async(ctx)=>{
    let sqlResult = await ctx.db.query('select * from users')
    ctx.body = sqlResult
})

module.exports = router.routes()