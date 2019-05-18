var openCreation = 0; //Es soll nur möglich sein, eine Tasklist auf einmal zu erstellen
var counter = 0; //Dient zur Erstellung der fotlaufenden ID's

$(function () {
  $("nav").load("navigation.html", function () {
    //Erstellt beim Klicken auf das + (Plus) einen Container zum Erstellen einer Liste
    $("#add").click(function () {
      if (openCreation == 0) {
        counter = counter + 1;
        //foreignId dient dazu, um die, zu einem Element gehörige Menüleiste gezielt ansprechen zu können
        foreignId = "tasklist" + counter;

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
        check.attr("data-foreignId", foreignId)
        menu.append(check);
        let edit = $("<i></i>").text("edit");
        edit.addClass("material-icons controlIcons");
        edit.attr("data-foreignId", foreignId)
        menu.append(edit);
        let close = $("<i></i>").text("close");
        close.addClass("material-icons controlIcons");
        close.attr("data-foreignId", foreignId);
        menu.append(close);
        //}

        //Hängt den oben konstruierten Container vor dem + in das DOM
        $("#add").before(newElement);
        openCreation = 1;

        //Anbinden der EventListener an die verschiedenen Menüwerkzeuge
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
        });
        input.keydown(function (ev) {
          if (ev.keyCode == 13) {
            console.log("Send to php");
          }
        });
        //}
      }
    });
    $("#navbar").click(function () {
      componentHandler.upgradeDom();
    })


    $(".navigationAddOn").click(menuFocus);


    //Funktionen um Menü Ein-/Auszublenden {
    //Schließt alle offenen Menüs
    function closeAllMenus() {
      $(".controlbarOn").addClass("controlbarOff");
      $(".controlbarOn").removeClass("controlbarOn");
    }

    //Öffnen das Menü beim angeklickten Navigationselement
    //Muss an den Container für Input / Listenelement und Menü gebunden sein
    function menuFocus() {
      closeAllMenus();
      $("#" + $(this).attr("data-foreignId")).addClass("controlbarOn");
    };

    //Kann an einen eventListener eines Elements mit dem Attribute data-foreignId gebunden werden
    function closeThisMenu() {
      $("#" + $(this).attr("data-foreignId")).addClass("controlbarOff");
      $("#" + $(this).attr("data-foreignId")).removeClass("controlbarOn");
    }
    //}

    $.post(
      'navigation.php',
      {},
      function (data) {
        $('#add').before(jQuery.templates("#userTemplate").render(data));
      },
      "json"
    );


  });
});




