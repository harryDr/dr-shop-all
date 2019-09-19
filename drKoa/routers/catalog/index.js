const Router = require('koa-router')
const router = new Router()

router.get('/',async(ctx)=>{
    let query = 'select * from banner_table'
    let result = await ctx.db.query(query)
    ctx.body=result
})

module.exports = router.routes()