const { resolve } = require('path');
const express = require('express');
//const { request, response } = require('express');
const app = express();

app.use('/', express.static(resolve(__dirname, '../modules')));

// app.use('/', express.static(resolve(__dirname, '../modules')), (request,response)=>{
//     //设置响应头，设置允许跨域
//     response.setHeader('Access-Control-Allow-Origin','*')
    
//     //设置响应
//     response.send('Hello AJAX');
// });

app.listen(3333);