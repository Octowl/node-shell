// Output a prompt
process.stdout.write('TYPE OVER HERE!!! > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline
  var output = '';

  switch (cmd) {
      case 'pwd':
          output = process.cwd();
          break;
      case 'date':
          output = (new Date()).toString();
          break;
      default:
          output = cmd + ' is not a valid command';
  }

  process.stdout.write(output);
  process.stdout.write('\nTYPE OVER HERE!!! > ');
});
