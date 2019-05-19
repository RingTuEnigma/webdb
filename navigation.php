<?php
  $testdata = array("WebDev Project", "JavaDev Project", "KotlinDev Project");

  function prepareData(){
    $counter = 0;
    $data = array();
    foreach($GLOBALS["testdata"] AS $value){
      $data[$counter] = array("listName" => $value, "foreignId" => "tasklist".$counter);
      $counter = $counter + 1;
    }
    echo json_encode($data);
  }

  function updateNav(){
    $listName = $_POST["name"];
    $data = $GLOBALS["testdata"];
    $size = sizeof($data);
    $data[$size] = $listName;
    $name = $data[$size];
    $GLOBALS["testdata"][$size] = $listName;
    echo "$listName $size $name";
  }

  //updateNav();
  prepareData();
?>