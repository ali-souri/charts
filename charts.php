<?php

ini_set('display_startup_errors',1);
ini_set('display_errors',1);
error_reporting(-1);

header('Content-type: application/json; charset=utf-8');

$filestringwithhash = $_POST['hash'];

$filestring = substr($filestringwithhash, 1);

$filename = "./samples/" . $filestring . ".html";

$json_errore_array = Array("0"=>Array("status"=>"false"));

if (file_exists($filename)) {

    //echo $filename;
    
    $html = file_get_contents($filename);
    
    $json_success_array = Array("0"=>Array("status"=>"true","address"=>$filename,"html"=>$html));
    
    echo json_encode($json_success_array);    
    
}  else {
    
    echo json_encode($json_errore_array);
    
}

?>
   