import React from 'react';
import ReactDOM from 'react-dom';
import D from './data';
import Store from './store';
import Dispatcher from './dispatcher'
import Spinner from 'react-spinner'

var App = React.createClass({

	componentDidMount:function() {
		Store.e.on("synced", this.saved);
		Store.e.on("scoreUpdated", this.change);
	},

	componentWillUnmount:function() {
		Store.e.off("synced", this.saved);
		Store.e.on("scoreUpdated", this.change);
	},

	getInitialState: function() {
    	return {comment:Store.getComment(),group:Store.getGroup(),district:Store.getDistrict(),dataSet:Store.getCard(), groupType:Store.getGroupType(), validating: false,saved: false, hasSaved:false};
  	},

  	change: function() {
    	this.setState({comment:Store.getComment(),group:Store.getGroup(),district:Store.getDistrict(),dataSet:Store.getCard(), groupType:Store.getGroupType(), validating: false,saved: false, hasSaved:false});
  	},

	handleChangeGroup: function(event) {

		this.setState({group:event.target.value,validating: true});
		Dispatcher.dispatch({action:"setGroup",set:event.target.value});

	},


  handleChangeDistrict: function(event) {

    this.setState({district:event.target.value,validating: true});
    Dispatcher.dispatch({action:"setDistrict",set:event.target.value});

  },


	selectDataSet: function(event) { 

		Dispatcher.dispatch({action:"setDataset",set:event.target.value});
		this.setState({dataSet:event.target.value});

	},

	selectGroupType: function(event) { 

		Dispatcher.dispatch({action:"setGroupType",set:event.target.value});
		this.setState({groupType:event.target.value});

	},

	handleBlur: function () {
 		 this.setState({validating: true});
	},

	saveResult: function () {
		 Dispatcher.dispatch({action:"syncData"});
 		 this.setState({saved: true});
	},

  updateComment: function (event) {
     Dispatcher.dispatch({action:"setComment",set:event.target.value});
     this.setState({comment:event.target.value});
  },


	resetForm: function () {
		 if(confirm("Are you sure you want to reset? Any unsaved data will be lost"))Dispatcher.dispatch({action:"resetForm"});
	},


	saved: function () {
		this.setState({hasSaved: this.state.saved ? true : false});
		this.setState({saved: false});
	},


  render: function() {

  	var options = D.map(function(v,k) {

  		return(<option key={k} value={k}>{v.name}</option>);

  	});

    var commentStyle = {width:"100%",height:"80px"};

  	var imgStyle= {height:"75px"};
  	var spinStyle = {width:"27px", height:"27px", float:"left"};
  	var textStyle = {};

  	spinStyle.display = this.state.saved ?  "block" : "none";
  	textStyle.display = this.state.hasSaved ?  "block" : "none";

  	var inputClassG = this.state.validating ? this.state.group === "" ? "form-group has-error" :"form-group has-success" : "form-group";
    var inputClassD = this.state.validating ? this.state.district === "" ? "form-group has-error" :"form-group has-success" : "form-group";

    var shade = this.state.group !== "" && this.state.district !== "" ? "none" : "block";
    var shadeStyle = {top:"0px",left:"0px",width:"100vw",height:"100vh",display:shade, position:"fixed",background:"#ffffff",opacity:0.8, zIndex:50};
    var z = {zIndex:100,position:"relative"};
    
    return (<div className="row">
            <div style={shadeStyle}></div>

    			<div className="col-sm-12" style={z}>
    				<a href="https://www.woodcraft.org.uk"><img src="logo.png" style={imgStyle} className="pull-right" /></a>
    				<h1>Sustainability Scorecard</h1>
    			</div>
    			<div className="col-sm-8">
    				<div className="panel panel-default hidden-print" style={z}>
  						<div className="panel-body" >
  						<form className="form-inline">
              <div className={inputClassD}>
              <lable className="control-label">District: </lable><input autoFocus onBlur={this.handleBlur} className="form-control" type="text" onChange={this.handleChangeDistrict} value={this.state.district}/>
              </div>

  						<div className={inputClassG}>
							<lable className="control-label">&nbsp;&nbsp;&nbsp;Group: </lable><input  onBlur={this.handleBlur} className="form-control" type="text" onChange={this.handleChangeGroup} value={this.state.group}/>
							</div>

              <div className="form-group">
              <lable className="control-label">&nbsp;&nbsp;&nbsp;Type: </lable><select className="form-control" onChange={this.selectGroupType} value={this.state.groupType}>
                <option name="Woodchip">Woodchip</option>
                <option name="Elfin">Elfin</option>
                <option name="Pioneer">Pioneer</option>
                <option name="Venturer">Venturer</option>
                <option name="DF">DF</option>
                <option name="Open">Open</option>
                <option name="NA">N/A</option>
              </select>
              </div>

							<div className="form-group">
							<lable className="control-label">&nbsp;&nbsp;&nbsp;Card: </lable><select className="form-control" onChange={this.selectDataSet} value={this.state.dataSet}>{options}</select>
							</div>
							
						</form>
						</div>						
					</div>
					<div className="visible-print-block visible-print"><h2>{this.state.group}</h2></div>
    				<Questions dataSet={D[this.state.dataSet]}  />
    			</div>
    			<div className="col-sm-4">
    				<Results dataSet={D[this.state.dataSet]}/>
            <p>Additional notes or comments?</p>
            <textarea style={commentStyle} value={this.state.comment} onChange={this.updateComment} />
    				<div className="clearfix">
    					<button type="button" onClick={this.saveResult} className="btn btn-success pull-left hidden-print">Save</button>
    					<button type="button" onClick={this.resetForm} className="btn btn-warning pull-left hidden-print">Reset</button>
    					<div style={spinStyle}><Spinner/></div>
    				</div>
    				<div style={textStyle} className="alert alert-success voffset2"><p>Thank you for taking the time to fill this out, you can bookmark this page, save the <a href={window.location.href}>link</a>, or <a href="javascript:print()">print</a> this page for future reference.</p></div>
    			</div>
      		</div>);
  }
});

