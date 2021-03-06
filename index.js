#!/usr/bin/env node

var program = require('commander');
var chalk = require('chalk');
var generator = require("./classes/classGenerator.js");

var command = '';
var programdata = {};

program
	.arguments('<command>')
	.option('-d, --datadir <datadir>', 'The game data directory')
	.option('-m, --moddir <moddir>', 'The mod data directory')
	.option('-o, --outdir <outdir>', 'The output data directory')
	.action(function(input_command) {
		command = input_command;
		programdata = program;
	})
	.parse(process.argv);

// Process command
switch(command) {
	case '':
		console.log(chalk.bold.red('No Command Specified!'));
		break;
	case 'run':
		if(programdata.datadir && programdata.moddir) {
			// say what we're doing
			console.log(chalk.bold.cyan('Initialising Loader...'));
			console.log('');
			
			var outDir = programdata.datadir;
			if(programdata.outdir) {
				outDir = programdata.outdir;
			}

			// initialise the generator with datadir
			var run = new generator(programdata.datadir, programdata.moddir, outDir);

			run.doRun();
		} else {
			console.log(chalk.bold.red('No gamedata or moddata directory specified, please pass -d or --datadir and -md or --moddir'));
		}

		break;
	default:

		console.log(chalk.bold.red('Unrecognised command'));
		

		break;
}