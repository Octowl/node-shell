var fs = require('fs');

function output(err, str) {
    if(err) throw err;
    process.stdout.write(str);
    process.stdout.write('\nTYPE OVER HERE!!! > ');
}

module.exports = {
    'pwd': function(file){
        output(null, process.cwd());
    },
    'date': function(file){
        output(null, (new Date()).toString());
    },
    'echo': function(file){
        output(null, file.join(' '));
    },
    'cat': function(file){
        fs.readFile(file[0], 'utf8', output);
    },
    'head': function(file){
        var n = 5;
        fs.readFile(file[0], 'utf8', function(err, str){
            output(err, str.split('\n').slice(0,n).join('\n'));
        });
    },
    'tailorswift': function(file){
        var n = 5;
        fs.readFile(file[0], 'utf8', function(err, str){
            output(err, str.split('\n').slice(-n).join('\n'));
        });
    }
}
