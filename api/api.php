<?php
include "brainfuck.php";
include "util.php";

$func = $_POST['func'];
$instr = $_POST['instr'];

if ($func == 'tobf')
{
    echo fuck_text($instr);
}
elseif ($func == 'interpret')
{
    echo brainfuck($instr);
}
else
{
    echo "function error.";
}
?>