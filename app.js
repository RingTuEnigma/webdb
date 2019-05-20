var openCreation = 0; //Es soll nur möglich sein, eine Tasklist auf einmal zu erstellen
$("nav").ready(loadNavigation());

function loadNavigation() {
  $(function () {
    $("nav").load("navigation.html", function () {
      //Holt alle Tasklistnamen und die foreignId aus navigation.php und füllt diese ins Template
      $.post(
        "navigation.php",
        {},
        function (data) {
          $("#add").before(jQuery.templates("#userTemplate").render(data));
          console.log(data);
          $(".navigationAddOn").click(menuFocus);
          /*$(".controlIcons").click(function(ev) {
            ev.stopImmediatePropagation();
            if (ev.currentTarget.innerText == "close") {
              closeAllMenus();
            }
            if (ev.currentTarget.innerText == "edit") {
              console.log(ev);
            }
          });*/
          $(".controlIcons").click(function (ev) {
            ev.stopImmediatePropagation();
            if ($(this).attr("data-type") == "close") {
              closeThisMenu(this);
            }
            if ($(this).attr("data-type") == "edit" && openCreation == 0) {
              let foreignId = $(this).attr("data-foreignId");
              let newElement = $('div[data-foreignId = "' + foreignId + '"]');
              let listName = newElement.attr("data-listName");
              copyElement = newElement.clone(true, true);
              newElement.empty();

              //Container für das Textfeld mit Label {
              let textfieldDiv = $("<div></div>");
              textfieldDiv.addClass("mdl-textfield mdl-js-textfield");
              newElement.append(textfieldDiv);

              let input = $("<input></input>");
              input.addClass("mdl-textfield__input");
              input.attr("type", "text");
              input.attr("id", "textField");
              input.attr("value", listName);
              textfieldDiv.append(input);

              let label = $("<label></label>");
              label.addClass("mdl-textfield__label");
              label.attr("for", "textField");
              textfieldDiv.append(label);
              //}

              //Erstellen der Menüleiste {
              let menu = $("<div></div>");
              menu.addClass("controlbarOn");
              menu.attr("id", newElement.attr("data-foreignId"));
              newElement.append(menu);
              let check = $("<i></i>").text("check");
              check.addClass("material-icons controlIcons");
              check.attr("data-foreignId", foreignId);
              menu.append(check);
              let edit = $("<i></i>").text("edit");
              edit.addClass("material-icons controlIcons");
              edit.attr("data-foreignId", foreignId);
              menu.append(edit);
              let close = $("<i></i>").text("close");
              close.addClass("material-icons controlIcons");
              close.attr("data-foreignId", foreignId);
              menu.append(close);

              openCreation = 1;

              //Anbinden der EventListener an die verschiedenen Menüwerkzeuge {
              //Close bricht die Erstellung ab
              close.click(function () {
                newElement.replaceWith(copyElement);
                openCreation = openCreation - 1;
              });
              //Edit hat während der Erstellung keine Funktion
              edit.click(function () {
                //NOUSE
              });

              //Abschließen der Bearbeitung und Erstellen der Tasklist durch Klick auf Enter oder Haken {
              check.click(function () {
                console.log("Send to php");
                /*let currentListName = input.val();
                console.log(currentListName);
                $.post(
                  "navigation.php",
                  { Name: input.attr("value") },
                  function(data) {
                    $("nav").load("navigation.html");
                  },
                  "html"
                );*/
              });
              input.keydown(function (ev) {
                if (ev.keyCode == 13) {
                  console.log("Send to php");
                }
              });
              //}
              //}
            }
          });
        },
        "json"
      );

      //Erstellt beim Klicken auf das + (Plus) einen Container zum Erstellen einer Liste
      $("#add").click(function () {
        if (openCreation == 0) {
          //foreignId dient dazu, um die, zu einem Element gehörige Menüleiste gezielt ansprechen zu können
          foreignId = "createTasklist";

          closeAllMenus();

          //Container für den Input und Menü {
          let newElement = $("<div></div>");
          newElement.addClass("mdl-navigation__link");
          newElement.attr("data-foreignId", foreignId);
          newElement.on("click", menuFocus);
          //}

          //Container für das Textfeld mit Label {
          let textfieldDiv = $("<div></div>");
          textfieldDiv.addClass("mdl-textfield mdl-js-textfield");
          newElement.append(textfieldDiv);

          let input = $("<input></input>");
          input.addClass("mdl-textfield__input");
          input.attr("type", "text");
          input.attr("id", "textField");
          textfieldDiv.append(input);

          let label = $("<label></label>").text("Tasklist Name");
          label.addClass("mdl-textfield__label");
          label.attr("for", "textField");
          textfieldDiv.append(label);
          //}

          //Erstellen der Menüleiste {
          let menu = $("<div></div>");
          menu.addClass("controlbarOn");
          menu.attr("id", newElement.attr("data-foreignId"));
          newElement.append(menu);
          let check = $("<i></i>").text("check");
          check.addClass("material-icons controlIcons");
          check.attr("data-foreignId", foreignId);
          menu.append(check);
          let edit = $("<i></i>").text("edit");
          edit.addClass("material-icons controlIcons");
          edit.attr("data-foreignId", foreignId);
          menu.append(edit);
          let close = $("<i></i>").text("close");
          close.addClass("material-icons controlIcons");
          close.attr("data-foreignId", foreignId);
          menu.append(close);
          //}

          //Hängt den oben konstruierten Container vor dem + in das DOM
          $("#add").before(newElement);
          openCreation = 1;

          //Anbinden der EventListener an die verschiedenen Menüwerkzeuge {
          //Close bricht die Erstellung ab
          close.click(function () {
            newElement.remove();
            openCreation = openCreation - 1;
          });
          //Edit hat während der Erstellung keine Funktion
          edit.click(function () {
            //NOUSE
          });

          //Abschließen der Bearbeitung und Erstellen der Tasklist durch Klick auf Enter oder Haken {
          check.click(function () {
            console.log("Send to php");
            let currentListName = input.val();
            console.log(currentListName);
            $.post(
              "navigation.php",
              { name: currentListName },
              function (data) {
                console.log(data);
                loadNavigation();
                openCreation = openCreation - 1;
              },
              "html"
            );
          });
          input.keydown(function (ev) {
            if (ev.keyCode == 13) {
              console.log("Send to php");
              console.log("Send to php");
            let currentListName = input.val();
            console.log(currentListName);
            $.post(
              "navigation.php",
              { name: currentListName },
              function (data) {
                console.log(data);
                loadNavigation();
                openCreation = openCreation - 1;
              },
              "html"
            );
            }
          });
          //}
          //}
        }
      });
    });
  });
}

$("#navbar").click(function () {
  componentHandler.upgradeDom();
});

//Funktionen um Menü Ein-/Auszublenden {
//Schließt alle offenen Menüs
function closeAllMenus() {
  $(".controlbarOn").addClass("controlbarOff");
  $(".controlbarOn").removeClass("controlbarOn");
}

//Öffnen das Menü beim angeklickten Navigationselement
//Muss an den Container für Input / Listenelement und Menü gebunden sein
function menuFocus() {
  if ($("#" + $(this).attr("data-foreignId")).attr("class") != "controlbarOn") {
    closeAllMenus();
    $("#" + $(this).attr("data-foreignId")).addClass("controlbarOn");
    $("#" + $(this).attr("data-foreignId")).removeClass("controlbarOff");
  }
}

//Kann an einen eventListener eines Elements mit dem Attribute data-foreignId gebunden werden
function closeThisMenu(x) {
  $("#" + $(x).attr("data-foreignId")).addClass("controlbarOff");
  $("#" + $(x).attr("data-foreignId")).removeClass("controlbarOn");
}
//}
