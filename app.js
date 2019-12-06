'use strict';

let page = 'page-1.json';
const arrayOfHorns = [];

function getThings(page){

  $.get(page, 'json').then(data =>animalsRender(data, page));
};

getThings('page-1.json');

function animalsRender(creaturesArray, page){
  creaturesArray.forEach(animalsObj => {
    const c = new Animals(animalsObj, page);
    arrayOfHorns.push(c);
    c.onScreen();
  });
};

function Animals(cObj, pageNumber){
  this.image_url = cObj.image_url;
  this.description = cObj.description;
  this.keyword = cObj.keyword;
  this.horns = cObj.horns;
  this.page = pageNumber;
};

Animals.prototype.onScreen = function(){
  const creatureTemplate = Handlebars.compile($('#creature-template').html());
  const newHtml = creatureTemplate(this);
  $('main').append(newHtml);
};

$( '#page2' ).on('click', function(){
  $('div').hide();
  if(page === 'page-1.json'){
    const divs = $('div[data-page="page-2.json"]');
    console.log(divs);

    if(!divs.length){
      getThings('page-2.json');
    }
    divs.show();
    page = 'page-2.json';
  } else {
    const divs = $('div[data-page="page-1.json"]');
    console.log(divs);
    if (!divs.length) {
      getThings('page-1.json');
    }
    divs.show();
    page = 'page-1.json';
  }
});

$('#sort').on('click', function(){
  arrayOfHorns.sort(function(a,b) {
    if(a.horns > b.horns) return 1;
    if(b.horns > a.horns) return -1;
    return 0;
  });
  $('div').remove();
  arrayOfHorns.forEach(Animals => Animals.onScreen());
  $('div').hide();
  $(`div[data-page="${page}"]`).show();
});
