let arrayOfHorns = [];
let firstSet = [];
let secondSet = [];
let dataSetActive = false;
let dsOneRenderStatus = false;
let dsTwoRenderStatus = false;



function populateList(){
    arrayOfHorns.forEach(function(type){
        let selectDD = $('#horn');
        let option = document.createElement('option');
        option.value = type;
        option.text = type;
        selectDD.append(option);
    });
}

function selectFiltering(keyword){
    if(!arrayOfHorns.includes(keyword)){
        arrayOfHorns.push(keyword);
    }
    console.log(`Array is ${arrayOfHorns}`);
}



function HornedAnimal(title, img, description, keyword, horns){
    this.title = title;
    this.img = img;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
  }
  
  HornedAnimal.prototype.renderWithJquery = function(){
    $('#photo-template').append(`
      <div class = "first">
        <h2>${this.title}</h2>
        <img src="${this.img}"></img>
        <p>${this.description}</p>
        <p>Horns: ${this.horns}</p>
      </div>
    `);
  };
  
  HornedAnimal.prototype.renderWithJqueryClone = function(){
    let clone = $('#photo-template').clone();
  
    clone.find('h2').text(this.title);
    clone.find('img').attr('src', this.img);
    clone.find('img').attr('alt', this.keyword);
    clone.find('p').text(this.description);
    clone.removeAttr('id');
    console.log(clone);
    $('horned').empty();
    $('#horned').append(clone);
    dsOneRenderStatus = true;
  };

  HornedAnimal.prototype.renderWithJqueryClone2 = function(){
    let clone = $('#photo-template2').clone();
  
    clone.find('h2').text(this.title);
    clone.find('img').attr('src', this.img);
    clone.find('img').attr('alt', this.keyword);
    clone.find('p').text(this.description);
    clone.removeAttr('id');
    console.log(clone);
    $('#horned2').hide();
    $('#horned2').append(clone);
  };



$.get('page-1.json').then(
  (data) => {
    console.log(data);
    data.forEach(hornedObjFromFile => {
      let hornedAnimal = new HornedAnimal(hornedObjFromFile.title, hornedObjFromFile.image_url, hornedObjFromFile.description, hornedObjFromFile.keyword, hornedObjFromFile.horns);
      hornedAnimal.renderWithJqueryClone();
      selectFiltering(hornedObjFromFile.keyword);
      dataSetActive = true;
      firstSet.push(hornedAnimal);
      
    });
    populateList();
  });

$.get('page-2.json').then(
  (data) => {
    console.log(data);
    data.forEach(hornedObjFromFile => {
      let hornedAnimal = new HornedAnimal(hornedObjFromFile.title, hornedObjFromFile.image_url, hornedObjFromFile.description, hornedObjFromFile.keyword, hornedObjFromFile.horns);
      hornedAnimal.renderWithJqueryClone2();
      selectFiltering(hornedObjFromFile.keyword);
      secondSet.push(hornedAnimal);
  
    });
    populateList();
  });


$('select[name="horn"]').on('change', function() {
  const keywordValue = $(this).val();
  $('div').hide();

  $('img').each(function (currentValue, index, array) {
    if ($(this).attr('alt') === keywordValue) {
      $(this).parent().show();
    }
  });

});
    
function dataSwitch() {

  
  if (dataSetActive === true){
    $('#horned').hide();
    $('#horned2').show();

   dataSetActive = false;

  
  }

  else if (dataSetActive === false){
    $('#horned2').hide();
       $('#horned').show();

   dataSetActive = true;
  }
}



