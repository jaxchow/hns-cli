var path=require('path');

function reload(config) {
//    return new Q();
    var run=require('./run'),
        hotswap=require('hotswap'),
        pwd=process.env.PWD;
        run();
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
