var seperatelines=true;

var flashcardArray =[];

var elementArray=[];

var splitter="-";



function flashcard(question, answer){
this.question=question;
this.answer=answer;
this.starred=0;
}


window.onload = function() {
  var currentPage = window.location.href;
  
  if (currentPage.includes('index.html')) {
    console.log("Website 1 loaded!");
    flashcardArray[0]= new flashcard('Question', 'Answer');
    resetGrid();
    makeGrid(flashcardArray,0,0);

    showAlert();
  };

}


  function checkboxClicked() {
    // Get the checkbox element
    var checkbox = document.getElementById("lineCheckbox");
    
    // Check if the checkbox is checked
    if (checkbox.checked) {
      // Checkbox is checked, do something
      console.log("Checkbox is checked");
      seperatelines=true;
    } else {
      // Checkbox is not checked, do something
      console.log("Checkbox is not checked");
      seperatelines=false;
    }
  }

function getText() {
    var message = document.getElementById("message");
    var text = message.value.trim();
    console.log(text);
    var charCnt =(text.length);
    console.log(charCnt);
    document.getElementById("charCnt").textContent=charCnt + " characters"; 
    
    var parts=[];
    if (seperatelines){
    var lines = text.split(/\s*\n\s*/);
    
    console.log(lines[0]);

    //line cnt
    document.getElementById("lineCnt").textContent=lines.length + " lines"; 
    

     parts=breakline(lines);
    } else{
     parts = breakText(text);
    }

    var a=0;
    for (var i=0; i<parts.length; i+=2){
      if ((i)>parts.length-1){
         return;
       }
      if ((i+1)>parts.length-1){
        flashcardArray[a]= new flashcard(parts[i], '...');
      }
      else{
        flashcardArray[a]= new flashcard(parts[i], parts[i+1]);
      }
        a++;
    }
  

       resetGrid();
       makeGrid(flashcardArray,0,0);

       /*
      const adderButtons = document.querySelectorAll('adder-button');
        // Add event listeners to the buttons
      adderButtons.forEach((button, index) => {
      button.addEventListener('click', function(event) {
      const clickedButtonIndex = index;
      
      // Do something with the clicked button and its index
      console.log(clickedButtonIndex);
      });
    });
*/

  }

  function resetGrid(){
    const divElement = document.getElementById('container');

    // Reset the styles and attributes of the div element
    //divElement.style = '';
    //divElement.classList = '';
    divElement.innerHTML = '';
  }

function makeGrid(flashcardArray, divCase,textareaIndex,){
 const container= document.getElementById('container');

 var b=0;
 var element1='div';
 var element2='div';


  flashcardArray.forEach(flashcard => {

    if (b==textareaIndex){
      switch (divCase) {
        case 0:
          element1='div';
          element2='div';
          break;
        case 1:
          element1='textarea';
          element2='div';
          break;
        case 2:
          element1='div';
          element2='textarea';
          console.log("Case 2");
          break;
        default:
          console.log("Default case");
          break;
      }
    }else{
      element1='div';
      element2='div';
    }
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    //adder
    const adder=document.createElement('button');
    cardContainer.appendChild(adder);
    adder.textContent = "+";
    adder.classList.add('adder-button');
    adder.addEventListener('click', adderClicked);
    adder.title="add a card"
    adder.id=b;

    //swap
    const swapper=document.createElement('button');
    cardContainer.appendChild(swapper);
    swapper.classList.add('swap-button');
    // Create a text node with the down arrow symbol
const downArrow = document.createTextNode('\u25BC');

// Clear any existing content
swapper.innerHTML = '';

// Append the down arrow symbol to the swapper element
swapper.appendChild(downArrow);
    swapper.title="swap";
    swapper.addEventListener('click',swapperClicked);
    swapper.id=b;

    //card left
    const card1 = document.createElement(element1);
    card1.textContent=flashcard.question;
    cardContainer.appendChild(card1);
    card1.classList.add('flashcard-style');
    card1.title="hit enter to submit";
    card1.id=b;
    if (element1=='div'){
    card1.addEventListener('click',card1Clicked);
    }
    else{
      setTimeout(function() {
        card1.focus();
      }, 0);
    card1.addEventListener('keydown', submitText1);
    card1.addEventListener('blur', function() {
      console.log("blurred");
      resetGrid();
      makeGrid(flashcardArray, 0,0);
    });
    }

    //right card
    const card2 = document.createElement(element2);
    card2.textContent=flashcard.answer;
    cardContainer.appendChild(card2);
    card2.classList.add('flashcard-style');
    card2.title="hit enter to submit";
    card2.id=b;
    if (element2=='div'){
      card2.addEventListener('click',card2Clicked);
      }
      else{
        setTimeout(function() {
          card2.focus();
        }, 0);
      card2.addEventListener('keydown', submitText2);
      card2.addEventListener('blur', function() {
        console.log("blurred");
        resetGrid();
        makeGrid(flashcardArray, 0,0);
      });
      }


    //delete button
    const deleteButton = document.createElement('button');
    cardContainer.appendChild(deleteButton);
    deleteButton.textContent="-";
    deleteButton.title="delete";
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', deleteClicked);
    deleteButton.id=b;


    // Add event listener to the delete button
   // deleteButton.addEventListener('click', function() {
    //  cardContainer.remove(); // Remove the card container when delete button is clicked
   // });


    b++;
    container.appendChild(cardContainer);
  });

}


