$('.title-input').focus();
$('.save-button').on('click', newToDo);
$('.toDo-list').on('blur', '.card', editTitle);
$('.toDo-list').on('blur', '.card', editTask);
$('.filter-input').on('keyup', filterList);
$('.title-input').on('keyup', disableButton);
$('.task-input').on('keyup', disableButton);
$('.save-button').on('click', disableButton);
$('.toDo-list').on('click', '.delete-button', deleteCard);
$('.toDo-list').on('click', '.up-vote', delegateUp);
$('.toDo-list').on('click', '.down-vote', delegateDown);
$('.show-completed-tasks-button').on('click', showCompletedTasks)
$('.toDo-list').on('click', '.task-complete-button', getComplete);

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

function delegateUp(){
  changeVote(this, 1)
}

function delegateDown(){
  changeVote(this,-1)
}

function changeVote(targetButton, newIndex) {
 var id = $(targetButton).parents('.card').attr('id');
 var pulledObject = localStorage.getItem(id);
 var parsedObject = JSON.parse(pulledObject);
 var initialImportance = $(targetButton).siblings('.importance');
 var potentialImportance = ['importance: none','importance: low', 'importance: normal', 'importance: high', 'importance: critical'];
 var initialIndex = potentialImportance.indexOf(initialImportance.text());
 initialImportance.text(potentialImportance[initialIndex + newIndex]);
 parsedObject.importance = initialImportance.text();
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

function getComplete() {
  var complete = $(this).parents('.card')
  var id = $(this).parents('.card').attr('id');
  var pulledObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(pulledObject);
  if (parsedObject.completed === false) {  
  completeTask(id, parsedObject, complete);
  } else {
    parsedObject.completed = false;
    complete.toggleClass('taskComplete');
  } 
    pushToStorage(id, parsedObject);
}

function showCompletedTasks() {
 //how to pull ALL id's from local storage to look at?
  var id = $('.card').attr('id');
  var pulledObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(pulledObject);

  if (parsedObject.completed === true) {
    appendCard(parsedObject);
  } else {
    $('.card').hide();
  }
}
  
function completeTask (id, parsedObject, complete) {
  parsedObject.completed = true;
  complete.toggleClass('taskComplete');
  pushToStorage(id, parsedObject);
}
