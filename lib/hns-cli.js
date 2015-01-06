var fs = require('fs');
var child_process = require('child_process');
var chalk = require('chalk');
var symbols = require('log-symbols');
var hns = Object.create(null);
var path = require('path');
var readJSON = function(filepath) {
    var content;
    try {
        content = fs.readFileSync(filepath);
        return JSON.parse(content);
    } catch (e) {
        console.log(e);
    }
};

var cmd_npm = process.platform === "win32" ? "npm.cmd" : "npm";
var cmd_grunt = process.platform === "win32" ? "grunt.cmd" : "grunt";
var cmd_inspector = process.platform === "win32" ? "node-inspector.cmd" : "node-inspector";
var cmd_supervisor = process.platform === "win32" ? "supervisor.cmd" : "supervisor";
process.title = "hns";
console.info = function(msg, color) {
    console.log('\033[32m' + msg + '\033[0m');
};
console.error = function(msg) {
    console.log(chalk.red(msg));
};
console.fail = function(msg) {
    console.error(symbols.error + " " + msg);
};
console.success = function(msg) {
    console.log(symbols.success + " " + chalk.green(msg));
};
console.warning = function(msg) {
    console.log(symbols.warning + " " + chalk.yellow(msg));
};
hns.help = function() {
    console.log("Usage: hns [options]  [arguments]");
    console.log("Options");
    console.log("\t-v,--version\tprint hns version");
    console.log("\t-p,--port\tweb server port(defult:3000)");
    console.log("\t-in,--install\tproject install require module");
    console.log("\t-i,--inspector\tdebug with node-inspector tools");
    console.log("\t-g,--grunt\texecult grunt tasks");
    console.log("\t-s,--server\tstart web server");
    console.log("\t-sv,--supervisorsupervisor web server");
    console.log("\t-w,--watch\tsupervisor web server watch dictory or files");
};
hns.install = function() {
    var package = readJSON(path.join(process.env.PWD, "../package.json"));

    var devDepends = package.devDependencies;
    var deps = [];
    for (var depen in devDepends) {
        deps.push(depen);
    }
    var npm = child_process.spawn(cmd_npm, ['link'].concat(deps));
    npm.stdout.on('data', function(data) {
        console.info('npm link: ' + data);
    });

    npm.stderr.on('data', function(data) {
        console.error('mnpm link error: ' + data);
    });

    npm.on('close', function(code) {
        console.log('child process npm link exited with code ' + code);
    });
};

hns.grunt = function(tasks) {
    var grunt = child_process.spawn(cmd_grunt, tasks);
    grunt.stdout.on('data', function(data) {
        console.info('grunt task: ' + data);
    });

    grunt.stderr.on('data', function(data) {
        console.error('grunt task: ' + data);
    });

    grunt.on('close', function(code) {
        console.log('child process grunt exited with code ' + code);
    });
};

hns.inspector = function() {
    var inspector = child_process.spawn(cmd_inspector, []);
    inspector.stdout.on('data', function(data) {
        console.info('supervisor:' + data);
    });
};

hns.startServer = function(cmd, args, port) {
	var cp=child_process.spawn(cmd,args,{
		cwd:process.env.PWD,
	})
	cp.stdout.on('data', function(data) {
        console.info(data);
    });
    cp.stderr.on('data', function(data) {
        console.error(data);
    });
	cp.on('close', function (code) {
		console.log('child process exited with code ' + code);
	});
};
hns.debugServer = function(cmd, args, port) {
    var grunt = child_process.spawn(cmd, args);
    grunt.stdout.on('data', function(data) {
        console.info('debug: ' + data);
    });
    grunt.stderr.on('data', function(data) {
        console.error('debug: ' + data);
    });
};

hns.cli = function(args) {
 //   var PWD=process.env.PWD
    var option = Object.create(null);
	var program=[];
    while (arg = args.shift()) {

        if (arg === "--help" || arg === "-h" || arg === "-?") {
            return hns.help();
        } else if (arg === "--version" || arg === "-v") {
            console.log("hns version 0.0.1!");
        } else if (arg === "--address" || arg === "-a") {
            option.address = args.shift();
        } else if (arg === "--port" || arg === "-p") {
            option.port = args.shift();
        } else if (arg === "--watch" || arg === "-w") {
            option.watch = args.shift();
        } else if (arg === "--link" || arg === "-lk") {
            option.link = true;
        } else if (arg === "--install" || arg === "-in") {
            option.install = true;
        } else if (arg === "--liveload" || arg === "-ll") {
            option.liveload = true;
        } else if (arg === "--inspector" || arg === "-i") {
            option.inspector = true;
        } else if (arg === "--supervisor" || arg === "-sv") {
            option.supervisor = true;
        } else if (arg === "--server" || arg === "-s") {
            option.server = true;
        } else if (arg === "--grunt" || arg === "-g") {
            option.grunt = args.shift();
        } else if (arg === "--") {
            program = args;
            break;
        } else if (arg[0] != "-" && !args.length) {
            // Assume last arg is the program
            program = [arg];
        }
    }
    if (!option.address) {
        option.address = "127.0.0.1";
    }
    if (!option.port) {
        option.port = "3000";
    }
    if (option.install) {
        hns.install();
        return;
    }

    if (option.grunt) {
        hns.grunt(option.grunt.split(","));
    }

    if (option.inspector) {
        hns.inspector();
        hns.debugServer('node', ['--debug-brk'], option.port);
        return;
    }

    if (option.link) {
        hns.grunt('link');
        return;
    }

    if (option.supervisor) {
        var param = {};
        param = ['--watch', option.watch || "routes"].concat[program];
        hns.debugServer(cmd_supervisor, param, option.port);
        return;
    }
    if (option.server) {
        hns.startServer('node',program, option.port);
        return;
    }
    hns.help();
};
exports.cli = hns.cli;
