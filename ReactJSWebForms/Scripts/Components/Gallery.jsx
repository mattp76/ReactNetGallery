var data = [
   {
      Id:41105,
      ItemIndex:0,
      Name:"1",
      Title:"1",
      IsSelected:true,
      ThumbnailImage:"//assets.cougar.nineentertainment.com.au/Assets/Elle/2014/09/15/40974/9-clutch-(2).jpg?Height=225\u0026Width=150\u0026Class=upsize\u0026Mode=Crop\u0026VAlign=Top\u0026Align=Center\u0026anchor=TopCenter",
      ThumbnailImageAltText:null,
      Image:"//assets.cougar.nineentertainment.com.au/Assets/Elle/2014/09/15/40974/9-clutch-(2).jpg?MaxHeight=650\u0026MaxWidth=803\u0026Constrain=true\u0026VAlign=Top\u0026Align=Center\u0026anchor=TopCenter",
      LargeImage:"//assets.cougar.nineentertainment.com.au/Assets/Elle/2014/09/15/40974/9-clutch-(2).jpg?Width=1900\u0026Mode=Crop\u0026VAlign=Top\u0026Align=Center\u0026anchor=TopCenter",
      ImageCaption:null,
      ImageAltText:null,
      Summary:"\u003cstrong\u003e1. Hold me closer\u003c/strong\u003e\u003cbr\u003e\nThe fash pack are clutching onto this wardrobe staple; don\u0027t expect the oversized carry-all to go anywhere any time soon."
   },
   {
      Id:41144,
      ItemIndex:1,
      Name:"2",
      Title:"2",
      IsSelected:false,
      ThumbnailImage:"//assets.cougar.nineentertainment.com.au/Assets/Elle/2014/09/15/41144/9-clutch-(1).jpg?Height=225\u0026Width=150\u0026Class=upsize\u0026Mode=Crop\u0026VAlign=Top\u0026Align=Center\u0026anchor=TopCenter",
      ThumbnailImageAltText:null,
      Image:"//assets.cougar.nineentertainment.com.au/Assets/Elle/2014/09/15/41144/9-clutch-(1).jpg?MaxHeight=650\u0026MaxWidth=803\u0026Constrain=true\u0026VAlign=Top\u0026Align=Center\u0026anchor=TopCenter",
      LargeImage:"//assets.cougar.nineentertainment.com.au/Assets/Elle/2014/09/15/41144/9-clutch-(1).jpg?Width=1900\u0026Mode=Crop\u0026VAlign=Top\u0026Align=Center\u0026anchor=TopCenter",
      ImageCaption:null,
      ImageAltText:null,
      Summary:"\u003cstrong\u003e1. Hold me closer\u003c/strong\u003e\u003cbr\u003e\nThe fash pack are clutching onto this wardrobe staple; don\u0027t expect the oversized carry-all to go anywhere any time soon."
   },
   {
      Id:41145,
      ItemIndex:2,
      Name:"3",
      Title:"3",
      IsSelected:false,
      ThumbnailImage:"//assets.cougar.nineentertainment.com.au/Assets/Elle/2014/09/15/41145/2-flatforms-(1).jpg?Height=225\u0026Width=150\u0026Class=upsize\u0026Mode=Crop\u0026VAlign=Top\u0026Align=Center\u0026anchor=TopCenter",
      ThumbnailImageAltText:null,
      Image:"//assets.cougar.nineentertainment.com.au/Assets/Elle/2014/09/15/41145/2-flatforms-(1).jpg?MaxHeight=650\u0026MaxWidth=803\u0026Constrain=true\u0026VAlign=Top\u0026Align=Center\u0026anchor=TopCenter",
      LargeImage:"//assets.cougar.nineentertainment.com.au/Assets/Elle/2014/09/15/41145/2-flatforms-(1).jpg?Width=1900\u0026Mode=Crop\u0026VAlign=Top\u0026Align=Center\u0026anchor=TopCenter",
      ImageCaption:null,
      ImageAltText:null,
      Summary:"\u003cstrong\u003e2. Flat out\u003c/strong\u003e\u003cbr\u003e\nFlatform sneakers are the cool girl\u0027s heel - height AND cred with minimal fuss."
   },
   {
      Id:41146,
      ItemIndex:3,
      Name:"4",
      Title:"4",
      IsSelected:false,
      ThumbnailImage:"//assets.cougar.nineentertainment.com.au/Assets/Elle/2014/09/15/41146/2-flatforms-(2).jpg?Height=225\u0026Width=150\u0026Class=upsize\u0026Mode=Crop\u0026VAlign=Top\u0026Align=Center\u0026anchor=TopCenter",
      ThumbnailImageAltText:null,
      Image:"//assets.cougar.nineentertainment.com.au/Assets/Elle/2014/09/15/41146/2-flatforms-(2).jpg?MaxHeight=650\u0026MaxWidth=803\u0026Constrain=true\u0026VAlign=Top\u0026Align=Center\u0026anchor=TopCenter",
      LargeImage:"//assets.cougar.nineentertainment.com.au/Assets/Elle/2014/09/15/41146/2-flatforms-(2).jpg?Width=1900\u0026Mode=Crop\u0026VAlign=Top\u0026Align=Center\u0026anchor=TopCenter",
      ImageCaption:null,
      ImageAltText:null,
      Summary:"\u003cstrong\u003e2. Flat out\u003c/strong\u003e\u003cbr\u003e\nFlatform sneakers are the cool girl\u0027s heel - height AND cred with minimal fuss."
   },
];

// App state
var state = {
  currentSlide: 0,
  data        : data
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
        el.id
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
        <Slides data={state.data} />
        <Pagination data={state.data} />
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
        <Slide active={isActive} key={slideNode.Name} Image={slideNode.Image} ImageAltText={slideNode.ImageAltText} Name={slideNode.Name} ImageCaption={slideNode.ImageCaption} Summary={slideNode.Summary} />
      
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
        <Pager id={paginationNode.id} key={paginationNode.id} title={paginationNode.title}  />
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
    actions.toggleSlide(this.props.id);
  },
  render: function() {
    return (
      <span className="pager" onClick={this.toggleSlide}>{this.props.title}</span>
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


