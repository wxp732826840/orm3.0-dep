const path = require('path');//引入path模块
function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}


module.exports={
   
    chainWebpack: config => {
        config.resolve.alias
          .set('@', resolve('src'))
          .set('assets', resolve('src/assets'))
          .set('components', resolve('src/components'))
          .set('views', resolve('src/views'))
      },
      // 基本路径
    publicPath:"./",
    // 输出文件目录
    outputDir: 'orm'

}