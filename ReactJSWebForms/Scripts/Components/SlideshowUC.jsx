// App state
var state = {
  currentSlide: 0,
  data        : []
}


var SlideshowUC = React.createClass({
  render: function() {

    state.data = this.props.data;
    return (
      <div className="slideshow">
	  <Slides data={JSON.parse(state.data)} />
        <Controls />
      </div>
    );
  }
});


// Render
function render(state) {
  React.render(
    <SlideshowUC data={state.data} />,
    document.getElementById('react1')
  );
}


// Slides
var Slides = React.createClass({
  slideToRender: function(slideNode, isActive) {
	
	   console.log(slideNode);
		return (
		 <Slide active={isActive} slidetype={slideNode.SlideType} key={slideNode.ItemIndex} Image={slideNode.Image} ImageAltText={slideNode.ImageAltText} Name={slideNode.Name} ImageCaption={slideNode.ImageCaption} Summary={slideNode.Summary} />
		
		 );
      
	
  },
  render: function() {
    var slidesNodes = this.props.data.map(function (slideNode, index) {
    var isActive = state.currentSlide === index;
      
	  if (slideNode.SlideType == 'slide') {
	
	  return (
	     <Slide active={isActive} slidetype={slideNode.SlideType} key={slideNode.ItemIndex} Image={slideNode.Image} ImageAltText={slideNode.ImageAltText} Name={slideNode.Name} ImageCaption={slideNode.ImageCaption} Summary={slideNode.Summary} />
		);
	  }

	 if (slideNode.SlideType == 'mrec') {
	
	  return (
	     <SlideMrec active={isActive} slidetype={slideNode.SlideType} key={slideNode.ItemIndex} Image={slideNode.Image} ImageAltText={slideNode.ImageAltText} Name={slideNode.Name} ImageCaption={slideNode.ImageCaption} Summary={slideNode.Summary} />
		);
	  }


	  if (slideNode.SlideType == 'last') {
	
	  return (
	     <SlideLast active={isActive} slidetype={slideNode.SlideType} key={slideNode.ItemIndex} Image={slideNode.Image} ImageAltText={slideNode.ImageAltText} Name={slideNode.Name} ImageCaption={slideNode.ImageCaption} Summary={slideNode.Summary} />
		);
	  }

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
        <div className='headline'>{this.props.Name}</div>
        <img src={this.props.Image} alt={this.props.ImageAltText} />
        <div className='caption'>{this.props.Summary}</div>
      </div>
    );
  }
});


// Single Slide MREC
var SlideMrec = React.createClass({
  render: function() {
    var classes = React.addons.classSet({
      'slide': true,
      'slide--active': this.props.active
    });
    return (
      <div className={classes}>
      <div className='headline'>{this.props.Name}</div>
      </div>
    );
  }
});


// Single Slide Last Item
var SlideLast = React.createClass({
  render: function() {
    var classes = React.addons.classSet({
      'slide': true,
      'slide--active': this.props.active
    });
    return (
      <div className={classes}>
       <div className='headline'>{this.props.Name}</div>
      </div>
    );
  }
});





var Controls = React.createClass({
  togglePrev: function(e) {
    e.preventDefault();
    actions.togglePrev();
  },
  toggleNext: function(e) {
    e.preventDefault();
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

// State transitions
var actions = {
  toggleNext: function() {
    console.log("something worked");
    var current = state.currentSlide;
    var next = current + 1;

	var parsedJson = JSON.parse(state.data);

    if (next > parsedJson.length - 1) {
	  console.log(next);
      next = 0;
    }
    state.currentSlide = next;
    render(state)
  },
  togglePrev: function() {
    console.log("something worked");
    var current = state.currentSlide;
    var prev = current - 1;
	var parsedJson = JSON.parse(state.data);

    if (prev < 0) {
      prev = parsedJson.length - 1;
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
