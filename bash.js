var commandList = require('./commands.js');

// Output a prompt
process.stdout.write('TYPE OVER HERE!!! > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
    var input = data.toString().trim(); // remove the newline
    var args = input.split(' ');
    var cmd = args[0];
    args = args.slice(1);

    if (commandList[cmd]) {
        commandList[cmd](args);
    } else {
        process.stdout.write(cmd + ' is not a valid command');
    }
});
