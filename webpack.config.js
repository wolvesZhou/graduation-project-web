//引入各种插件
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin =require('copy-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//const ProgressBarPlugin = require('progress-bar-webpack-plugin');
//const NyanProgressPlugin = require('nyan-progress-webpack-plugin');

//路径
const output_path = path.join(__dirname, 'dist');
const node_dir=path.join(__dirname,'/node_modules');
const plugins_dir = path.join(__dirname + '/src/plugins');
const core_dir = path.join(__dirname+'/src/core');


//DEV 用来区分发布版本还是测试版本
const DEV = process.env.NODE_ENV !== 'production';

//package.json中scripts提供的参数
const dist = process.env.NODE_TITLE || 'dist';
const title=process.env.NODE_TITLE || 'yeeshock';
const address=process.env.NODE_ADDRESS || 'yeeshock.com:5678';
const port = process.env.NODE_PORT || 7000;
const map =process.env.NODE_MAP==undefined?(process.env.NODE_ENV !=='production'):(process.env.NODE_MAP=='true')

// multiple extract instances
const extractCSS = new ExtractTextPlugin('[name].css');


//webpack 共有的配置
const config={

    devtool:'source-map',

    performance: { hints: false},

    //请求重定向，在页面中使用这些，避免繁琐的搜索，只需在指定的目录下搜索，也可以在这导入css
    resolve: {
        alias: {
            jquery:path.join(node_dir,'jquery'),
            // inputmask:path.join(node_dir,'jquery.inputmask/dist/jquery.inputmask.bundle.js'),
            jqGrid:node_dir+'/jqGrid/js/jquery.jqGrid.js',
            jqGridAddOne:node_dir+"/jqGrid/js/grid.formedit.js",
            //jqGridUIAddOne:node_dir+"/jqGrid/js/grid.jqueryui.js",
            jqTreeeGrid:node_dir+"/jqGrid/js/grid.treegrid.js",
            jqGridFilter:node_dir+"/jqGrid/js/grid.filter.js",
            jqGridLang:node_dir+'/jqGrid/js/i18n/grid.locale-cn.js',
            _:node_dir+'/underscore',
            bootstrap: plugins_dir + '/js/bootstrap.min.js',

            filepicker:plugins_dir+"/css/filepicker.css",
            select2:plugins_dir+"/css/select2-bootstrap.min.css",
            jqgridui:plugins_dir+"/css/ui.jqgrid-bootstrap-ui.css",
            jqgridcss:plugins_dir+"/css/ui.jqgrid-bootstrap.css",
            jqueryui:plugins_dir+"/css/jquery-ui.css",
            jqgriduicss:plugins_dir+'/css/ui.jqgrid-bootstrap-ui.css',
            skins:plugins_dir+"/css/_all-skins.min.css",
            AdminLTE:plugins_dir+"/css/AdminLTE.min.css",
            ionicons:plugins_dir+"/css/ionicons.min.css",
            awesome:plugins_dir+"/css/font-awesome.min.css",
            bootstrapcss:plugins_dir+"/css/bootstrap.min.css",

            layout:plugins_dir+"/css/compiled/layout.css",
            elements:plugins_dir+"/css/compiled/elements.css",
            icons:plugins_dir+"/css/compiled/icons.css",
            signin:plugins_dir+"/css/compiled/signin.css",
            compIndex:plugins_dir+'/css/compiled/index.css',

        },
        extensions: ['.js', '.jsx']  //自动补全后缀名，引用时就不需要再写后缀名，注意webpack2第一个不能为空字符串
    },

    //入口文件，把jquery等第三方插件打包进[name].bundle.js文件，所以index.html文件不需要引用其他js文件,也可以导入resolve里标明的css文件
    //但请注意顺序，可能存在css样式覆盖的问题
    entry: {
        //vendor:[],
        main: [
            // 'inputmask',
            'layout',
            'elements',
            'icons',
            'signin',
            'bootstrap',
            'jqGrid',
            'jqGridAddOne',
            //'jqGridUIAddOne',
            'jqTreeeGrid',
            'jqGridFilter',
            'jqGridLang',


            'bootstrapcss',
            'awesome',
            'ionicons',
            'AdminLTE',
            'skins',
            'jqgriduicss',
            'jqueryui',
            'jqgridcss',
            'jqgridui',
            'select2',
            'filepicker',
            './src/app.js'
        ]
    },

    //模块加载
    module: {
        loaders: [
            {
                test: /\.js(x)?$/,
                loaders: ['babel-loader?compact=false'],//compact=false解决打包文件超过100kb问题，设置在babelrc文件中
                exclude: /node_modules/,
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            //加载图片文件，并指定路径
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
                loader: "url-loader?limit=10000&name=fonts/[name].[ext]",
            },
            // {
            //     test: require.resolve('jquery'),
            //     loader: 'expose?$!expose?jQuery'
            // },
        ],
        //noParse: [/jqGrid/]
    },

    //优化插件
    plugins: [
        //把jquery暴露到全局,相当于每个模块都能得到jquery及其对应的别名，而不需要自己引用
        //Rebus,Q等同理。
        new webpack.ProvidePlugin({
            '$': "jquery",
            'jQuery':'jquery',
            // 'Rebus':'Rebus',
            // 'Q':'Q',
            '_':'_',
            // 'store':'store',
            // 'CONST':'CONST'
        }),

        //提供html镜像文件，使用现有的html文件,inject表示打包好的文件插入在html的何处。
        //关于设置的变量title和address，可在package.json中实现更改，这些变量可在html文件里作用到
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            inject:true,
            // title:title,
            // address:address,
            // // 如果有多个入口文件，则可以对他们进行排序
            // chunksSortMode: function (a, b) {
            //     if (a.names[0] > b.names[0]) {
            //         return 1;
            //     }
            //     if (a.names[0] < b.names[0]) {
            //         return -1;
            //     }
            //     return 0;
            // }
        }),

        //将单个文件或整个目录复制到生成目录。
        // new CopyWebpackPlugin([
        //         {from: './src/plugins/pace/themes/blue/pace-theme-loading-bar.css', to:'pace/pace-theme-loading-bar.css'},
        //         {from:'./src/plugins/pace/pace.min.js',to: 'pace/pace.min.js'},
        //         {from: './src/plugins/img/user2-160x160.jpg',to:'img/user2-160x160.jpg'}
        //     ]
        // ),

        //使progress按百分比显示
        // new webpack.ProgressPlugin(function handler(percentage, msg) {
        //     var p = Math.floor(percentage * 100);
        //     if (config.percent !== p) {
        //         config.percent = p;
        //         console.log(msg, config.percent + '%');
        //     }
        // }),

        ////提取公共模块
        //new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'}),


        // new ProgressBarPlugin({
        //     format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
        //     clear: true,
        //
        // }),
        // new NyanProgressPlugin({
        //     //restoreCursorPosition:true
        //     hookStdout:false
        // }),

    ],
}

