const homedir = require('os').homedir()
const home = process.env.HOME || homedir
const fs = require('fs')
const path = require('path')
const dbPath = path.join(home, '.todo')

const db = {
  read(path = dbPath) {
    // 读取文件这个操作是异步的，所以不能直接return，要用promise
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: 'a+' }, (err, data) => {
        // 如果出错则reject抛出错误
        if (err) return reject(err)
        let list
        try {
          list = JSON.parse(data.toString())
        } catch (error2) {
          list = []
        }
        // 由于返回list是在异步中，所以这里要用resolve把list返回
        resolve(list)
      })
    })

  },
  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(list)
      fs.writeFile(path, string + '\n', (error) => {
        if (error) return reject(error)
        resolve()
      })
    })

  }
}
// node.js 的导出方法
module.exports = db