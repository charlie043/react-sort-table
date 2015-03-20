var _             = require('lodash');
var React         = require('react');

var Bootstrap     = require('react-bootstrap');
var Table         = Bootstrap.Table;

var Row = React.createClass({

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
        <td key={key}>{data[key]}</td>
      );
    });

    return (
      <tr className={this.props.className}>
        {cols}
      </tr>
    );
  }
});

var SortTable = React.createClass({

  propTypes: {
    data  : React.PropTypes.array,
    keys  : React.PropTypes.array,
    labels: React.PropTypes.object,
    flags : React.PropTypes.object
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
        <th key={key} onClick={this.sort(key)}>{label}<i style={iconStyle} className={icon} /></th>
      );
    }, this);

    var rows = this.state.data.map(function(row, index) {
      return (
        <Row key={index} keys={this.props.keys} data={row}  />
      );
    }, this);

    return (
        <Table responsive bordered hover>
          <thead>
            <tr>
              {labels}
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
    );
  }
});

module.exports = SortTable;
