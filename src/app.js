var UI = require("ui");
var ajax = require("ajax");
var Vibe = require('ui/vibe');

var placeOrder = function (order) {
  var success = function (data) {
    console.log("placeOrder::AJAX SUCCEEDED");
  };

  var failure = function (error) {
    console.log("placeOrder::AJAX ERROR: " + error);
  };

  var options = {
    url: "https://crackling-inferno-8307.firebaseio.com/tables/4/table.json",
    type: "json",
    method: "PATCH",
    data: order
  };

  ajax(options, success, failure);
};

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
      console.log("updateClients::AJAX SUCCEEDED");

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
      console.log("updateClients::AJAX ERROR: " + error);
    };

    getClients(success, failure);
  };

  setInterval(updateClients, 3000);
});

main.on("click", "down", function(e) {
  var order = { };

  var menu = new UI.Menu({
    sections: [
      {
        title: "Starters",
        items: [
          {
            title: "Houmous",
            subtitle: "Pour smoky PERi-PERi oil over creamy houmous and dig in with strips of warm pitta."
          },
          {
            title: "Red Pepper Dip",
            subtitle: "Dive in to tempting roasted red pepper and chilli spice dip with warm pitta strips."
          }
        ]
      },
      {
        title: "Mains",
        items: [
          {
            title: "Chicken Thighs",
            subtitle: "Four boneless chicken thighs, flame-grilled with skin on."
          },
          {
            title: "Chicken Butterfly",
            subtitle: "Two succulent chicken breasts joined by crispy skin."
          }
        ]
      },
      {
        title: "Desserts",
        items: [
          {
            title: "Choc-a-Lot Cake"
          },
          {
            title: "Carrot Cake"
          }
        ]
      }
    ]
  });

  menu.on("select", function(e) {
    switch (e.sectionIndex) {
      case 0:
        order.starter = e.item.title;
        break;

      case 1:
        order.main = e.item.title;
        break;

      case 2:
        order.dessert = e.item.title;
        break;

      case 3:
        placeOrder(order);
        break;
    }

    console.log("Starter: " + order.starter);
    console.log("Main: " + order.main);
    console.log("Dessert: " + order.dessert);
  });

  menu.show();
});

main.on("click", "select", function(e) {
});
