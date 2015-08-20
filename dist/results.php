<?php

$db = new PDO("sqlite:/var/databases/sust/database.sqlite");

$dbquery = $db->prepare("SELECT * FROM results ORDER BY form_date ASC"); 

header("Content-Type: text/csv");
header("Content-Disposition: attachment; filename=\"scorecard_results_".date("Y-m-d").".csv\"");

$result = $dbquery->execute();


printf('Group,Type,Card,Last Modified,');

    for($i = 0; $i <40; $i++){

    	printf("Q%u,",$i);

    }

printf('Percentages:,');
print "\n";


while (($row = $dbquery->fetch()) !== false) {


    $data = json_decode($row['data']);

    printf('"%s",%s,%s,%s,',$data->group,$data->groupType, $data->cardName,$row['form_date']);

    for($i = 0; $i <40; $i++){

    	if(isset($data->data[$data->card][$i]))printf("%u,",$data->data[$data->card][$i]);
    	else print ",";

    }

    foreach($data->catresults as $cat) {

    	printf("%s,%.2f%%,",$cat->name,$cat->percent,null);

    }



    print "\n";
}








?>