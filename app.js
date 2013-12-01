var five = require("johnny-five");

var white = '#ffffff',
    red = "#ff0000",
    green = "#0000ff", // No idea why green and blue are backwards but they were on this LED
    blue = "#00ff00";


five.Board().on("ready", function() {
  var board = this,
      led = new five.Led.RGB([3, 5, 6]),
      button = new five.Button(2),
      piezo = new five.Piezo(9);

  board.repl.inject({
    led: led,
    piezo: piezo
  });

  button.on("release", function () {
    // Start the light show
    var colours = [red, green],
        index = 0;

    led.on();
    led.color(colours[index]);
    board.loop(500, function () {
      index = (index + 1) % colours.length;
      led.color(colours[index]);
    });

    // Play Jingle Bells
    piezo.song(
      "e e e e e e e g c d e f f f f e e e e e d d e d g ", 
      "11111311111311111111151111111111111111111111112344"
    );
  });
});