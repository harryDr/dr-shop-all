const Router = require('koa-router')
const router = new Router()

router.get('/',async(ctx)=>{
    ctx.body='user'
})

module.exports = router.routes()