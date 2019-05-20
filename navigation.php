<?php
  session_start();
  if(isset($_SESSION['calls']) != true){
  $_SESSION['testdata'] = array("WebDev Project", "JavaDev Project", "KotlinDev Project");
  //$testdata = array("WebDev Project", "JavaDev Project", "KotlinDev Project");
  }

  function prepareData(){
    $_SESSION['calls'] = $_SESSION['calls'] + 1;
    $counter = 0;
    $data = array();
    foreach($_SESSION['testdata'] AS $value){
      $data[$counter] = array("listName" => $value, "foreignId" => "tasklist".$counter);
      $counter = $counter + 1;
    }
    echo json_encode($data);
  }

  function updateNav(){

    $listName = $_POST["name"];
    /*$data = $GLOBALS["testdata"];
    $size = sizeof($data);
    $data[$size] = $listName;
    $name = $data[$size];
    $GLOBALS["testdata"][$size] = $listName;*/
    array_push($_SESSION['testdata'], $listName);
    echo "$listName";
  }

  if(isset($_POST["name"])){
  updateNav();
  }
  prepareData();
?>