function adderClicked(event) {
  const buttonid=parseInt(event.target.id);
  console.log("adder id " + buttonid);


  flashcardArray.splice(buttonid, 0, new flashcard('...', '...'));

  resetGrid();
  makeGrid(flashcardArray,0,0);

}

function swapperClicked(event){
  const buttonid=parseInt(event.target.id);
  
  if(buttonid<flashcardArray.length-1){
    var temp = flashcardArray[buttonid+1];
    flashcardArray[buttonid+1]=flashcardArray[buttonid];
    flashcardArray[buttonid]=temp;

    resetGrid();
    makeGrid(flashcardArray,0,0);
  }
}

function card1Clicked(event){
  const buttonid=parseInt(event.target.id);

  resetGrid();
  makeGrid(flashcardArray,1,buttonid);
}

function card2Clicked(event){
  const buttonid=parseInt(event.target.id);

  resetGrid();
  makeGrid(flashcardArray,2,buttonid);
}

function deleteClicked(event){
  const buttonid=parseInt(event.target.id);
  console.log("delte id " + buttonid);

  flashcardArray.splice(buttonid, 1);

  if (flashcardArray.length==0){
  flashcardArray[0]=new flashcard("Question", "Answer", 0);
  }
  resetGrid();
/*
  if (flashcardArray.length==0){
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    //adder
    const adder=document.createElement('button');
    cardContainer.appendChild(adder);
    adder.textContent = "+";
    adder.classList.add('adder-button');
    adder.addEventListener('click', adderClicked);
    adder.id=0;

    container.appendChild(cardContainer);

  }else{
    makeGrid(flashcardArray,0,0);
  }
  */
  makeGrid(flashcardArray,0,0);

}


function submitText1(event){
  if (event.keyCode === 13 && !event.shiftKey) {
    event.preventDefault(); // Prevents the default Enter key behavior (line break)
    const text = event.target.value.trim(); // Get the text from the textarea
    console.log(text); // Do something with the text

    const buttonid=parseInt(event.target.id);
    flashcardArray[buttonid].question=text;

    resetGrid();
    makeGrid(flashcardArray, 0,0);
  }
}

function submitText2(event){
  if (event.keyCode === 13 && !event.shiftKey) {
    event.preventDefault(); // Prevents the default Enter key behavior (line break)
    const text = event.target.value.trim(); // Get the text from the textarea
    console.log(text); // Do something with the text

    const buttonid=parseInt(event.target.id);
    flashcardArray[buttonid].answer=text;

    resetGrid();
    makeGrid(flashcardArray, 0,0);
  }
}

function breakline(arr){
  var parts =[];
  var twoOnly=true;
  var a=0;

  for(var i=0; i<arr.length; i++){
    var text = arr[i];
    var splitline= text.split(splitter);
    if (splitline.length>1){
    var b;
        if (twoOnly){
        b=2;
      }
      else{
        b=splitline.length;
      }

      for(var j=0; j<b; j++){
        parts[a]=splitline[j];
        a++;
      }
  }
  else{
    parts[a]= splitline[0];
    a++;
    parts[a]= '...';
    a++;
  }
  }
  return parts;
}
function breakText(text){
    var parts = text.split(splitter);
    console.log(parts.length);
    return parts;
    
}


//splitter
let previousText="-";
function splitterKeyDown(event){
  if (event.key === 'Enter') {
  var input = document.getElementById("splitter-input");
  splitter = input.value;
  previousText=splitter;
  event.target.blur();
  }
}

function splitterFocus(){
  var input = document.getElementById("splitter-input");
  previousText=input.value;
}

function splitterBlur(){
  var input = document.getElementById("splitter-input");
  input.value=previousText;
}








function redirectToNewPage() {

  const myArray = flashcardArray;
  // Convert array to string
  const arrayString = JSON.stringify(myArray);

  // Encode the array string for URL
  const encodedArrayString = encodeURIComponent(arrayString);

  // Construct the URL with the encoded array string as a parameter
  const url = 'newpage.html?array=' + encodedArrayString;

  // Redirect to the destination page
  window.location.href = url;

}

function showAlert() {
  alert('Welcome to Flashcard Maker!, paste formatted data in the textarea to generate flashcards, or manually create them below!');
}