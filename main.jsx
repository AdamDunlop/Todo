var React = require('react');
var ReactDOM = require('react-dom');

var TweetBox = React.createClass({

  propTypes: {
    maxLength: React.PropTypes.number.isRequired
  },

  getDefaultProps: function(){
    return{
      maxLength: 140
    }
  },

  getInitialState: function(){
    return {
        text: '',
        photoAdded: false
    }
  },

  handleChange: function(e){
    this.setState({ text: e.target.value });
  },

  remainingChars: function(){
    if(this.state.photoAdded){
      return (this.props.maxLength - 23 - this.state.text.length);
    } else {
      return (this.props.maxLength - this.state.text.length);
    }
  },

  overflowAlert: function(){
    if(this.remainingChars() < 0 ){
        if(this.state.photoAdded) {
          var beforeOverflowText = this.state.text.substring(this.props.maxLength - 33, this.props.maxLength);
          var overflowText = this.state.text.substring(this.props.maxLength - 23 );
        } else {
          var beforeOverflowText = this.state.text.substring(this.props.maxLength - 10 , this.props.maxLength);
          var overflowText = this.state.text.substring(this.props.maxLength);
        }
      return(
        <div className="alert alert-warning">
          <strong>
            Your Tweet is Too fuckin Long: &nbsp {beforeOverflowText}<span className="bg-danger"> {overflowText}</span>
            </strong>
        </div>
      )
    } else{
      return "";
    }
  },

    togglePhoto: function(){
      this.setState({ photoAdded: !this.state.photoAdded })
    },

  render: function(){
    return (
      <div className="well clearfix">
        { this.overflowAlert() }
        <textarea onChange={this.handleChange} className="form-control"></textarea><br/>
        <span>{this.remainingChars() }</span>
          <button className="btn btn-primary pull-right" disabled = { this.state.text.length === 0 && !this.state.photoAdded }>Tweet</button>
          <button className="btn btn-default pull-right" onClick = {this.togglePhoto}>{ this.state.photoAdded ? "Photo Added!" : "Add Photo" } </button>
      </div>
    )
  }
});

var MultiTweet = React.createClass({
  render: function(){
    return (
    <div>
      <TweetBox maxLength={20}/>
      <TweetBox maxLength={200}/>
      <TweetBox maxLength={300}/>
      <TweetBox />
    </div>
     )
  }
})

ReactDOM.render(<MultiTweet />, document.querySelector('.tweet-box'));
