const React = require('react');
const Link = require('react-router-component').Link;
const Reflux = require('reflux');

const locationStore = require('../stores/location');
const locationActions = require('../actions/locations');

const Header = require('./header');

module.exports = React.createClass({
  mixins: [Reflux.connect(locationStore, 'location')],

  getInitialState() {
    return {
      location: {
        fields: {}
      }
    };
  },

  componentWillMount() {
    if(this.props.initialData &&
       this.props.initialData.data &&
       this.props.initialData.name === 'location'){
      this.setState({location: this.props.initialData.data});
    }
  },

  componentDidMount() {
    locationActions.loadOne(this.props.id);
  },

  render() {
    return (
      <div>
        <Link href="/">Home</Link>
        <Header title={this.state.location.fields.name} />
        <div className="content">
          <p>Type: {this.state.location.fields.type}</p>
          <p>Description: {this.state.location.fields.description}</p>
        </div>
      </div>
    );
  }
});
