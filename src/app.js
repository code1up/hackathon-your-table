var UI = require("ui");

var main = new UI.Card({
  title: "Your Table",
  icon: "images/menu_icon.png",
  subtitle: "Usage:",
  body: "UP = Front of House, Down = Customer."
});

main.show();

main.on("click", "up", function(e) {
  var card = new UI.Card();

  card.title("A Card");
  card.subtitle("Is a Window");
  card.body("The simplest window type in Pebble.js.");
  card.show();

  var times = 0;

  setInterval(function () {
    card.title('' + times++);
  }, 1000);
});

/*
main.on("click", "up", function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: "Front of House",
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
*/

main.on("click", "select", function(e) {
});
