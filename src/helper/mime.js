/*
 * @Author: 李浩栋
 * @Begin: 2019-09-26 16:56:25
 * @Update: 2019-09-26 17:06:42
 * @Update log: 更新日志
 */

const path = require('path')
const mimeTypes = {
  'css': 'text/css',
  'gif': 'image/gif',
  'html': 'text/html',
  'ico': 'image/x-icon',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'js': 'application/javascript',
  'json': 'application/json',
  'pdf': 'application/pdf',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'swf': 'application/x-shockwave-flash',
  'tiff': 'image/tiff',
  'txt': 'text/plain',
  'wav': 'audio/x-wav',
  'wma': 'audio/x-ms-wma',
  'wmv': 'audio/x-ms-wmv',
  'xml': 'text/xml'
}


module.exports = (filePath) => {
  let ext = path.extname(filePath).split('.').pop().toLowerCase()

  if (!ext) {
    ext = filePath
  }

  return mimeTypes[ext] || mimeTypes['txt']
}
