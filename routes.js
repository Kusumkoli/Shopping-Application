const fs = require('fs');

const request_handler = (req, res) => {

    if(req.url === '/') {
        res.write('<html><head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"></input>');
        res.write('<button type="submit">Send</button></form></body></html>');
        return res.end();
    }
    
    if(req.url=== '/message' && req.method === 'POST') { //redirect back to page "/" and also store the response in a file
        const form_message = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            form_message.push(chunk);
        });
    
        req.on('end', () => {
            const parsed_message = Buffer.concat(form_message).toString();
            const message = parsed_message.split('=')[1];
            fs.writeFileSync('message.txt', message);
        });
        res.writeHead(302, {
            'Location' : '/'
        });
        return res.end(); 
    }
    
    else {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><head><title>NodeJS</title></head><body><p>Hello and keep learning!</p></body></html>');
        res.end();
    }
};

module.exports = request_handler;

