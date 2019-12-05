let arrayOfAnimals = [];
let arrayOfHorns = [];
let firstSet = [];
let secondSet = [];
let dataSetActive = false;




function populateList(){
    arrayOfAnimals.forEach(function(type){
        let animalDD = $('#horn');
        let option = document.createElement('option');
        option.value = type;
        option.text = type;
        animalDD.append(option);
    });
    arrayOfHorns.forEach(function(number){
      let hornDD = $('#numberOfHorns');
      let hornOption = document.createElement('option');
      hornOption.value = number;
      hornOption.text = number;
      hornDD.append(hornOption);
  });
}


function selectFiltering(keyword){
    if(!arrayOfAnimals.includes(keyword)){
        arrayOfAnimals.push(keyword);
    }
}

function hornFiltering(horns){
  if(!arrayOfHorns.includes(horns)){
    arrayOfHorns.push(horns);
  }
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
    clone.find('img').attr('data-horns', this.horns);
    clone.find('p').text(this.description);
    clone.removeAttr('id');
    console.log(clone);
    $('horned').empty();
    $('#horned').append(clone);
  };

  HornedAnimal.prototype.renderWithJqueryClone2 = function(){
    let clone = $('#photo-template2').clone();
  
    clone.find('h2').text(this.title);
    clone.find('img').attr('src', this.img);
    clone.find('img').attr('alt', this.keyword);
    clone.find('img').attr('data-horns', this.horns);
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
      hornFiltering(hornedObjFromFile.horns);
      dataSetActive = true;
      firstSet.push(hornedAnimal);
      
    });
    dataSet2();
  });

function dataSet2(){
$.get('page-2.json').then(
  (data) => {
    console.log(data);
    data.forEach(hornedObjFromFile => {
      let hornedAnimal = new HornedAnimal(hornedObjFromFile.title, hornedObjFromFile.image_url, hornedObjFromFile.description, hornedObjFromFile.keyword, hornedObjFromFile.horns);
      hornedAnimal.renderWithJqueryClone2();
      selectFiltering(hornedObjFromFile.keyword);
      hornFiltering(hornedObjFromFile.horns);
      secondSet.push(hornedAnimal);
  
    });
    populateList();
  });
}

$('select[name="horn"]').on('change', function() {
  const keywordValue = $(this).val();
if (keywordValue === 'default'){
  $('div').show();
}else{
  $('div').hide();

  $('img').each(function (currentValue, index, array) {
    if ($(this).attr('alt') === keywordValue) {
      $(this).parent().show();
    }
  });
}
});

$('select[name="numberOfHorns"]').on('change', function() {
  const keywordValue = $(this).val();
  if(keywordValue === 'default'){
    $('div').show();
  }else{
    $('div').hide();

  $('img').each(function (currentValue, index, array) {
    if ($(this).attr('data-horns') === keywordValue) {
      $(this).parent().show();
    }
  });
  }
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



