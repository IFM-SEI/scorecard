<?php


$db = new PDO("sqlite:/var/databases/sust/database.sqlite");
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->exec("CREATE TABLE IF NOT EXISTS results (id INTEGER PRIMARY KEY ASC AUTOINCREMENT, wgroup TEXT, data TEXT, form_date TEXT, ip TEXT)");

$dbupdate = $db->prepare("UPDATE results SET wgroup = ?, data = ?, form_date = datetime('now'), ip = ? WHERE wgroup = ?  AND DATE(form_date) = DATE('now')");
$dbinsert = $db->prepare("INSERT INTO results (wgroup, data, form_date, ip) VALUES (?, ?, datetime('now'), ?)"); 

print_r($_POST);

if(isset($_POST['sessionData'])){

	$session = json_decode($_POST['sessionData']);
	$ip = $_SERVER['REMOTE_ADDR'];
	$groupname = $session->group.'-'.$session->cardName;

	$dbupdate->execute (array($groupname, $_POST['sessionData'], $ip, $groupname));

	if($dbupdate->rowCount() == 0 ){
		$dbinsert->execute (array($groupname, $_POST['sessionData'], $ip));
	}
}
?>