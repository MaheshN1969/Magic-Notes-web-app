console.log('Welcome to Notes App');
showNotes();

// If user adds a note , add it to localStorage	

let addBtn = document.getElementById('addbtn');

addBtn.addEventListener('click',function(e){
	
		let addTxt = document.getElementById('addTxt');
		let addTitle = document.getElementById('addTitle')
		let notes = localStorage.getItem("notes");

		if(notes == null)
		{
			notesObj = [];
		}
		else
		{
			notesObj = JSON.parse(notes);
		}

		let obj = {
						title : addTitle.value,
						text : addTxt.value
		}

		notesObj.push(obj);
		localStorage.setItem("notes",JSON.stringify(notesObj));
		addTxt.value = "";
		addTitle.value = "";
		console.log(notesObj);

		showNotes();

});

// FUnction to Show content from local Storage
function showNotes()
{
	
	let notes = localStorage.getItem('notes');

	if(notes == null)
	{
		notesObj = [];
	}	
	else
	{
		notesObj = JSON.parse(notes);
	}

	let html = "";

	notesObj.forEach(function(element,index){
		
			html += `<div class="noteCard my-2 mx-2 card" style="width: 20rem;">
  						<div class="card-body">
    						<h5 class="card-title">${element.title}</h5>
    						<p class="card-text">${element.text}</p>
    						<button id = ${index} onClick = deleteNote(this.id) class="btn btn-primary">Delete</button>
  						</div>
					</div>`;

	

				});

	let notesElm = document.getElementById('notes');
	if(notesObj.length != 0)
	{
		notesElm.innerHTML = html ;
	}
	else
	{
		notesElm.innerHTML = `No Notes Available "Add Note to See Notes"`;
	}
}

function deleteNote(index)
{
	console.log('I am Deleting this Note',index);

	let notes = localStorage.getItem('notes');
	if(notes == null)
	{
		notesObj = [];
	}
	else
	{
		notesObj = JSON.parse(notes);
	}

	notesObj.splice(index,1);
	localStorage.setItem('notes',JSON.stringify(notesObj));
	showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input",function(){
	
	let inputVal = search.value.toLowerCase();

	console.log('Input Event Fired :',inputVal);
	let noteCards = document.getElementsByClassName('noteCard');

	Array.from(noteCards).forEach(function(element){
		
		let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();

		if(cardTxt.includes(inputVal))
		{
			element.style.display = 'block';
			console.log('Found : ',cardTxt);

		}
		else
		{
			element.style.display = 'none';
		}

		// console.log(cardTxt);

	});
});