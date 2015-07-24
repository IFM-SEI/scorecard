var path = require('path');
var webpack =  require('webpack');
var app_dir  = path.join(__dirname, 'app');

module.exports = {
  entry: ["./app/app.jsx"],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  
  resolve: { fallback: path.join(__dirname, "node_modules") },
  resolveLoader: { fallback: path.join(__dirname, "node_modules") },

  module:{
  	loaders: [
    	  {
     	   // test for both js and jsx
      	  	test: /\.jsx?$/,

       	 // use babel loader
       		loaders: ['babel-loader'],

        // operate only on our app directory
        	include: path.resolve(__dirname, 'app'),
        },
        ]
   },
   plugins: [
   new webpack.SourceMapDevToolPlugin({ 
      columns: false,
      eval: true,
      cheap:true
   })
  ],
  //devtool:"cheap-eval-source-map"
};
