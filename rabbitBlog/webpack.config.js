const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development'

function resolve (dir) {
  return path.join(__dirname, dir)
}

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/main.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname,'/node_modules'),
        include: path.resolve(__dirname,'/src'),
        options: {
          presets: ['env']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg|ttf|woff|woff2|eot)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name]-xbx.[ext]?[hash]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      //JS代码可以通过process.env.NODE_ENV获取当前环境
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
      // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new htmlWebpackPlugin({
      title: '兔子博客', //网页标题
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      filename: 'index.html',// 输出文件名
      template: 'index.html',// 模板文件
      inject: true // 自动将打包的bundle.js 引入到index.html
    })
  ]
}
//开发环境配置
if(isDev){
  config.module.rules.push(
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
          options: {
            prependData: `@import "@/assets/styles/global.scss";`
          }
        }
      ]
    }
  )
  config.devtool = '#cheap-module-eval-source-map' //可在浏览器中对源代码进行调试
  config.devServer = {
    port: 8080,// 端口
    host: '0.0.0.0',// 域名
    overlay: {
      errors: true // 报错会提示到页面上
    },
    // 服务启动后自动打开浏览器
    // open: true
    hot: true, //热更新
    proxy: {
      '/api': {
        target: 'http://localhost:8088',
        changeOrigin: true,
        pathRewrite: {'^/api': ''}
      }
    }
  },
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  //区分打包类库代码
  config.entry = {
    app: path.join(__dirname, 'src/main.js'),
    vendors: ['vue','vue-router']
  }
  config.optimization = {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: "vendors",
          chunks: "initial",
          minChunks: 2
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
          options: {
            prependData: `@import "@/assets/styles/global.scss";`
          }
        }
      ]
    }
  )
  config.plugins.push(
    //将所有scss文件单独打包成css文件 减少bundle.js中javascript引入样式的代码体积
    new MiniCssExtractPlugin({
      // filename: 'styles.[md5:contenthash:hex:8].css',
      filename: 'css/main.css'
    })
  )
}

module.exports = config