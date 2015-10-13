// App state
var state = {
  currentSlide: 0,
  data        : []
}

var bauerAds = {
   slots: []
} 

var SlideshowUC = React.createClass({
  render: function() {
    state.data = this.props.data;
    return (
      <div className="slideshow">
	    <Slides data={JSON.parse(state.data)} />
	    <Pagination data={JSON.parse(state.data)} />
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

	  if (slideNode.SlideType == 'slide') {
	  return (
	     <Slide Active={isActive} Slidetype={slideNode.SlideType} Index={slideNode.ItemIndex} Image={slideNode.Image} ImageAltText={slideNode.ImageAltText} Name={slideNode.Name} ImageCaption={slideNode.ImageCaption} Summary={slideNode.Summary} />
		);
	  }

	 if (slideNode.SlideType == 'mrec') {
	
	  return (
	     <SlideMrec Active={isActive} Slidetype={slideNode.SlideType} Index={slideNode.ItemIndex} Name={slideNode.Name} Summary={slideNode.Summary} />
		);
	  }


	  if (slideNode.SlideType == 'last') {
	
	  return (
	     <SlideLast Active={isActive} Slidetype={slideNode.SlideType} Index={slideNode.ItemIndex}  Name={slideNode.Name} Summary={slideNode.Summary} />
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
      'slide--active': this.props.Active
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
  buildAdSlot: function(index) {
	if (index == state.currentSlide) {
	  bauerAds.slots[index] = {adSlot: 'mobile-ad-' + index, index: index, isRendered: false, type: 'MREC', size: {width: 300, height: 250}};
	}
  },
 renderAd: function(index) {
	if (index == state.currentSlide) {
	  console.log("Rendering current slide ad " + index)
      renderDFPAd(index)
	}
  },
  render: function() {
    var classes = React.addons.classSet({
      'slide': true,
      'slide--active': this.props.Active
    });

    return (
      <div className={classes}>

	   <div className='mobile-ad' id={'mobile-ad-' + this.props.Index}></div>					
	    
		{this.buildAdSlot(this.props.Index)}
		{this.renderAd(this.props.Index)}

      </div>
    );
  }
});


function renderDFPAd(index) {

   console.log("renderDFPAd " + index);
   console.log(bauerAds.slots[index]);

   if (typeof bauerAds.slots[index] != 'undefined' && bauerAds.slots[index] != null) {

	    var adSlot = bauerAds.slots[index].adSlot;
	    var pos = bauerAds.slots[index].index;
	    var height = bauerAds.slots[index].size.height;
	    var width = bauerAds.slots[index].size.width;

		if (!bauerAds.slots[index].isRendered) {
		    googletag.defineSlot(bauerAds.section, [width, height], adSlot).setTargeting('pos', [pos]).addService(googletag.pubads());
			bauerAds.slots[index].isRendered = true;
		}

		googletag.display(adSlot);
		googletag.pubads().refresh([adSlot]);
	}


}


// Single Slide Last Item
var SlideLast = React.createClass({
  render: function() {
    var classes = React.addons.classSet({
      'slide': true,
      'slide--active': this.props.Active
    });
    return (
      <div className={classes}>
       <div className='headline'>{this.props.Name}</div>
      </div>
    );
  }
});


var Pagination = React.createClass({
  render: function() {
    var paginationNodes = this.props.data.map(function (paginationNode, index) {
      return (
        <Pager id={paginationNode.ItemIndex} Name={paginationNode.ItemIndex}  />
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
        <div className="toggle toggle--prev" onClick={this.togglePrev}></div>
        <div className="toggle toggle--next" onClick={this.toggleNext}></div>
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
	var parsedJson = JSON.parse(state.data);

    var index = parsedJson.map(function (el) {
      return (
        el.ItemIndex
      );
    });
    var currentIndex = index.indexOf(id);
    state.currentSlide = currentIndex;
    render(state);
  }
}


// Render
function render(state) {
  React.render(
    <SlideshowUC data={state.data} />,
    document.getElementById('react1')
  );
}


var EmptyMessage = React.createClass({
	render: function() {
	return (
		<div className="empty-message">No Data</div>
	);
	}
});
