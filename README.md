# react-sort-table

### dependent
- [font-awesome](http://fortawesome.github.io/Font-Awesome/)

### install
```
$ npm install react-sort-table
```

### use
- css

Easiest

Paste the following code into the `<head>` section of your site's HTML
```html
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
```
[other way](http://fortawesome.github.io/Font-Awesome/get-started/)

- script
```javascript
var React     = require('react');
var SortTable = require('react-sort-table');

var App = React.createClass({
  render: function() {

    // data of list
    var data = [
      {id: 'id-0', name: 'Charlie',  score: 100, other: (<input />)},
      {id: 'id-1', name: 'haruyama', score: 5  , other: (<button>push!</button>)},
      {id: 'id-2', name: 'motegi',   score: 10 , other: (<div>thank you</div>)}
    ];
  
    // items of table
    var keys = ['id', 'name', 'score', 'other'];
  
    // label of keys
    // place in thead ( thead set key by default ) 
    var labels = {
      id    : 'user id'   ,
      name  : 'user name' ,
      score : 'high score',
      other : 'some labels'
    };
  
    return (
      <SortTable
        data={data}
        keys={keys},
        labels={labels}
      />
    );
  }
});

React.render(<App />, document.body);

```
