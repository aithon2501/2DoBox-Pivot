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
$('.toDo-list').on('click', '.task-complete-button', completeTask);

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
  this.completed = false;
  this.importance = "importance: none";
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
        <button class="task-complete-button">COMPLETE</button>
      </nav>
    </article>`)
};

function retrieveCard(){
  for(var i=0; i < localStorage.length; i++) {
  var retrievedObject = localStorage.getItem(localStorage.key(i));
  var parsedObject = JSON.parse(retrievedObject);
  if(parsedObject.completed === false){
    appendCard(parsedObject);
  }
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

function editTask(card) {
  var id = $(this).attr('id');
  var pulledObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(pulledObject);
  var usertask = $(this).find('.card-body').text();
  parsedObject.task = usertask;
  pushToStorage(id, parsedObject);
};

function upVote() {
 var id = $(this).parents('.card').attr('id');
 var pulledObject = localStorage.getItem(id);
 var parsedObject = JSON.parse(pulledObject);
 var initialImportance = $(this).siblings('.importance').text();
 if (initialImportance === 'importance: none') {
   $(this).siblings('.importance').text('importance: low');
   parsedObject.importance = 'importance: low';
} else if ($(this).siblings('.importance').text() === 'importance: low'){
   $(this).siblings('.importance').text('importance: normal')
   parsedObject.importance = 'importance: normal';
 } else if ($(this).siblings('.importance').text() === 'importance: normal'){
   $(this).siblings('.importance').text('importance: high')
   parsedObject.importance = 'importance: high';
 } else if ($(this).siblings('.importance').text() === 'importance: high'){
   $(this).siblings('.importance').text('importance: critical')
   parsedObject.importance = 'importance: critical';
 }
   pushToStorage(id, parsedObject);
 };

function downVote() {
 var id = $(this).parents('.card').attr('id');
 var pulledObject = localStorage.getItem(id);
 var parsedObject = JSON.parse(pulledObject);
 var initialImportance = $(this).siblings('.importance').text();
 if (initialImportance === 'importance: critical') {
   $(this).siblings('.importance').text('importance: high');
   parsedObject.importance = 'importance: high';
} else if ($(this).siblings('.importance').text() === 'importance: high'){
   $(this).siblings('.importance').text('importance: normal')
   parsedObject.importance = 'importance: normal';
 } else if ($(this).siblings('.importance').text() === 'importance: normal'){
    $(this).siblings('.importance').text('importance: low')
    parsedObject.importance = 'importance: low';
  } else if ($(this).siblings('.importance').text() === 'importance: low'){
     $(this).siblings('.importance').text('importance: none')
     parsedObject.importance = 'importance: none';
   }
   pushToStorage(id, parsedObject);
 };

function vote(id){
  var id = $(this).parents('.card').attr('id');
  var pulledObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(pulledObject);
  var initialImportance = $(this).siblings('.importance').text();
}

function filterList(){
 var searchRequest = $('.filter-input').val().toLowerCase();
 $('.card').each(function(){
   var searchResult = $(this).text().toLowerCase().indexOf(searchRequest);
   if(searchResult > -1){
     $(this).show();
   } else {
     $(this).hide();
   }
 })
}

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

function completeTask () {
  var id = $(this).parents('.card').attr('id');
  var pulledObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(pulledObject);
  parsedObject.completed = true;

  var complete = $(this).parent().parent()
  complete.toggleClass('taskComplete');
    
  pushToStorage(id, parsedObject);
}
