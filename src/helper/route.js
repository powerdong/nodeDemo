/*
 * @Author: 李浩栋
 * @Begin: 2019-09-26 15:13:09
 * @Update: 2019-09-26 17:04:30
 * @Update log: 更新日志
 */
// 使用异步
const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const config = require('../config/defaultConfig')
const tplPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(tplPath)
const mime = require('./mime')
const template = Handlebars.compile(source.toString())

module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath)
    // 判断是不是文件
    if (stats.isFile()) {
      const contentType = mime(filePath)
      // 设置成功的状态码
      res.statusCode = 200
      res.setHeader('Content-Type', contentType)
      // 读文件，通过流的形式一点一点的吐给客户端
      fs.createReadStream(filePath).pipe(res)
    } else if (stats.isDirectory()) {
      // 判断是文件夹
      const files = await readdir(filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      const dir = path.relative(config.root, filePath)
      const data = {
        title: path.basename(filePath),
        // relative 取一个路径相对另一个路径的相对地址
        dir: dir ? `/${dir}` : '',
        files: files.map(file => {
          return {
            file,
            icon: mime(file)
          }
        })
      }
      // 通过','隔开，告诉里面的文件名是什么
      res.end(template(data))
    }
  } catch (ex) {
    console.log(ex)
    // 设置失败的状态码
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(`${filePath} is not a directory or file`)
  }
}
