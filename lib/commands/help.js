


function help() {
    console.log("Usage: hns [command] [options]  [arguments]");
    console.log("Options");
	console.log("\tserver\tstart hns server");
    console.log("\t\t-v,--version\tprint hns version");
    console.log("\t\t-p,--port\tweb server port(defult:3000)");
    console.log("\t\t-l,--live\tliveroader web page by change");
}

// -------------------

help.line = function (logger, argv) {
    //TODO
};

help.completion = function () {
    // TODO
};

module.exports = help;
