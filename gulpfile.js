//gulp file made by fma350 using vi, 15/05/2019

var pug = require('gulp-pug');
var sass = require('gulp-sass')
//var cl = require('gulp-clean');
var fs = require('fs')
var mkdir = require('mkdirp')
var gulp = require('gulp');


const {series} = require('gulp');

const srcFolder = './src'
const buildFolder = './build'

//TASKS

function help(cb){
	console.log ("exports.rebuild = rebuild")
	console.log("exports.build   = build")
	console.log("exports.clean   = clean")
	console.log("exports.new  	= newRelease")
	console.log("exports.init    = init")
	console.log("exports.help    = help")
	cb()
}

function init(cb){
	mkdir(buildFolder+'/0.1', function(err) {
		if(err) console.log(err)
		else
			cb()
	});
}

function clean(cb){
	console.log('clean task has been depreacted and removed')
	//gulp.src(src_folder+"/*.html").pipe(cl());
	//gulp.src(src_folder+"/*.css").pipe(cl());
	cb();
}

function build(cb){
	var newFolder = buildFolder +"/"+ getNewBuildFolder(0.1)
	buildCSS(newFolder)
	buildHTML(newFolder)
	copyJS(newFolder)
	cb();
}

function rebuild(cb){
	var folder = buildFolder +"/"+ getRecentBuildFolder()
	console.log(folder)
	buildCSS(folder)
	buildHTML(folder)
	copyJS(folder)
	cb()
}

function newRelease(cb){
	var newFolder = buildFolder +"/"+ getNewBuildFolder(1)
	buildCSS(newFolder)
	buildHTML(newFolder)
	copyJS(newFolder)
	cb()
}

//Private Functions

function buildCSS(dest){
	gulp.src(srcFolder+'/*.sass').pipe(sass().on('error', sass.logError)).pipe(gulp.dest(dest))
}

function buildHTML(dest, pretty = false){
	gulp.src(srcFolder+'/*.pug').pipe(pug({
		doctype: 'html',
		pretty: pretty
	})).pipe(gulp.dest(dest));
}

function copyJS(dest){
	gulp.src(srcFolder+'/*.js').pipe(gulp.dest(dest))
}

function getRecentBuildFolder(){
	var dirs = fs.readdirSync(buildFolder);
	return dirs.pop()
}

function getNewBuildFolder(val){
	var tmp = getRecentBuildFolder()
	if (tmp){
		var version = parseFloat(tmp)
		if (val > 0.1) version = Math.floor(version)
		version += val
		return version.toString()
	}
	else{
		console.log("Error, last used folder name is not correctly formatted, reverting to 'temporary' ")
		return "/temporary"
	}
}

exports.rebuild = rebuild;
exports.build   = build;
exports.clean   = clean;
exports.new  	= newRelease
exports.init    = init
exports.help    = help
exports.default = series(clean, rebuild);