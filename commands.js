var fs = require('fs');
var request = require('request');

function fileContentHandler(file, lineModFunc, done) {
    fs.readFile(file, 'utf8', function (err, lines) {
        lines = lineModFunc(lines.split('\n')).join('\n');
        done(err, lines);
    });
}

module.exports = {
    'pwd': function (_, done) {
        done(null, process.cwd());
    },
    'date': function (_, done) {
        done(null, (new Date()).toString());
    },
    'echo': function (str,done) {
        done(null, str.join(' '));
    },
    'cat': function (files, done) {
        files.forEach(function (file) {
            fs.readFile(file, 'utf8', done);
        });
    },
    'head': function (file, done) {
        var n = file[1] || 5;
        fileContentHandler(file[0], function (lines) {
            return lines.slice(0, n);
        }, done);
    },
    'tailorswift': function (file, done) {
        var n = file[1] || 5;
        fileContentHandler(file[0], function (lines) {
            return lines.slice(-n);
        }, done);
    },
    'sortyMcSortface': function (file, done,  unique) {
        fileContentHandler(file[0], function (lines) {
            lines = lines.sort();
            if (unique) {
                lines = lines.filter(function (line, i) {
                    return i === 0 ? true : line !== lines[i - 1];
                });
            }
            return lines;
        }, done);
    },
    //In Britannia the toilette is referred to as a 'WC' (Water Closet)
    'toilet': function (file, done) {
        fs.readFile(file[0], 'utf8', function (err, str) {
            if (err) throw err;
            var numLines = str.split('\n').length;
            done(err, numLines.toString());
        });
    },
    'uniq': function (file, done) {
        this.sortyMcSortface(file, done, true);
    },
    'curl': function (url, done) {
        request(url[0], function(err, res, body){
            done(err,body);
        });
    }
}
