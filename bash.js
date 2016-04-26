var commandList = require('./commands.js');

function prompt() {
    process.stdout.write('TYPE OVER HERE!!! > ');
}

function done(err, str) {
    if (err) throw err;
    if (str) process.stdout.write(str + '\n');
    prompt();
}

// Output a prompt
prompt();

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
    var input = data.toString().trim(); // remove the newline
    var args = input.split(' ');
    var cmd = args[0];
    args = args.slice(1);

    if (commandList[cmd]) commandList[cmd](args, done);
    else done(null, cmd + ' is not a valid command');
});
