/**
 * 调试模块启动
 * @param  {[type]} logger  [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
 var path=require("path");
 var supervisor=require("supervisor");

function debug(logger,options) {
    var serverFile=path.join(__dirname,"./server");
    supervisor.run(["--watch","app","-e","coffee,js",serverFile])
}

// -------------------

debug.line = function (logger, argv) {

};

debug.options = function (argv) {

};

debug.completion = function () {
    // TODO:
};

module.exports = debug;
