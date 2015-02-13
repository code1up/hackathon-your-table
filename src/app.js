var UI = require("ui");
var ajax = require("ajax");
var Vibe = require('ui/vibe');

var getClients = function (success, failure) {
  var options = {
    url: "https://crackling-inferno-8307.firebaseio.com/clients/.json",
    type: "json"
  };

  ajax(options, success, failure);
};

var main = new UI.Card({
  icon: "images/menu_icon.png",
  title: " Your Table",
  subtitle: "Usage:",
  body: "UP = Front of House, Down = Customer."
});

main.show();

main.on("click", "up", function(e) {
  var card = new UI.Card({
    icon: "images/menu_icon.png",
    title: " Your Table",
    subtitle: "Front of House",
    body: "Waiting for customers..."
  });

  card.show();

  var clients = { };

  var updateClients = function () {
    var success = function (data) {
      console.log("AJAX SUCCEEDED");

      var changed = false;

      for (var username in data) {
        var existingClient = clients[username];

        if (existingClient) {
          console.log("EXISTNG USERNAME: " + username);

          changed = changed || existingClient.distance !== data[username].distance;

          if (changed) {
            existingClient.distance = data[username].distance;

            console.log("CHANGED: " + username);
          }
        } else {
          console.log("NEW USERNAME: " + username);

          clients[username] = {
            distance: data[username].distance
          };
        }
      }

      if (changed) {
        card.body("Customer update, please check front of house dashboard!");

        setTimeout(function () {
          card.body("Waiting for customers...");
        }, 5000);

        Vibe.vibrate("long");
      }
    };

    var failure = function (error) {
      console.log("AJAX ERROR: " + error);
    };

    getClients(success, failure);
  };

  setInterval(updateClients, 3000);
});

main.on("click", "down", function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: "Your Table",
        icon: "images/menu_icon.png",
        subtitle: "Can do Menus"
      }, {
        title: "Second Item",
        subtitle: "Subtitle Text"
      }]
    }]
  });
  menu.on("select", function(e) {
    console.log("Selected item #" + e.itemIndex + " of section #" + e.sectionIndex);
    console.log("The item is titled '" + e.item.title + "'");
  });
  menu.show();
});

main.on("click", "select", function(e) {
});
