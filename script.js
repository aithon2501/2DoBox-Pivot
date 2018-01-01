$('.save-button').on('click', newIdea);
$('.idea-list').on('blur', '.card', editTitle);
$('.idea-list').on('blur', '.card', editBody);
$('.search-input').on('keyup', searchList);
$('.idea-list').on('click', '.delete-button', deleteCard);
$('.idea-list').on('click', '.up-vote', upVote);
$('.idea-list').on('click', '.down-vote', downVote);
$('.title-input').on('keyup', disabledToggleTitle);
$('.body-input').on('keyup', disabledToggleTask);
$('.save-button').on('click', disabledToggleTitle);

retrieveCard();

function newIdea(event) {
  event.preventDefault();
  var title = $('.title-input');
  var body = $('.body-input');
  var newCard = new MakeCard(title.val(), body.val());
  appendCard(newCard);
  pushToStorage(newCard.uniqueid, newCard)
  title.val('');
  body.val('');
};

function MakeCard(title, body, quality) {
  this.title = title;
  this.body = body;
  this.quality = "quality: swill";
  this.uniqueid = Date.now();
  };

function appendCard(ideaCard) {
  $('.idea-list').prepend(
    `<article class="card" id="${ideaCard.uniqueid}">
      <h2 class="card-title" contenteditable="true">${ideaCard.title}</h2>
      <button class="card-buttons delete-button"></button>
      <p class="card-body" contenteditable="true">${ideaCard.body}</p>
      <nav>
        <button class="card-buttons up-vote"></button>
        <button class="card-buttons down-vote"></button>
        <p class="quality">${ideaCard.quality}</p>
      </nav>
    </article>`)
};

function retrieveCard(){
  for(var i=0; i < localStorage.length; i++) {
  var retrievedObject = localStorage.getItem(localStorage.key(i));
  var parsedObject = JSON.parse(retrievedObject);
  appendCard(parsedObject);
}};

function pushToStorage(id, object){
  var stringifiedObject = JSON.stringify(object);
  localStorage.setItem(id, stringifiedObject);
}

function deleteCard() {
  var id = this.closest('article').getAttribute('id');
  this.closest('article').remove();
  localStorage.removeItem(id);
};

function editTitle(card) {
  var id = $(this).attr('id');
  var pulledObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(pulledObject);
  var userTitle = $(this).find('.card-title').text();
  parsedObject.title = userTitle;
  pushToStorage(id, parsedObject);
};

function editBody(card) {
  var id = $(this).attr('id');
  var pulledObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(pulledObject);
  var userBody = $(this).find('.card-body').text();
  parsedObject.body = userBody;
  pushToStorage(id, parsedObject);
};

function upVote() {
 var id = $(this).parents('.card').attr('id');
 var pulledObject = localStorage.getItem(id);
 var parsedObject = JSON.parse(pulledObject);
 var initialQuality = $(this).siblings('.quality').text();
   console.log(parsedObject);

 if (initialQuality === 'quality: swill') {
   $(this).siblings('.quality').text('quality: plausible');
   parsedObject.quality = 'quality: plausible';
} else if ($(this).siblings('.quality').text() === 'quality: plausible'){
   $(this).siblings('.quality').text('quality: genius')
   parsedObject.quality = 'quality: genius';
 }
   pushToStorage(id, parsedObject);
 };

function downVote() {
 var id = $(this).parents('.card').attr('id');
 var pulledObject = localStorage.getItem(id);
 var parsedObject = JSON.parse(pulledObject);
 var initialQuality = $(this).siblings('.quality').text();
   console.log(parsedObject);

 if (initialQuality === 'quality: genius') {
   $(this).siblings('.quality').text('quality: plausible');
   parsedObject.quality = 'quality: plausible';
} else if ($(this).siblings('.quality').text() === 'quality: plausible'){
   $(this).siblings('.quality').text('quality: swill')
   parsedObject.quality = 'quality: swill';
 }
   pushToStorage(id, parsedObject);
 };

function searchList() {
  var titles = $('h2');
  var bodies = $('.card-body');
  for (var i = 0; i < (titles.length || bodies.length); i++) {
    var eachtitle = titles[i].innerText;
    var eachbody = bodies[i].innerText;
    var searchInputTitle = eachtitle.includes($('.search-input').val());
    var searchInputBody = eachbody.includes($('.search-input').val());

    if (searchInputTitle === false && searchInputBody === false) {
    $($('h2')[i]).parent().hide();
  } else if (searchInputTitle === true || searchInputBody === true) {
    $($('h2')[i]).parent().show();
  }}};

function disabledToggleTitle (){
  var $titleInput = $('.title-input');
  var $saveButton = $('.save-button');
  if($titleInput.val()){
    $saveButton.attr('disabled', false);
  } else {
    $saveButton.attr('disabled', true);
  }
}

function disabledToggleTask (){
  var $titleInput = $('.body-input');
  var $saveButton = $('.save-button');
  if($titleInput.val()){
    $saveButton.attr('disabled', false);
  } else {
    $saveButton.attr('disabled', true);
  }
}
