import Dispatcher from './dispatcher';
import E from 'event-emitter';
import D from './data';
import $ from 'jquery';


var session = {};

var localData = localStorage.getItem("sessionData");

if(localData) {
	session = JSON.parse(localData);
} else {
	session.group = "";
	session.card = 0;
	session.cardName = D[0].name;
	session.data = []
	session.data[session.card] = [];
	session.catresults=[];
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
		case "syncData":
			save();
			break;
	};
});


var save = function() {
	var data = JSON.stringify(session);
	localStorage.setItem("sessionData",data);
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
	$.post('save.php', {sessionData:data}, function() {
		setTimeout(fireSync,2000);
	});
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

var getQuestion = function(q) {
	return session.data[session.card][q];
}

//eval();

exports.getCard = getCard;
exports.getGroup = getGroup;
exports.getPercent = getPercent;
exports.getQuestion = getQuestion;
//exports.setDataset = setDataset;