var Results = React.createClass({

  render: function() {
  	var key = this.props.dataSet.name;
  	var catList = this.props.dataSet.categories.map(function(v,k){
  		 //force rerender on dataset change
  		return(<CategoryRow key={key+k} id={k} data={v} />);
  	});

    return (<div className="row">
    			
    			<div className="col-sm-12">
    			<div className="panel panel-default">
    				<div className="panel-heading"><h4>Scoring Rationale</h4></div>
    				<div className="panel-body">
    					<table className="table rational">
    						<tbody>
    						<tr><td>0</td><td>Not in place, not progressed, no target date in place</td></tr>
							<tr><td>1</td><td>Not yet in place, but progress behind target</td></tr>
							<tr><td>2</td><td>Not yet in place, on track to achieve target date</td></tr>
							<tr><td>3</td><td>In place, complete</td></tr>
							</tbody>
						</table>
					</div>
				</div>
				</div>
				<div className="col-sm-12">
					<table className="table scorecard">
						<tbody>
    					{catList}
    					</tbody>
    				</table>
    			</div>
      		</div>);
  }
});

var CategoryRow = React.createClass({

	componentDidMount: function(){
		Store.e.on("scoreUpdated", this.change);
	},

	componentWillUnmount: function(){
		Store.e.off("scoreUpdated", this.change);
	},

	getInitialState: function() {
    	return {percent:Store.getPercent(this.props.id)};
  	},

  	change: function() {

  		this.setState({percent:Store.getPercent(this.props.id)})
  	},

  render: function() {

  	var colour = "#9F2936";
  	if(this.state.percent > 55)colour = "#FF8C00";
  	if(this.state.percent > 75)colour = "#FFD700";
  	if(this.state.percent > 85)colour = "#228B22";

  	var style = {background:colour};

    return (<tr>
    			<td><h4>{this.props.data.name}</h4></td>

    			<td className="box">
    				<div style={style}>{this.state.percent.toFixed(0)}%</div>
      			</td>
      		</tr>);
  }
}); 

var Questions = React.createClass({

  render: function() {
  	var key = this.props.dataSet.name;
  	var rows = this.props.dataSet.questions.map(function(v,k){
  		return(<QuestionRow key={key+k} id={k} data={v} />);
  	});

    return (<div className="row">
    		 <div className="col-sm-12"><table className="table table-striped">
    		 	<tbody>
    			<tr><th>Item</th><th>Group/District</th><th>Score</th></tr>
    			{rows}
    			</tbody>
    		</table></div></div>);
  }
});

function getTarget(e) {
    var targ;

    if (!e) {
        e = window.event;
    }

    if (e.target) {
        targ = e.target;
    } else if (e.srcElement) {
        targ = e.srcElement;
    }

    if (targ.nodeType == 3) { // defeat Safari bug
        targ = targ.parentNode;
    }

    return targ;
}

var QuestionRow = React.createClass({

	componentDidMount: function(){
		Store.e.on("scoreUpdated", this.change);
	},

	componentWillUnmount: function(){
		Store.e.off("scoreUpdated", this.change);
	},


  	change: function() {

  		this.setState({score:Store.getQuestion(this.props.id)})
  	},

	getInitialState: function() {
    	return {score:Store.getQuestion(this.props.id)};
  	},

  	handleChange: function(event) {
  	var num = parseInt(getTarget(event).value);
  	if(num > 3)num = 3;
  	if(num < 0)num = 0;
  	Dispatcher.dispatch({action:"updateScore",question:this.props.id,score:num});
    this.setState({score: num});
 	},

	render: function(){

		return (
			<tr><td>{this.props.data.q}</td><td>{this.props.data.g}</td><td><input type="number" min="0" max="3" onChange={this.handleChange} value={this.state.score} /></td></tr>)

	},

});



ReactDOM.render(
  <App />,
  document.getElementById('scorecard-content')
);





