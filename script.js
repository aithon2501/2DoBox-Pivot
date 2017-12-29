$('.save-button').on('click', newIdea);
$('.idea-list').on('blur', '.card', editTitle);
$('.idea-list').on('blur', '.card', editBody);
$('.search-input').on('keyup', searchList);
$('.idea-list').on('click', '.delete-button', deleteCard);
$('.idea-list').on('click', '.up-vote', upVote);
$('.idea-list').on('click', '.down-vote', downVote);


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
//
// $('.idea-list').on('click', '.down-vote', function (){
//   if ($(this).closest('nav').children('p').text() === 'quality: genius')
//     {$(this).siblings('.quality').text('quality: plausible');
//     var id = this.closest('article').getAttribute('id');
//     var retrievedObject = localStorage.getItem(id);
//     var parsedObject = JSON.parse(retrievedObject);;
//     parsedObject.quality = 'plausible';
//     pushToStorage(id, parsedObject);
//   } else if ($(this).closest('nav').children('p').text() === 'quality: plausible')
//     {$(this).siblings('.quality').text('quality: swill');
//     var id = this.closest('article').getAttribute('id');
//     var retrievedObject = localStorage.getItem(id);
//     var parsedObject = JSON.parse(retrievedObject);
//     parsedObject.quality = 'swill';
//     pushToStorage(id, parsedObject);
// }});



// 1. select parent section and use the event blur which activates when tabbed out of element. opposite of focus
// 2. set variable to grab attribute of card ID; console log this as a sanity check
// 3. pull object from local storage to be edited and set to varible(first)
// 4. destringify object from local storage
// 5. set variable to grab what edit user types in. (eg title)
// 6. set the title of object to the title user typed in
// 7.set var to hold stringified object so as to put into localStorage
// 8. set item in local storage using object's (id, stringed object variable)



//
// function editBody(card) {
//   var id = this.closest('article').getAttribute('id');
//   var newTitle = $(this).closest('.card-body').text();
//   var retrievedObject = localStorage.getItem(id);
//   var parsedObject = JSON.parse(retrievedObject);
//   parsedObject.body = newTitle;
//   pushToStorage(id, parsedObject);
// };

// function searchList() {
//   var titles = $('h2');
//   var bodies = $('.card-body');
//   var page = [titles, bodies]
//   //sets variables for the titles and body text on the page
//   page.forEach(function(text{
//     console.log(text);
//     if (searchInputTitle === false && searchInputBody === false) {
//       //if the loop and what's on the page don't match, hide the card
//       $($('h2')[i]).parent().hide();
//     } else if (searchInputTitle === true || searchInputBody === true) {
//       //if the loop and what's on the page match, show the card
//       $($('h2')[i]).parent().show();
//     };
//   }))

function searchList() {
  var titles = $('h2');
  var bodies = $('.card-body');
  var page = [titles, bodies]
  //sets variables for the titles and body text on the page
  for (var i = 0; i < (titles.length || bodies.length); i++) {
    //for loop to loop through all titles of bodies on page
    var eachtitle = titles[i].innerText;
    //eachtitle becomes wherever the loop is on h2s on page
    var eachbody = bodies[i].innerText;
    //each body becomes wherever the loop is on body text on page
    var searchInputTitle = eachtitle.includes($('.search-input').val());
    //compares the loop title index h2 to what's in search input
    var searchInputBody = eachbody.includes($('.search-input').val());
    //compares the loop body index to what's in search input
  if (searchInputTitle === false && searchInputBody === false) {
    //if the loop and what's on the page don't match, hide the card
    $($('h2')[i]).parent().hide();
  } else if (searchInputTitle === true || searchInputBody === true) {
    //if the loop and what's on the page match, show the card
    $($('h2')[i]).parent().show();
}}};
