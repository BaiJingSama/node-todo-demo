#! /usr/bin/env node

const program = require('commander')
const api = require('./index.js')
const pkg = require('./package.json')

// option声明命令行有哪些选项
program
  .version(pkg.version)

program
  .command('add')
  .description('add a task')
  .action((...args)=>{
    const words = args.slice(0,-1).join(' ')
    api.add(words).then(
      ()=>console.log('任务添加成功'),
      ()=>console.log('任务添加失败')
    )
  })

program
  .command('clear')
  .description('clear all tasks')
  .action(()=>{
    api.clear().then(
      ()=>console.log('任务清除成功'),
      ()=>console.log('任务清除失败')
    )
  })


program.parse(process.argv)

if(process.argv.length === 2){
  // 说明用户直接运行 node cli.js
  api.showAll()
}
