var path=require('path');

function reload(config) {
//    return new Q();
    var run=require('./run'),
        livereload=require('node-livereload'),
        app,
        pwd=process.env.PWD;
        app=run();
        livereload.createServer();
        livereload.watch({
            path:path.join(pwd, "./css")
        });
        livereload.watch({
            path:path.join(pwd, "./js")
        });
        livereload.watch({
            path:path.join(pwd, "./images")
        });
        livereload.watch({
            path:path.join(pwd, "./views")
        });
}

// -------------------

reload.line = function (logger, argv) {
    var options = cli.readOptions(argv);
    var name = options.argv.remain[1];

    return completion(logger, name);
};

reload.completion = function () {
    // TODO:
};

module.exports = reload;
