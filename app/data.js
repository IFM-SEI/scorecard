var data = [];


var existing = {name:"Existing Groups"};

existing.questions = [
{q:"Safeguarding plan in place and agreed", g:"Either/Both"},
{q:"One or more leaders have undertaken WCF or Local SCB safeguarding training", g:"Group"},
{q:"Risk assessments in place for group nights", g:"Group"},
{q:"Health and consent forms obtained for children attending regularly", g:"Group"},
{q:"Local Safeguarding Officer in place, with appropriate support/training", g:"Either/Both"},
{q:"Volunteer Co-ordinator in place, with appropriate support/training", g:"Either/Both"},
{q:"Sufficient volunteers to ensure adult:child ratios are met for each age group", g:"Group"},
{q:"Membership & screening checks in place for all regular leaders", g:"Group"},
{q:"At least 50% of group leaders have attended New Leader Training", g:"Group"},
{q:"Group numbers stable or growing term by term", g:"Group"},
{q:"Group has a waiting list", g:"Group"},
{q:"Gender balance of children between 1:1 and 1:2", g:"Group"},
{q:"Demographics of children attending group reflective of the local community", g:"Group"},
{q:"Meeting venue secure for foreseeable future", g:"Group"},
{q:"Access to group/disctict bank account", g:"Either/Both"},
{q:"Subs (or gift-aidable parent/carer donations) being collected regularly", g:"Group"},
{q:"Potential sources of grant funding identified", g:"Either/Both"},
{q:"Group/district budget forecast in place", g:"Either/Both"},
{q:"Group contact  in place, with appropriate support/training", g:"Group"},
{q:"Membership secretary in place, with appropriate support/training", g:"Either/Both"},
{q:"Group treasurer  in place, with appropriate support/training", g:"Group"},
{q:"Group buddy/twin in place", g:"Group"},
{q:"Connection made with local volunteering centre", g:"Either/Both"},
{q:"Links with local schools established", g:"Either/Both"},
{q:"Participated in regional/national/UK-wide WCF events", g:"Either/Both"},
{q:"Group registered with Folk Office", g:"Group"},
{q:"Group webpage/FB page established and maintained", g:"Either/Both"},
{q:"Group/district is reviewing its impact and member satisfaction (e.g. Follow The Trail)", g:"Either/Both"},
{q:"Group programme is planned by leaders and helpers on a termly/half-termly basis", g:"Group"},
{q:"Group activities demonstrate and explore Woodcraft values", g:"Group"},
{q:"Group/district has undertaken or is following the Working Together programme", g:"Either/Both"},
{q:"Group/district delivers 'Introducing Woodcraft Folk' at least annually", g:"Either/Both"},
{q:"A supporter or shadow has been identified for each key role", g:"Either/Both"}];

existing.categories = [
{name:"Staying Safe",questions:[0,1,2,3,4,6,7,18]},
{name:"The People You Need",questions:[1,4,5,6,17,18,19,21,30,31]},
{name:"Being Part of Woodcraft Folk",questions:[7,10,11,17,20,23,24,25,26,27,28,29,30]},
{name:"Publicity & Outreach",questions:[8,9,11,21,22,30]},
{name:"Working Together",questions:[0,2,14,17,20,23,24,25,26,31]},
{name:"Programe Planning",questions:[2,5,6,12,22,26,27,28]},
{name:"Finance",questions:[8,12,13,14,15,16,19]},
{name:"Overall",questions:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]}]

data[0] = existing;

var newGroups = {name:"New Groups"};

newGroups.questions = [
{q:"Safeguarding plan in place and agreed", g:"Either/Both"},
{q:"One or more leaders have undertaken WCF or Local SCB safeguarding training", g:"Group"},
{q:"Risk assessments in place for group nights", g:"Group"},
{q:"Health and consent forms obtained for children attending regularly", g:"Group"},
{q:"Local Safeguarding Officer in place, with appropriate support/training", g:"Either/Both"},
{q:"Volunteer Co-ordinator in place, with appropriate support/training", g:"Either/Both"},
{q:"Sufficient volunteers to ensure adult:child ratios are met for each age group", g:"Group"},
{q:"Membership & screening checks in place for all regular leaders", g:"Group"},
{q:"At least 50% of group leaders have attended New Leader Training", g:"Group"},
{q:"Group numbers stable or growing term by term", g:"Group"},
{q:"Group has a waiting list", g:"Group"},
{q:"Gender balance of children between 1:1 and 1:2", g:"Group"},
{q:"Demographics of children attending group reflective of the local community", g:"Group"},
{q:"Meeting venue secure for foreseeable future", g:"Group"},
{q:"Access to group/disctict bank account", g:"Either/Both"},
{q:"Subs (or gift-aidable parent/carer donations) being collected regularly", g:"Group"},
{q:"Potential sources of grant funding identified", g:"Either/Both"},
{q:"Group/district budget forecast in place", g:"Either/Both"},
{q:"Group contact  in place, with appropriate support/training", g:"Group"},
{q:"Membership secretary in place, with appropriate support/training", g:"Either/Both"},
{q:"Group treasurer  in place, with appropriate support/training", g:"Group"},
{q:"Group buddy/twin in place", g:"Group"},
{q:"Connection made with local volunteering centre", g:"Either/Both"},
{q:"Links with local schools established", g:"Either/Both"},
{q:"Participated in regional/national/UK-wide WCF events", g:"Either/Both"},
{q:"Group registered with Folk Office", g:"Group"},
{q:"Group webpage/FB page established and maintained", g:"Either/Both"},
{q:"Group/district is reviewing its impact and member satisfaction (e.g. Follow The Trail)", g:"Either/Both"},
{q:"Group programme is planned by leaders and helpers on a termly/half-termly basis", g:"Group"},
{q:"Group activities demonstrate and explore Woodcraft values", g:"Group"},
{q:"Group/district has undertaken or is following the Working Together programme", g:"Either/Both"},
{q:"Group/district has delivered 'Introducing Woodcraft Folk'", g:"Either/Both"},
{q:"A supporter or shadow has been identified for each key role", g:"Either/Both"}];

