'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var App = React.createClass({

// todos will change over time so we put them in an array.
  getInitialState: function(){
    return{ 
      todo: [

      ]
    }
  },

  toggleComplete: function(todoItem){
      
      var newTodoArray = this.state.todo.map(function(todo){
        if(todoItem === todo){
          todo.complete = !todo.complete;
        } 
        return todo;
      });

      this.setState({todo: newTodoArray});
  },


//components have data and the data creates the visual 
//properties and states. states we create inside of the componenet, 
//props we define on the component instances. <--------->

  renderTodo: function(value, index){
      return <Todo key={index} 
                   id={index} 
                   toggleComplete={this.toggleComplete} 
                   todoData={value} />;
  },

  addTodo: function(e){

      e.preventDefault();
    
      if(this.refs.addTodo.value){
          this.state.todo.push({ title: this.refs.addTodo.value, complete: false});
          this.setState({ todo: this.state.todo});
          this.refs.addTodo.value = '';
      }
  },

  render: function() {

    var number = this.state.todo.length;
    return (
      <div className="todo-list">
          <h1>Todo App</h1>
            <ul>
            <div className="add-todo">
            <form name="addToDoForm" onSubmit={this.addTodo}>
             <span> <input type="text" ref="addTodo"/>(hit Enter to add)</span>
              
            </form>
            </div>
              { this.state.todo.map(this.renderTodo) }

            </ul>
            <div className="todoCount">
              <div>
                {number}{number > 1 || number === 0 ? " todos" : " todo" }
              </div>
              <div>
    
              </div>
            </div>
      </div>
    )
  }
});


var Todo = React.createClass({
  

  getInitialState: function(){
    return {};
  },

  renderToggle: function() {
    //
    this.props.toggleComplete(this.props.todoData);

  },

  render: function(){
    return(
        <li> {this.props.todoData.title}
          <input type="checkbox" id={this.props.id} checked={this.props.todoData.complete} onClick={this.renderToggle}/>
            <label htmlFor={this.props.id} id={this.props.key}></label>
          <button><i className="fa fa-trash"></i></button>
        </li>
    )
  }
});

ReactDOM.render(<App />, document.querySelector('#todo-app'));


