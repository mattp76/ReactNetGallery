// App state
var state = {
  currentSlide: 0,
  data        : []
}

// State transitions
var actions = {
  toggleNext: function() {
    console.log("something worked");
    var current = state.currentSlide;
    var next = current + 1;
    if (next > state.data.length - 1) {
      next = 0;
    }
    state.currentSlide = next;
    render(state)
  },
  togglePrev: function() {
    console.log("something worked");
    var current = state.currentSlide;
    var prev = current - 1;
    if (prev < 0) {
      prev = state.data.length - 1;
    }
    state.currentSlide = prev;
    render(state);
  },
  toggleSlide: function(id) {
    console.log("something worked");
    var index = state.data.map(function (el) {
      return (
        el.ItemIndex
      );
    });
    var currentIndex = index.indexOf(id);
    state.currentSlide = currentIndex;
    render(state);
  }
}

var Slideshow = React.createClass({
  render: function() {
    return (
      <div className="slideshow">
        <Slides data={this.props.data} />
        <Pagination data={this.props.data} />
        <Controls />
      </div>
    );
  }
});

// Slides
var Slides = React.createClass({
  render: function() {
    var slidesNodes = this.props.data.map(function (slideNode, index) {
    var isActive = state.currentSlide === index;
      return (
        <Slide active={isActive} key={slideNode.ItemIndex} Image={slideNode.Image} ImageAltText={slideNode.ImageAltText} Name={slideNode.Name} ImageCaption={slideNode.ImageCaption} Summary={slideNode.Summary} />
      
	  );
    });
    return (
      <div className="slides">
        {slidesNodes}
      </div>
    );
  }
});

// Single Slide
var Slide = React.createClass({
  render: function() {
    var classes = React.addons.classSet({
      'slide': true,
      'slide--active': this.props.active
    });
    return (
      <div className={classes}>
        <img src={this.props.Image} alt={this.props.ImageAltText} />
        <h2>{this.props.Name}</h2>
        <h3>{this.props.ImageCaption}</h3>
        <p>{this.props.Summary}</p>
      </div>
    );
  }
});


var Controls = React.createClass({
  togglePrev: function() {
    actions.togglePrev();
  },
  toggleNext: function() {
    actions.toggleNext();
  },
  render: function() {
    return (
      <div className="controls">
        <div className="toggle toggle--prev" onClick={this.togglePrev}>Prev</div>
        <div className="toggle toggle--next" onClick={this.toggleNext}>Next</div>
      </div>
    );
  }
});

var Pagination = React.createClass({
  render: function() {
    var paginationNodes = this.props.data.map(function (paginationNode, index) {
      return (
        <Pager id={paginationNode.ItemIndex} key={paginationNode.ItemIndex} Name={paginationNode.ItemIndex}  />
      );
    });
    return (
      <div className="pagination">
        {paginationNodes}
      </div>
    );
  }
});

var Pager = React.createClass({
  toggleSlide: function() {
    console.log('toggle: ' + this.props.id);
    actions.toggleSlide(this.props.id);
  },
  render: function() {
    return (
      <span className="pager" onClick={this.toggleSlide}>{this.props.Name}</span>
    );
  }
});

var EmptyMessage = React.createClass({
  render: function() {
    return (
      <div className="empty-message">No Data</div>
    );
  }
});

function render(state) {
  var hasData = state.data.length > 0;
  var component;
  if (hasData) {
    component = <Slideshow data={state.data} />;
  }
  else {
    component = <EmptyMessage />;
  }
  React.render(
    component,
    document.getElementById('app')
  );
}

render(state);

setTimeout(function() {
  state.data = data;
  render(state);
}, 1000)