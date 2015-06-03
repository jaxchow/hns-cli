/*
 * hns command 命令行
 *
 *
 *
 */

//TODO：未实现hnsrc配置文件
//var app=require("../app/app");
//var hnsrc=require("../hnsrc.json");
var commands=require('./commands');
var hns={};

hns.cli=function(args){
	var arg = args.slice(2).reverse(),
        command=arg.pop(),
    	argv=hns.processArgs(arg);
    this.runCommand(command,argv);
};

/**
 * 处理命令行参数
 * @param  {array} args [args array]
 * @return {object}      [description]
 */
hns.processArgs=function(args){
	var argv ={};
	while(args.length>0){
		var arg=args.pop();
		switch(arg){
			case '-p':
				argv.port=args.pop();
				break;
			case '--port':
				argv.port=args.pop();
				break;
			case '-l':
				argv.live=true;
				break;
			case '--live':
				argv.live=true;
				break;
			case '--proxy':
				argv.proxy=args.pop();
				break;
			default:
				argv.file=args.pop();
				break;
		}

	}
	return argv;
};

/**
 * [function description]
 * @param  {string} cmd  [description]
 * @param  {object} argv [description]
 * @return {none}      [description]
 */
hns.runCommand=function(cmd,argv){
	//TODO:错误cmd 执行
	commands[cmd].apply(this,argv);
};

module.exports=exports=hns;
