var fs = require('fs');

function output(err, str) {
    if (err) throw err;
    process.stdout.write(str);
    process.stdout.write('\nTYPE OVER HERE!!! > ');
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
        file = file[0];
        fs.readFile(file, 'utf8', function (err, str) {
            output(err, str.split('\n').slice(0, n).join('\n'));
        });
    },
    'tailorswift': function (file) {
        var n = 5;
        file = file[0];
        fs.readFile(file, 'utf8', function (err, str) {
            output(err, str.split('\n').slice(-n).join('\n'));
        });
    },
    'sortyMcSortface': function (file, unique) {
        file = file[0];
        fs.readFile(file, 'utf8', function (err, str) {
            var lines = str.split('\n').sort()
            if (unique) {
                lines = lines.filter(function (line, i) {
                    return i === 0 ? true : line !== lines[i - 1];
                });
            }
            lines = lines.join('\n');
            output(err, lines);
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
