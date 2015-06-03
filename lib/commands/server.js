/**
 * [server description]
 * @param  {[type]} args   [description]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
//process.env.PWD
//__dirname;
//console.log(__dirname,process.argv);
var path = require('path'),
    logger = require('hns-logger'),
    CoffeeScript = require('coffee-script');

CoffeeScript.register();

function server(args, config) {
    var app = require(path.join(process.env.PWD, "./app/app"));
    app.listen(3000, function() {
        logger.success("server is running!port:3000");
    });
}

server.completion = function() {
    // TODO:
};

module.exports = server;
