'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var App = React.createClass({

// todos will change over time so we put them in an array.
  getInitialState: function(){
    return{ 
      todo: []
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

  removeTodo: function(todoData){
    var newTodoArray = this.state.todo.filter(function(itemToRemove){
      return todoData === itemToRemove ? false : true;
    });
    this.setState({todo: newTodoArray});
  },

  renderTodo: function(value, index){
      return <Todo key={index} 
                   id={index} 
                   toggleComplete={this.toggleComplete} 
                   removeTodo={this.removeTodo}
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

  hasCompleted: function(){
    var completedArray = this.state.todo.filter(function(todoItem){
      return todoItem.complete === true;
    });  
    return completedArray.length;

  },    

  removeSelected: function(){
    
    var newTodoArray = this.state.todo.filter(function(todoItem){
      return todoItem.complete ? false : true;

    });    

    this.setState( {todo: newTodoArray});
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
            <div className="todo-admin">
              <div>
                {number}{number > 1 || number === 0 ? " todos" : " todo" }
              </div>
              <div>{ this.hasCompleted() ? 
                <button className="removeSelected" onClick={this.removeSelected}>Clear Finished</button> : ''
                }
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

  applyToggle: function() {
    
    this.props.toggleComplete(this.props.todoData);

  },

  tellParentToRemoveTodo: function() {
    this.props.removeTodo(this.props.todoData);
  },

  render: function(){
    return(
        <li>{this.props.todoData.title}
          <input type="checkbox" id={this.props.id} checked={this.props.todoData.complete} onClick={this.applyToggle}/>
            <label htmlFor={this.props.id} id={this.props.key}></label>
          <button onClick={this.tellParentToRemoveTodo}><i className="fa fa-trash"></i></button>
        </li>
    )
  }
});

ReactDOM.render(<App />, document.querySelector('#todo-app'));


