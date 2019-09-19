const Koa = require('koa')
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')
const fs = require('fs')
const path = require('path')
const static = require('koa-static')
const koaBody = require('koa-body')


const server = new Koa()
const router = new Router()

server.use(bodyparser()) //中间件解析post参数
// server.use(koaBody({
//     multipart: true,
//     formidable: { maxFieldsSize: 10 * 1024 * 1024 }
// }))  //文件传输


server.use(static(path.join(__dirname, './static'))) //静态资源

//全局错误中间件
server.use(async (ctx, next) => {
    try {
        await next()
    } catch (e) {
        ctx.throw(404, e)
    }
})

//引入sql 并注入到ctx中 全局使用
server.context.db = require('./lib/db/database')   //放在比较前面

router.use('/admin', require('./routers/admin'))
router.use('/user', require('./routers/user'))
router.use('/login', require('./routers/login'))
router.use('/banner', require('./routers/banner'))
router.use('/recommond', require('./routers/recommond'))
router.use('/goods', require('./routers/goods'))
router.use('/category', require('./routers/category'))
router.use('/subcategory', require('./routers/subcategory'))
router.use('/subcategoryDetail', require('./routers/subcategoryDetail'))

router.use('/catalog', require('./routers/catalog'))
router.use('/artical', require('./routers/artical'))

router.post('/upload', koaBody({
    multipart: true,
    formidable: { maxFieldsSize: 10 * 1024 * 1024 }
}), async ctx => {
    const file = ctx.request.files.file;
    const reader = fs.createReadStream(file.path);
    let filePath = __dirname + "/static/upload/";
    let fileResource = filePath + `/${file.name}`;
    if (!fs.existsSync(filePath)) {  //判断staic/upload文件夹是否存在，如果不存在就新建一个
        fs.mkdir(filePath, (err) => {
            if (err) {
                throw new Error(err)
            } else {
                let upstream = fs.createWriteStream(fileResource);
                reader.pipe(upstream);
                ctx.body = {
                    url: `http://localhost:3000/upload/${file.name}`
                }
            }
        })
    } else {
        let upstream = fs.createWriteStream(fileResource)
        reader.pipe(upstream);
        ctx.body = {
            url: `http://localhost:3000/upload/${file.name}` //返给前端一个url地址      
        }
    }

})

server.use(router.routes())

server.listen(3000, () => {
    console.log('listing port 3000');
})