'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var App = React.createClass({

// todos will change over time so we put them in an array.
  getInitialState: function(){
    return{ 
      todo: [
        { title: 'Todo:', complete: false },
        { title: 'Todo1:', complete: false },
        { title: 'Todo2:', complete: false },
        { title: 'Todo3:', complete: false }
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

  render: function() {
    return (
      <div className="todo-list">
          <h1>Todo App</h1>
            <ul>
            
              { this.state.todo.map(this.renderTodo) }

            </ul>
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


