const webpack = require('webpack');
module.exports = {
	// __dirname是node.js的一个全局变量，它指向当前执行脚本所在目录
	entry: {
		bundle: __dirname + '/src/index.js',
		vendor: ['react', 'react-dom', 'redux', 'react-redux', 'redux-thunk', 'react-particles-js', 'material-ui', 'react-virtualized']
	}, //web入口文件
	output: {
		path: __dirname + '/build',  //打包后js存放的地方
		filename: '[name].js'	//打包后js的名称
	},
	module: {
		// loaders加载器
		loaders: [
			{
				test: /\.(js|jsx)$/, //用于匹配loaders所处理的文件的拓展名的正则表达式，这里匹配js和jsx(必须)
				exclude: /node_modules/, //屏蔽不需要处理的文件或文件夹(可选)
				loader: 'babel-loader'  //loader的名称(必须)
			},
			{
		      	test: /\.css$/,
		      	loader: "style-loader!css-loader?modules&localIdentName=[name]__[local]--[hash:base64:5]"
		    },
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	},

	devServer: {
		host:'0.0.0.0',
		disableHostCheck: true,
		contentBase: './build',
		port: 8080
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(), //热模块替换插件
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.UglifyJsPlugin({
		    // 最紧凑的输出
		    beautify: false,
		    // 删除所有的注释 true为显示注释
		    comments: false,
		    compress: {
		      	// 在UglifyJs删除没有用到的代码时不输出警告
				warnings: false,
				// 删除所有的 `console` 语句
				// 还可以兼容ie浏览器
				drop_console: true,
				// 内嵌定义了但是只用到一次的变量
				collapse_vars: true,
				// 提取出出现多次但是没有定义成变量去引用的静态值
				reduce_vars: true,
		    }
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: ["vendor", 'manifest'],
			minChunks: Infinity
		})
	]
}
