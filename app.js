$("#addTasklist").click(function(){
  let newElement = document.createElement("div");
  newElement.className = "mdl-navigation__link";
  let input = document.createElement("input");
  input.className = "mdl-textfield__input";
  input.type = "text";
  componentHandler.upgradeElement(input);
  newElement.appendChild(input);
  document.getElementById("navbar").insertBefore(newElement, document.getElementById("addTasklist"));
});

