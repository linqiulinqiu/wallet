const mix = require('laravel-mix');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    resolve:{
        fallback: { 
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify") 
        }
    },
    devtool: false
/*    plugins: [
        new BundleAnalyzerPlugin({
            analyzerHost: '127.0.0.1'
        })
    ]
    */
});

mix.js('resources/js/app.js', 'public/js/')
    .sass('resources/sass/app.scss', 'public/css')
    .sourceMaps();
