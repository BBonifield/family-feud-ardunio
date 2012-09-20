
var five = require("../lib/johnny-five.js"),
    board, button;

var querystring = require('querystring');
var http = require('http');
board = new five.Board();

board.on("ready", function() {

  // Create a new `button` hardware instance.
  // This example allows the button module to
  // create a completely default instance
  button = new five.Button(7);


  var ledPins = [2, 3, 4];

  var leds = [];
  for (var i = 0; i < 3; i++) {
    leds[i] = new five.Led({pin: ledPins[i]});
  }

  var currentLed = 0;

  // Inject the `button` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    button: button,
    led0: leds[0],
    led1: leds[1],
    led2: leds[2]
  });

  // Button Event API

  var miss = function() {
    if (currentLed < 3) {
      leds[currentLed].on();
      currentLed++;
    } else {
      currentLed = 0;
      for (var j = 0; j < 3; j++) {
        leds[j].off();
      }
    }
  };


  button.on('down', function() {
    var post_options = {
      host: 'ql-family-feud.herokuapp.com',
      port: 80,
      path: '/state/advance',
      method: 'GET'
    };

    post_data = "hi";

    var post_req = http.request(post_options);
    post_req.end();
    console.log('advance state');
  });



  // "hold" the button is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  //        set
  button.on("hold", function() {
    console.log("hold");
  });

  // "up" the button is released
  button.on("up", function() {
    console.log("up");
  });
});
