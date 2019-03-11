var  http = require('http');
var fs = require('fs');

const server = http.createServer(function(req, res){
	//允许其他域请求
	res.setHeader("Access-Control-Allow-Origin",'http://10.196.14.57:3001')
	//
	var urls = req.url;
	console.log(urls)
	if(urls == '/favicon.ico'){
		res.end('favicon.ico');
	}
	var filePath  = './'+urls;
	fs.readFile(filePath,function(err,data){
		if(!err){
			res.end(data);
		}else{
			res.end('this is sever1');
		}
	})
  // res.setHeader('Content-Type', 'text/plain');
});

server.listen(3000, '10.196.14.57', function(){
  console.log("Server running at http://10.196.14.57:3000");
});