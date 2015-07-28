import React from 'react';
import D from './data';
import Store from './store';
import Dispatcher from './dispatcher'
import Spinner from 'react-spinner'

var App = React.createClass({

	componentDidMount:function() {
		Store.e.on("synced", this.saved);
	},

	componentWillUnmount:function() {
		Store.e.off("synced", this.saved);
	},

	getInitialState: function() {
    	return {group:Store.getGroup(),dataSet:Store.getCard(),validating: false,saved: false};
  	},

	handleChange: function(event) {

		this.setState({group:event.target.value,validating: true});
		Dispatcher.dispatch({action:"setGroup",set:event.target.value});

	},

	selectDataSet: function(event) { 

		Dispatcher.dispatch({action:"setDataset",set:event.target.value});
		this.setState({dataSet:event.target.value});

	},

	handleBlur: function () {
 		 this.setState({validating: true});
	},

	saveResult: function () {
		 Dispatcher.dispatch({action:"syncData"});
 		 this.setState({saved: true});
	},

	saved: function () {
		this.setState({saved: false});
	},


  render: function() {

  	var options = D.map(function(v,k) {

  		return(<option key={k} value={k}>{v.name}</option>);

  	});

  	var imgStyle= {height:"75px"};
  	var spinStyle = {width:"27px", height:"27px", marginLeft:"50px"};

  	spinStyle.display = this.state.saved ?  "block" : "none";

  	var inputClass = this.state.validating ? this.state.group === "" ? "form-group has-error" :"form-group has-success" : "form-group";

    return (<div className="row">

    			<div className="col-sm-12">
    				<a href="https://www.woodcraft.org.uk"><img src="logo.png" style={imgStyle} className="pull-right" /></a>
    				<h1>Sustainability Scorecard</h1>
    			</div>
    			<div className="col-sm-8">
    				<div className="panel panel-default hidden-print">
  						<div className="panel-body">
  						<form className="form-inline">
  							<div className={inputClass}>
							<lable className="control-label">Group: </lable><input autoFocus onBlur={this.handleBlur} className="form-control" type="text" onChange={this.handleChange} value={this.state.group}/>
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
    				<button type="button" onClick={this.saveResult} className="btn btn-success pull-left hidden-print">Save</button>
    				<div style={spinStyle}><Spinner/></div>
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
							<tr><td>0</td><td>Not yet in place, on track to achieve target date</td></tr>
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

var QuestionRow = React.createClass({

	getInitialState: function() {
    	return {score:Store.getQuestion(this.props.id)};
  	},

  	handleChange: function(event) {
  	var num = parseInt(event.target.value);
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



React.render(
  <App />,
  document.getElementById('scorecard-content')
);





