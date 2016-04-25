var fs = require('fs');

function output(err, str) {
    if (err) throw err;
    process.stdout.write(str);
    process.stdout.write('\nTYPE OVER HERE!!! > ');
}

function fileContentHandler(file, lineModFunc) {
    fs.readFile(file, 'utf8', function(err,lines){
        lines = lineModFunc(lines.split('\n')).join('\n');
        output(err, lines);
    });
}

module.exports = {
    'pwd': function () {
        output(null, process.cwd());
    },
    'date': function () {
        output(null, (new Date()).toString());
    },
    'echo': function (str) {
        output(null, str.join(' '));
    },
    'cat': function (files) {
        files.forEach(function(file){
            fs.readFile(file, 'utf8', output);
        });
    },
    'head': function (file) {
        var n = 5;
        fileContentHandler(file[0], function(lines){
            return lines.slice(0, n);
        });
    },
    'tailorswift': function (file) {
        var n = 5;
        fileContentHandler(file[0], function(lines){
            return lines.slice(-n);
        });
    },
    'sortyMcSortface': function (file, unique) {
        fileContentHandler(file[0], function(lines){
            lines = lines.sort();
            if (unique) {
                lines = lines.filter(function (line, i) {
                    return i === 0 ? true : line !== lines[i - 1];
                });
            }
            return lines;
        });
    },
    //In Britannia the toilette is referred to as a 'WC' (Water Closet)
    'toilet': function (file) {
        file = file[0];
        fs.readFile(file[0], 'utf8', function (err, str) {
            var numLines = str.split('\n').length;
            output(err, numLines.toString());
        });
    },
    'uniq': function (file) {
        this.sortyMcSortface(file, true);
    }
}
