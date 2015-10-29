import Dispatcher from './dispatcher';
import E from 'event-emitter';
import D from './data';
import $ from 'jquery';


var chars = 0;

var session = {};

var localData = false;

if(storageAvailable("localStorage"))localData = localStorage.getItem("sessionData");

var clearData = function() {

	session.hash = "";
	session.group = "";
	session.district = "";
	session.groupType= "Elfin";
	session.card = 0;
	session.cardName = D[0].name;
	session.data = []
	session.data[session.card] = [];
	session.catresults=[];
	session.comment = "";

}

if(window.location.hash) {
	clearData();
	//get data
	$.getJSON('get_session.php', {key:window.location.hash.replace("#","")}, function(data) {
		session = data;
		window.location.hash = session.hash;
		exports.e.emit("scoreUpdated");
		//exports.e.emit("synced");
	});

} else if(localData) {
	session = JSON.parse(localData);
	window.location.hash = session.hash;

} else {
	//get a hash

	$.get('get_session.php', null, function(data) {
		session.hash = data;
		//window.location.hash = session.hash;
	});
	
	clearData();
}


//var dataSet = D[0]

exports.e = new E();

exports.token = Dispatcher.register(function(payload){
	switch(payload.action) {
		case "updateScore":
			updateScore(payload);
			break;
		case "setDataset":
			setDataset(payload);
			break;
		case "setGroup":
			setGroup(payload);
			break;
		case "setDistrict":
			setDistrict(payload);
			break;
		case "setGroupType":
			setGroupType(payload);
			break;
		case "setComment":
			setComment(payload);
			break;
		case "syncData":
			save();
			break;
		case "resetForm":
			resetForm();
			break;
	};
});

var resetForm = function() {
	clearData();
	window.location.hash = "";
	exports.e.emit("scoreUpdated");
	$.get('get_session.php', null, function(data) {
		session.hash = data;
		//window.location.hash = session.hash;
	});
}

var save = function() {
	var data = JSON.stringify(session);
	if(storageAvailable("localStorage")) {
			localStorage.setItem("sessionData",data);
	} else {
		$.get("nostorage");
	}
	//compute category state for database;
	session.catresults=[];
	D[session.card].categories.map(function(c,k){
		var result = {name:c.name,percent:getPercent(k)};
		session.catresults.push(result);
	});

	var fireSync = function() {
		exports.e.emit("synced");
	};
	//ajaxx save

	$.ajax({
  	 type: "POST",
 	 url: 'save.php',
     data: {sessionData:data},
     success: function() {
		window.location.hash = session.hash;
		setTimeout(fireSync,2000);
	},
	async:true,
	cache:false

	});
	 /*
	$.post('save.php', {sessionData:data}, function() {
		window.location.hash = session.hash;
		setTimeout(fireSync,2000);
	});
	*/
}


var updateScore = function(p) {
	session.data[session.card][p.question] = p.score;
	save();
	exports.e.emit("scoreUpdated");
}

var setDataset = function(d) {
	session.card = d.set;
	session.cardName = D[session.card].name
	if(!session.data[session.card])session.data[session.card] = []
	save();
}

var setGroup = function(d) {

	session.group = d.set;
}

var setDistrict = function(d) {

	session.district = d.set;
}

var setGroupType = function(d) {

	session.groupType = d.set;
}

var setComment = function(d) {

	session.comment = d.set;

	if (chars % 10 == 0)save();//HORRIBLE HACK SAVE EVERY 10 CHARS.
	chars++;
}

var getPercent = function(c) {
	var total = 0;
	D[session.card].categories[c].questions.map(function(v){if(session.data[session.card][v])total += session.data[session.card][v];});
	var percent = (total * 100) / (D[session.card].categories[c].questions.length * 3);
	return percent;
}

var getCard = function() {
	return session.card;
}

var getGroup = function() {
	return session.group;
}

var getDistrict = function() {
	return session.district;
}

var getGroupType = function() {
	return session.groupType;
}

var getQuestion = function(q) {
	return session.data[session.card][q];
}

var getComment = function(q) {
	return session.comment;
}

//eval();

function storageAvailable(type) {
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}

exports.getCard = getCard;
exports.getGroup = getGroup;
exports.getDistrict = getDistrict;
exports.getGroupType = getGroupType;
exports.getPercent = getPercent;
exports.getQuestion = getQuestion;
exports.getComment = getComment;
//exports.setDataset = setDataset;