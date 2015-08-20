<?php
//return a session key


$db = new PDO("sqlite:/var/databases/sust/database.sqlite");


if(isset($_GET['key'])) {

	$dbquery = $db->prepare("SELECT * FROM results WHERE shash = ? ORDER BY form_date DESC LIMIT 1");
	$result = $dbquery->execute(Array($_GET['key']));
	header('Content-type: application/json');
	while (($row = $dbquery->fetch()) !== false) {
		echo $row['data'];
	}


} else {

	echo gen_uuid(6);

}









function gen_uuid($len=8)
{
    $hex = md5("your_random_salt_here_31415" . uniqid("", true));

    $pack = pack('H*', $hex);

    $uid = base64_encode($pack);        // max 22 chars

    $uid = ereg_replace("[^A-Za-z0-9]", "", $uid);    // mixed case
    //$uid = ereg_replace("[^A-Z0-9]", "", strtoupper($uid));    // uppercase only

    if ($len<4)
        $len=4;
    if ($len>128)
        $len=128;                       // prevent silliness, can remove

    while (strlen($uid)<$len)
        $uid = $uid . gen_uuid(22);     // append until length achieved

    return substr($uid, 0, $len);
}

?>