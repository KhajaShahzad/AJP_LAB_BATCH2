

const server = http.createServer((req,res) => {
    res.write("Hello from Node Server! ");
    res.end();


});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000")
});
////////////////////////////////////////////////////////////////
const http = require("http");
const myserver = http.createServer((req,res) => {
    res.write("Hello from Node Server!");
    res.end();
});

myserver.listen(4000, () => {
    console.log("Server running on http://localhost:4000")
});