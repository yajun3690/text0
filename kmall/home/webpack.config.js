
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const publicPath = "/";
// const getHtmlConfig=name=>{
//     template:'./src/view/'+name+'.html',//模板文件
//     filename:name+'.html',//输出的文件名
//     inject:true,//脚本写在那个标签里,默认是true(在body结束后)
//     hash:true,//给生成的js/css文件添加一个唯一的hash
//     chunks:['common',name]	
// }

module.exports = {
	//指定打包环境
	mode:'development',
	// mode:'production',
	//指定入口
	//单入口写法一
	entry:{
		//chunk名称:文件路径
		'index':'./src/pages/index/index.js',		
		'common':'./src/pages/common/index.js',		
		'user-login':'./src/pages/user-login/index.js',		
	},
	//单入口写法二
	//entry: './src/index.js',
	//指定出口
	output: {
		//出口文件名称
		filename: 'js/[name].[hash].bundle.js',
		//输出路径
		publicPath:publicPath,
		//出口的文件所在的目录
		path: path.resolve(__dirname, 'dist')
	},
	//配置文件简化目录
	resolve:{
        alias:{
            pages:path.resolve(__dirname,'./src/pages'),
            util:path.resolve(__dirname,'./src/util'),
            api:path.resolve(__dirname,'./src/api'),
            common:path.resolve(__dirname,'./src/common')
        }
	},
	module: {
		rules: [
		//处理css文件
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
						}
					},
					"css-loader"
				]
			},
	    //处理图片 
			{
				test: /\.(png|jpg|gif|jpeg)$/i,
				use: [
			  		{
			    		loader: 'url-loader',
			    		options: {
			      			limit: 100
			    		}
			  		}
				]
			},
		//babel	
			{
			    test:/\.js$/,
			    exclude: /(node_modules)/,
			    use: {
			        loader: 'babel-loader',
			        options: {
			            presets: ['env','es2015','stage-3'],
			        }
			    }               
			}							
		]
	},
	plugins:[
		// new htmlWebpackPlugin(getHtmlConfig('index')),
		// new htmlWebpackPlugin(getHtmlConfig('user-login')),
	    new htmlWebpackPlugin({
	        template:'./src/view/index.html',//模板文件
	        filename:'index.html',//输出的文件名
	        inject:true,//脚本写在那个标签里,默认是true(在body结束后)
	        hash:true,//给生成的js/css文件添加一个唯一的hash
	        chunks:['common','index']
	    }),
	    new htmlWebpackPlugin({
	        template:'./src/view/user-login.html',//模板文件
	        filename:'user-login.html',//输出的文件名
	        inject:true,//脚本写在那个标签里,默认是true(在body结束后)
	        hash:true,//给生成的js/css文件添加一个唯一的hash
	        chunks:['common','user-login']
	    }),
	    new CleanWebpackPlugin(),
	    new MiniCssExtractPlugin({})
	],
	devServer:{
		contentBase: './dist',//内容的目录
		port:3002,//服务运行的端口
	}			
};