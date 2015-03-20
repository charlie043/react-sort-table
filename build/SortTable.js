var _             = require('lodash');
var React         = require('react');

var Bootstrap     = require('react-bootstrap');
var Table         = Bootstrap.Table;

var Row = React.createClass({displayName: "Row",

  propTypes: {
    data: React.PropTypes.object,
    keys: React.PropTypes.array
  },

  getDefaultProps: function() {
    return {
      data: {},
      keys: []
    };
  },

  render: function() {
    var data = this.props.data;

    var cols = this.props.keys.map(function(key) {
      return (
        React.createElement("td", {key: key}, data[key])
      );
    });

    return (
      React.createElement("tr", {className: this.props.className}, 
        cols
      )
    );
  }
});

var SortTable = React.createClass({displayName: "SortTable",

  propTypes: {
    data : React.PropTypes.array,
    keys : React.PropTypes.array,
    label: React.PropTypes.object,
    flags: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      data  : [],
      keys  : [],
      labels: {},
      flags : {}
    };
  },

  getInitialState: function() {

    var flags = _.reduce(this.props.keys, function(ret, key) {
      if (!this.props.flags[key]) ret[key] = false;
      return ret;
    }, {}, this);

    return {
      data  : this.props.data,
      sortFlags : flags,
      sortPriority: this.props.keys
    }
  },

  sort: function(key) {
    var self = this;
    return function() {
      var flags = self.state.sortFlags;

      var priority = _.remove(self.state.sortPriority, key);
      priority.unshift(key);

      var order = _.map(priority, function(_key) {
        return (_key === key) ? !flags[_key] : flags[_key];
      });

      self.setState({
        data        : _.sortByOrder(self.props.data, priority, order),
        sortFlags   : _.zipObject(priority, order),
        sortPriority: priority
      });
    }
  },

  render: function() {

    var labels = this.props.keys.map(function(key) {
      var label = this.props.labels[key] || key;
      var flag = !!this.state.sortFlags[key];
      var icon = flag ? 'fa fa-caret-square-o-up' : 'fa fa-caret-square-o-down';
      var iconStyle = {
        marginLeft: 20
      };
      return (
        React.createElement("th", {key: key, onClick: this.sort(key)}, label, React.createElement("i", {style: iconStyle, className: icon}))
      );
    }, this);

    var rows = this.state.data.map(function(row, index) {
      return (
        React.createElement(Row, {key: index, keys: this.props.keys, data: row})
      );
    }, this);

    return (
        React.createElement(Table, {responsive: true, bordered: true, hover: true}, 
          React.createElement("thead", null, 
            React.createElement("tr", null, 
              labels
            )
          ), 
          React.createElement("tbody", null, 
            rows
          )
        )
    );
  }
});

module.exports = SortTable;
