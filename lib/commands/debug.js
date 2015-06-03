/**
 * 调试模块启动
 * @param  {[type]} logger  [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
function debug(logger,options) {
    console.log("debug");
    //return project.install(decEndpoints, options, config);
}

// -------------------

debug.line = function (logger, argv) {
    /*
    var options = install.options(argv);
    return install(logger, options.argv.remain.slice(1), options);
    */
};

debug.options = function (argv) {

};

debug.completion = function () {
    // TODO:
};

module.exports = debug;
