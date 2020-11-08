let http = require('http');
let fs = require('fs');
let archiver = require('archiver');

let child_process = require('child_process');
let querystring = require('querystring');

//1. open the auth page  https://github.com/login/oauth/authorize
child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.fe4acba21c4902ea`);


//2. happens in publish server side to get access token 

//3. create a server to get access token 
http.createServer(function(request, response){
    let query = querystring.parse(request.url.match(/^\/\?([\s\S]+)$/)[1]);
    publish(query.token);

}).listen(8083);

function publish(token){

    let request = http.request({
        hostname: "localhost",
        port: 8082,
        method: 'POST',
        path: "/publish?token=" + token,
        headers: {
            'Content-Type': 'application/octet-stream',
            //'Content-Length': stats.size
        }
    }, response => {
        console.log(response);
    });
    
    const archive = archiver('zip',{
        zlib:{level: 9}
    });
    
    archive.directory('./sample', false);
    archive.finalize();
    archive.pipe(request);
    
}



/*
file.on('data', chunk => {
    console.log(chunk.toString());
    request.write(chunk);
})

file.on('end', chunk => {
    console.log('read finished');
    request.end(chunk);
})
*/