if (!map){
    config.devtool='',
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false,
                },
            })
        )
}

if (DEV){

    //实现热启动,express和webpack/hot/dev-server,现在只是webpack起的服务，用了only-dev-server
    config.entry.main.unshift('react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:'+port,
        'webpack/hot/only-dev-server');

    //把css内敛到js文件中了，可以实现热交替
    config.module.loaders.push(
        {
            test: /\.(css)$/,
            loaders: ['style-loader', 'css-loader']
        }
    );

    // config.plugins.push(
    //     new webpack.NamedModulesPlugin()
    // )

    //添加HMR插件
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    )

    //当你修改你的代码后，hot：true它会自动帮你刷新浏览器，可以设置端口port
    config.devServer={
        host:'0.0.0.0',
        port:port,
        //contentPath:dist,
        hot: true,
        historyApiFallback: true,
    }
}

else{

    config.output={
        path: path.join(__dirname, dist),
        filename: '[name].bundle.js',
        //publicPath: '/dist'
    };

    //压缩css文件
    config.plugins.push(
        new webpack.LoaderOptionsPlugin({
            test: /\.(css)$/,
            minimize:true
        })
    )

    config.module.loaders.push(
        {
            test: /\.(css)$/,
            loader: extractCSS.extract(['css']),
        }
    )

    //将引入到的css都打包进[name].css文件
    config.plugins.push(
        extractCSS
    )

    //防止出现warning
    config.plugins.push(
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    )

}

module.exports = config;





