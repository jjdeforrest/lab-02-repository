let arrayOfHorns = [];

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
      <div>
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
  
    $('#horned').append(clone);
  };


$.get('page-1.json').then(
    (data) => {
      console.log(data);
      data.forEach(hornedObjFromFile => {
        let hornedAnimal = new HornedAnimal(hornedObjFromFile.title, hornedObjFromFile.image_url, hornedObjFromFile.description, hornedObjFromFile.keyword, hornedObjFromFile.horns);
        hornedAnimal.renderWithJqueryClone();
        selectFiltering(hornedObjFromFile.keyword);
        
      });
      populateList();
    });

$('select[name="horn"]').on('change', function() {
    let $selection = $(this).val();
    $('img').hide();
    $('h2').hide();
    $('p').hide();
    $(`img[alt="${$selection}"]`).show();

});
      
