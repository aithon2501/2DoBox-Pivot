$('.title-input').focus();
$('.save-button').on('click', newToDo);
$('.toDo-list').on('blur', '.card', editTitle);
$('.toDo-list').on('blur', '.card', editTask);
$('.filter-input').on('keyup', filterList);
$('.title-input').on('keyup', disableButton);
$('.task-input').on('keyup', disableButton);
$('.save-button').on('click', disableButton);
$('.toDo-list').on('click', '.delete-button', deleteCard);
$('.toDo-list').on('click', '.up-vote', upVote);
$('.toDo-list').on('click', '.down-vote', downVote);
$('.card-body').on('keyup', )

disableButton();
retrieveCard();

function newToDo(event) {
  event.preventDefault();
  var title = $('.title-input');
  var task = $('.task-input');
  var newCard = new MakeCard(title.val(), task.val());
  appendCard(newCard);
  pushToStorage(newCard.uniqueid, newCard)
  title.val('');
  task.val('');
  title.focus();
};

function MakeCard(title, task, importance) {
  this.title = title;
  this.task = task;
  this.importance = "importance: swill";
  this.uniqueid = Date.now();
  };

function appendCard(toDoCard) {
  $('.toDo-list').prepend(
    `<article class="card" id="${toDoCard.uniqueid}">
      <h2 class="card-title" contenteditable="true">${toDoCard.title}</h2>
      <button class="card-buttons delete-button"></button>
      <p class="card-body" contenteditable="true">${toDoCard.task}</p>
      <nav>
        <button class="card-buttons up-vote"></button>
        <button class="card-buttons down-vote"></button>
        <p class="importance">${toDoCard.importance}</p>
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
  var userTitle = $(this).text();
  parsedObject.title = userTitle;
  pushToStorage(id, parsedObject);
};

function editTask(card) {
  var id = $(this).attr('id');
  var pulledObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(pulledObject);
  var usertask = $(this).text();
  parsedObject.task = usertask;
  pushToStorage(id, parsedObject);
};

function upVote() {
 var id = $(this).parents('.card').attr('id');
 var pulledObject = localStorage.getItem(id);
 var parsedObject = JSON.parse(pulledObject);
 var initialImportance = $(this).siblings('.importance').text();
   console.log(parsedObject);

 if (initialImportance === 'importance: swill') {
   $(this).siblings('.importance').text('importance: plausible');
   parsedObject.importance = 'importance: plausible';
} else if ($(this).siblings('.importance').text() === 'importance: plausible'){
   $(this).siblings('.importance').text('importance: genius')
   parsedObject.importance = 'importance: genius';
 }
   pushToStorage(id, parsedObject);
 };

function downVote() {
 var id = $(this).parents('.card').attr('id');
 var pulledObject = localStorage.getItem(id);
 var parsedObject = JSON.parse(pulledObject);
 var initialImportance = $(this).siblings('.importance').text();
   console.log(parsedObject);

 if (initialImportance === 'importance: genius') {
   $(this).siblings('.importance').text('importance: plausible');
   parsedObject.importance = 'importance: plausible';
} else if ($(this).siblings('.importance').text() === 'importance: plausible'){
   $(this).siblings('.importance').text('importance: swill')
   parsedObject.importance = 'importance: swill';
 }
   pushToStorage(id, parsedObject);
 };

function filterList() {
  var titles = $('h2');
  var bodies = $('.card-body');
  var searchInput = $('.filter-input').val().trim().toLowerCase();
  for (var i = 0; i < (titles.length || bodies.length); i++) {
    var eachTitle = titles[i].innerText.trim().toLowerCase();
    var eachTask = bodies[i].innerText.trim().toLowerCase();
  
  // if (searchInput === eachTitle.includes() || eachTask.includes()) {
  //   $($('h2')[i]).parent().show();
  // } else if (searchInput !== eachTitle || eachTask) {
  //   $($('h2')[i]).parent().hide();
  //   };  

    var filterInputTitle = eachTitle.includes($('.filter-input').val().trim().toLowerCase());
    var filterInputtask = eachTask.includes($('.filter-input').val().trim().toLowerCase());

    if (filterInputTitle === false && filterInputtask === false) {
    $($('h2')[i]).parent().hide();
  } else if (filterInputTitle === true || filterInputtask === true) {
    $($('h2')[i]).parent().show();
    };
   }
 };

function disableButton (){
  var $taskInput = $('.task-input');
  var $titleInput = $('.title-input');
  var $saveButton = $('.save-button');
  if($titleInput.val() && $taskInput.val()){
    $saveButton.attr('disabled', false);
  } else {
    $saveButton.attr('disabled', true);
  }
}

function enterButtonSubmits () {
  if (e.keycode === 13) {
    $(this).attr('contenteditable', true);
    $(this).blur();
  }
}
