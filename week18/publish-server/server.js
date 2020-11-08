let http = require('http');
let https = require('https');
//let fs = require('fs');
let unzipper = require('unzipper');
let querystring = require('querystring');

/*
Auth routing,  accept code
use code grant + client_id + client_secrte to get access token
use access token to get user info 
use user info to do authorization
then accept publish command

*/

function auth(request, response){
    let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1]);
    console.log(query);
    getAccessToken(query.code, function(info){
        //response.write(JSON.stringify(info));
        response.write(`<a href='http://localhost:8083/?token=${info.access_token}'>Publish</a>`);
        response.end();
        console.log(info);
    });

}

function getAccessToken(code, callback){

    const clientId="Iv1.fe4acba21c4902ea";

    //For security reason, will not upload app secret to github.
    const clientSecret="";

    let request = https.request({
        hostname: "github.com",
        path: `/login/oauth/access_token?code=${code}&client_id=${clientId}&client_secret=${clientSecret}`,
        port: 443,
        method: "POST"

    }, function(response){
        let body = "";
        response.on('data', chunk=>{
            body += chunk.toString();
        });

        response.on('end', chunk=>{
            console.log(body);
            callback(querystring.parse(body));
        })
    });
    
    request.end();

}

function publish(request, response){
    let query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1]);
    getUser(query.token, info => {

        //here is the authorization logic
        if(info.login === 'arrowpig1979'){

            request.pipe(unzipper.Extract({
                path: '../server/public/'
            }));
            request.on('end', function(){
                response.end("Success!");
            })
            
        }
    });


}

function getUser(token, callback){
    let request = https.request({
        hostname: "api.github.com",
        path: '/user',
        port: 443,
        method: "GET",
        headers:{
            "Authorization": `token ${token}`,
            "User-Agent": 'arrowpig-publish'
        }

    }, function(response){
        let body = "";
        response.on('data', chunk=>{
            body += chunk.toString();
        });

        response.on('end', chunk=>{
            console.log(body);
            let info = JSON.parse(body);
            callback(info);
        })
    });
    
    request.end();
}

http.createServer(function(request, response){
    console.log(request.headers);

    if(request.url.match(/^\/auth\?/)){
        return auth(request, response);
    }

    if(request.url.match(/^\/publish\?/)){
        return publish(request, response);
    }

    /*
    request.on('data', chunk=>{
        console.log(chunk.toString());
    })

    request.on('end', chunk=>{
        response.end("Success");
    });
    */
    //let outFile = fs.createWriteStream("../server/public/index.html");

    
}).listen(8082);