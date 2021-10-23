<?php

require('vendor/autoload.php');

$chiaUtils = new ChiaUtils();

function main($addr){
    $ph = $chiaUtils->addressToPuzzleHash($addr);
    echo $ph;
}

main($_GET['addr']);

?>