newGroups.categories = [
{name:"Staying Safe",questions:[0,1,2,3,4,6,7,18]},
{name:"The People You Need",questions:[1,4,5,6,17,18,19,21,30,31]},
{name:"Being Part of Woodcraft Folk",questions:[7,10,11,17,20,23,24,25,26,27,28,29,30]},
{name:"Publicity & Outreach",questions:[8,9,11,21,22,30]},
{name:"Working Together",questions:[0,2,14,17,20,23,24,25,26,31]},
{name:"Programe Planning",questions:[2,5,6,12,22,26,27,28]},
{name:"Finance",questions:[8,12,13,14,15,16,19]},
{name:"Overall",questions:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]}]

data[1] = newGroups;



var projects = {name:"Projects"}
projects .questions=[
{q:"Safeguarding plan in place and agreed", g:"Either/Both"},
{q:"One or more leaders have undertaken WCF or Local SCB safeguarding training", g:"Group"},
{q:"Risk assessments in place for group nights", g:"Group"},
{q:"Health and consent forms obtained for children attending regularly", g:"Group"},
{q:"Local Safeguarding Officer in place, with appropriate support/training", g:"Either/Both"},
{q:"Volunteer Co-ordinator in place, with appropriate support/training", g:"Either/Both"},
{q:"Target number of adult volunteers identified", g:"Group"},
{q:"Membership & screening checks in place for all regular leaders", g:"Group"},
{q:"At least 50% of group leaders have attended New Leader Training", g:"Group"},
{q:"Target number of child places available in group", g:"Group"},
{q:"Target number of children attending the group regularly", g:"Group"},
{q:"Group has a waiting list", g:"Group"},
{q:"Gender balance of children between 1:1 and 1:2", g:"Group"},
{q:"Demographics of children attending group reflective of the local community", g:"Group"},
{q:"Meeting venue secure for foreseeable future", g:"Group"},
{q:"Access to group/disctict bank account", g:"Either/Both"},
{q:"Subs (or gift-aidable parent/carer donations) being collected regularly", g:"Group"},
{q:"Potential sources of grant funding identified", g:"Either/Both"},
{q:"Group/district budget forecast in place", g:"Either/Both"},
{q:"Group contact  in place, with appropriate support/training", g:"Group"},
{q:"Membership secretary in place, with appropriate support/training", g:"Either/Both"},
{q:"Group treasurer in place, with appropriate support/training", g:"Group"},
{q:"Group buddy/twin in place", g:"Group"},
{q:"Connection made with local volunteering centre", g:"Either/Both"},
{q:"Links with local schools established", g:"Either/Both"},
{q:"Participated in regional/national/UK-wide WCF events", g:"Either/Both"},
{q:"Group registered with Folk Office", g:"Group"},
{q:"Group webpage/FB page established and maintained", g:"Either/Both"},
{q:"Group/district is reviewing its impact and member satisfaction (e.g. Follow The Trail)", g:"Either/Both"},
{q:"Group programme is planned by leaders and helpers on a termly/half-termly basis", g:"Group"},
{q:"Group activities demonstrate and explore Woodcraft values", g:"Group"},
{q:"Group/district has undertaken or is following the Working Together programme", g:"Either/Both"},
{q:"Group/district has delivered 'Introducing Woodcraft Folk'", g:"Either/Both"},
{q:"A supporter or shadow has been identified for each key role", g:"Either/Both"}
];

projects .categories = [
{name:"Staying Safe",questions:[0,1,2,3,4,6,7,8,20]},
{name:"The People You Need",questions:[1,4,5,6,7,19,20,21,32,32]},
{name:"Being Part of Woodcraft Folk",questions:[8,12,13,19,22,25,26,27,28,29,30,31,32]},
{name:"Publicity & Outreach",questions:[9,10,11,13,23,24,32]},
{name:"Working Together",questions:[0,2,16,19,22,25,26,27,28,33]},
{name:"Programe Planning",questions:[2,5,6,7,9,14,24,28,29,30]},
{name:"Finance",questions:[14,15,16,17,18,21]},
{name:"Overall",questions:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33]}]

data[2] = projects;


 module.exports = data;