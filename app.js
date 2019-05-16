$("#add").click(function () {
  let newElement = document.createElement("div");
  newElement.className = "mdl-navigation__link navigationAddOn";
  let textfieldDiv = document.createElement("div");
  textfieldDiv.className = "mdl-textfield mdl-js-textfield";
  textfieldDiv.id = "test";
  newElement.appendChild(textfieldDiv);

  let input = document.createElement("input");
  input.className = "mdl-textfield__input createTask";
  input.type = "text";
  input.id = "textField";
  textfieldDiv.appendChild(input);

  let label = document.createElement("label");
  label.className = "mdl-textfield__label";
  label.for = "textField";
  textfieldDiv.appendChild(label);
  let labelText = document.createTextNode("Tasklist Name");
  label.appendChild(labelText);

  let navigationAddOn = document.createElement("div");
  navigationAddOn.className = "controlAddOn";
  newElement.appendChild(navigationAddOn);
  let check = document.createElement("i");
  check.className = "material-icons controlIcons";
  check.innerText = "check";
  navigationAddOn.appendChild(check);
  let edit = document.createElement("i");
  edit.className = "material-icons controlIcons";
  edit.innerText = "edit";
  navigationAddOn.appendChild(edit);
  let close = document.createElement("i");
  close.className = "material-icons controlIcons";
  close.innerText = "close";
  navigationAddOn.appendChild(close);

  document.getElementById("navbar").insertBefore(newElement, document.getElementById("add"));
});

$("#navbar").click(function () {
  componentHandler.upgradeDom();
})

$(".navigationAddOn").click(function () {
  if ($(this).context.id != "add") {
    $(".controlAddOn").addClass("controlAddOff");
    $(".controlAddOn").removeClass("controlAddOn");
    if ($(this).context.lastChild.className == "controlAddOff") {
      $(this).context.lastChild.className = "controlAddOn";
    }
  }
});
