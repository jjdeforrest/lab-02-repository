'use strict';


var pictures = document.getElementById('photo-template');



function pageContent(image, title, description, keyword, horns) {
  this.image = image;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}


pageContent.prototype.($.get("page-1.json"));
console.log(pageContent);
