/*
 * @Author: 李浩栋
 * @Begin: 2019-09-26 14:34:35
 * @Update: 2019-09-26 15:15:24
 * @Update log: 更新日志
 */
const http = require('http')
const chalk = require('chalk')
const conf = require('./config/defaultConfig')
const path = require('path')
const route = require('./helper/route')

const server = http.createServer((req, res) => {
  // 返回文件请求路径
  const filePath = path.join(conf.root, req.url)

  route(req, res, filePath)
})

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`;
  console.info(`Server started at ${chalk.green(addr)}`);

})
