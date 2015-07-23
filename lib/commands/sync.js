var path=require('path');

function sync(config) {
//    return new Q();
    var run=require('./run'),
        browserSync=require('browser-sync'),
        app,
        pwd=process.env.PWD;
        app=run();
		browserSync({
			files: [path.join(pwd, "./css"),path.join(pwd, "./js"),path.join(pwd, "./views")],

			logPrefix:"hns-server",
			port:25384
		});
}

// -------------------

sync.line = function (logger, argv) {
    var options = cli.readOptions(argv);
    var name = options.argv.remain[1];

    return completion(logger, name);
};

sync.completion = function () {
    // TODO:
};

module.exports =sync;
