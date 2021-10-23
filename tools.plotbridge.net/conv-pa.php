<?php

require('vendor/autoload.php');

$chiaUtils = new ChiaUtils();

function main($ph){
    $addr = $chiaUtils->puzzleHashToAddress($ph);
    echo $addr;
}

main($_GET['ph']);

?>
