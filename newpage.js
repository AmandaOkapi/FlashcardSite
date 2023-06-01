      var b=0;
      // Get the array string from the URL parameter
      const urlParams = new URLSearchParams(window.location.search);
      const encodedArrayString = urlParams.get('array');

      // Decode the array string
      const arrayString = decodeURIComponent(encodedArrayString);

      // Convert the array string back to an array
      const receivedArray = JSON.parse(arrayString);

      // Use the received array
      console.log(receivedArray);

      console.log(receivedArray[0]);
    
      var newflashcardArray=receivedArray.slice();

      var starredArray=[];

      var displayStarred=false;


      let isSpacePressed = false;
      let isLeftPressed = false;
      let isRightPressed = false;
      
      document.addEventListener('keydown', function(event) {
        switch (event.code) {
          case 'Space':
            if (!isSpacePressed) {
              isSpacePressed = true;
              event.preventDefault();
              flipCard(document.getElementById("currentFlashcard"));
            }
            break;
          case 'ArrowLeft':
            if (!isLeftPressed) {
              isLeftPressed = true;
              event.preventDefault();
              leftB();
            }
            break;
          case 'ArrowRight':
            if (!isRightPressed) {
              isRightPressed = true;
              event.preventDefault();
              rightB();
            }
            break;
          default:
            break;
        }
      });
      
      document.addEventListener('keyup', function(event) {
        switch (event.code) {
          case 'Space':
            isSpacePressed = false;
            break;
          case 'ArrowLeft':
            isLeftPressed = false;
            break;
          case 'ArrowRight':
            isRightPressed = false;
            break;
          default:
            break;
        }
      });
      
      

    window.onload = function() {
        var currentPage = window.location.href;
            if (currentPage.includes('newpage.html')) {
                console.log("Website 2 loaded!");
                const firstFront=document.getElementById('spanQ');
                const firstBack=document.getElementById('spanA');

                firstFront.textContent=receivedArray[0].question;
                firstBack.textContent=receivedArray[0].answer;

                var div = document.getElementById("circle");
                div.style.backgroundColor="#d5dbee";

                var scoretext= document.getElementById("score");
                scoretext.textContent="";

                var textresults=document.getElementById("textresults");
                textresults.textContent="";


                resizeTextToFitDiv();
                changeCardIndex(b);
            }
        }

    function resizeTextToFitDiv() {
        const div = document.getElementById('currentFlashcard');
        const mytext = div.innerText;
      
        console.log(mytext);
      
        if (mytext.length<42){
          div.style.fontSize='40px';
        }
        else if (mytext.length<50){
          div.style.fontSize='35px';
        }
        else if (mytext.length<600){
          div.style.fontSize='25px'
        }
        else{
          div.style.fontSize='20px';
        }
      }
      
      
function flipCard(card){
  if(starclicked==false){
    card.classList.toggle("flipped");
  }
    /*//if (currentCard.value==0){
        currentCard.textContent='changed';
        currentCard.value=1;
        currentCard.classList.add('flip-animation');
    }
    else{
        currentCard.classList.add('flip-animation');
        currentCard.textContent=newflashcardArray[b].question;
        currentCard.value=0;
        //currentCard.classList.remove('flip-animation');
    }
    */
  }

  function leftB(){
    if (b>0){
        b--;
        checkforStar();

        const cardFronttext=document.getElementById("spanQ");
        const cardBacktext=document.getElementById("spanA");

        const card= document.getElementById('currentFlashcard');
        if (card.classList.contains('flipped')){
            const backcard=document.getElementById('currentBack');
            const frontcard=document.getElementById('currentFront');
            cardFronttext.textContent=newflashcardArray[b].answer;
            cardBacktext.textContent=newflashcardArray[b].question;
            backcard.style.backgroundColor="#fdf6e3";
            frontcard.style.backgroundColor="#e9e3d0";
        }
        else{
            const backcard=document.getElementById('currentBack');
            const frontcard=document.getElementById('currentFront');
            cardFronttext.textContent=newflashcardArray[b].question;
            cardBacktext.textContent=newflashcardArray[b].answer;

            backcard.style.backgroundColor="#e9e3d0";
            frontcard.style.backgroundColor="#fdf6e3";
        }
        resizeTextToFitDiv();
        changeCardIndex(b);
    }

  }


  function rightB(){
    if (b<newflashcardArray.length-1){
        b++;
        checkforStar();
        const cardFronttext=document.getElementById("spanQ");
        const cardBacktext=document.getElementById("spanA");

        const card= document.getElementById('currentFlashcard');
        if (card.classList.contains('flipped')){
            const backcard=document.getElementById('currentBack');
            const frontcard=document.getElementById('currentFront');
            cardFronttext.textContent=newflashcardArray[b].answer;
            cardBacktext.textContent=newflashcardArray[b].question;
            backcard.style.backgroundColor="#fdf6e3";
            frontcard.style.backgroundColor="#e9e3d0";
        }
        else{
            const backcard=document.getElementById('currentBack');
            const frontcard=document.getElementById('currentFront');
            cardFronttext.textContent=newflashcardArray[b].question;
            cardBacktext.textContent=newflashcardArray[b].answer;

            backcard.style.backgroundColor="#e9e3d0";
            frontcard.style.backgroundColor="#fdf6e3";
        }
        resizeTextToFitDiv();
        changeCardIndex(b);
    }
    else{
        //reached end
        console.log("reached end");
        createConfetti();

        const divElement = document.getElementById('results');
        divElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        endreached();
    }
  }
function changeCardIndex(index){
    const indexCntdiv= document.getElementById('indexCnt');
    if(displayStarred==false){
    indexCntdiv.textContent= (b+1) + "/" + newflashcardArray.length + " cards"
    }
    else{
      indexCntdiv.textContent= (b+1) + "/" + starredArray.length + " cards"
    }
}

var confettion=false;
function createConfetti() {
  if (confettion==false){
    confettion=true;
    const confettiColors = ["gold", "red", "blue", "green", "purple", "orange"];
    const confettiContainer = document.getElementById("confetti-container");
    const confettiCount = 120; // Number of confetti pieces

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.left = Math.random() * window.innerWidth + "px";
      confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      confetti.style.setProperty("--translate-x", Math.random());
      confetti.style.setProperty("--translate-y", Math.random());
      confetti.style.setProperty("--rotation", Math.random());
      confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
      confettiContainer.innerHTML = "";
    }, 5000); // Remove confetti after 5 seconds
    confettion=false;
  }
}

function shuffle(){
    newflashcardArray= shuffleArray(newflashcardArray); 

    const cardFronttext=document.getElementById("spanQ");
    const cardBacktext=document.getElementById("spanA");

    b=0;
    const card= document.getElementById('currentFlashcard');
    if (card.classList.contains('flipped')){
        const backcard=document.getElementById('currentBack');
        const frontcard=document.getElementById('currentFront');
        cardFronttext.textContent=newflashcardArray[b].answer;
        cardBacktext.textContent=newflashcardArray[b].question;
        backcard.style.backgroundColor="#fdf6e3";
        frontcard.style.backgroundColor="#e9e3d0";
    }
    else{
        const backcard=document.getElementById('currentBack');
        const frontcard=document.getElementById('currentFront');
        cardFronttext.textContent=newflashcardArray[b].question;
        cardBacktext.textContent=newflashcardArray[b].answer;

        backcard.style.backgroundColor="#e9e3d0";
        frontcard.style.backgroundColor="#fdf6e3";
    }

    resizeTextToFitDiv();
    changeCardIndex(b);
}

   // Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
var starclicked=false;
  function starBclicked(){
    starclicked=true; 
    const starFront= document.getElementById("starFront");
    const starBack= document.getElementById("starBack");
    const starb=document.getElementById("starB");

    if ( newflashcardArray[b].starred==0){
    newflashcardArray[b].starred=1;
    starFront.style.color="gold";
    starBack.style.color="gold";
    starb.title="unstar"
    }
    else{
      newflashcardArray[b].starred=0;
      starFront.style.color="#e9e3d0";
      starBack.style.color="#e9e3d0";
      starb.title="star"
    }

    setTimeout(function() {
      starclicked=false; 
    }, 500);
  }

  function resetStars(){
    for (var i=0; i<newflashcardArray.length; i++){
    newflashcardArray[i].starred=0;
    }
  }

  function checkforStar(){
    const starFront= document.getElementById("starFront");
    const starBack= document.getElementById("starBack");
    if (newflashcardArray[b].starred==1){
      starFront.style.color="gold";
      starBack.style.color="gold";
    }
    else{
      starFront.style.color="#e9e3d0";
      starBack.style.color="#e9e3d0";

    }

  }

  function endreached(){
    var starcnt=countstars();
    const divElement = document.getElementById('results');
    divElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    var div = document.getElementById("circle");
    div.style.backgroundColor="#d5eee8";

    var scoretext= document.getElementById("score");
    scoretext.textContent=Math.floor(((newflashcardArray.length-starcnt)/newflashcardArray.length)*100) + "%";

    var text=document.getElementById("textresults");

    text.innerHTML = starcnt + " starred cards<br>" + (newflashcardArray.length - starcnt) + "/" + newflashcardArray.length;
    
  }

  function countstars(){
    var  cnt=0;
    for (var i=0; i<newflashcardArray.length; i++){
      if (newflashcardArray[i].starred==1){
        cnt++;
      }
    }

    return cnt;
  }


  function reviewClicked(){
    b=0;
    var a=0;
    starredArray.splice(0);
    for (var i=0; i<newflashcardArray.length; i++){
      if (newflashcardArray[i].starred ==1){
        starredArray[a]=newflashcardArray[i];
        a++;
      }
    }
    if (starredArray.length>0){
    newflashcardArray=starredArray;
    resetStars();
    const firstFront=document.getElementById('spanQ');
    const firstBack=document.getElementById('spanA');

    firstFront.textContent=newflashcardArray[0].question;
    firstBack.textContent=newflashcardArray[0].answer;
    resizeTextToFitDiv();

    changeCardIndex(b);
    }
    else{
      repeatClicked();
    }

  }

  function repeatClicked(){
    b=0;
    resetStars();
    
    newflashcardArray=receivedArray.slice();;
    const firstFront=document.getElementById('spanQ');
    const firstBack=document.getElementById('spanA');
    checkforStar();
    firstFront.textContent=newflashcardArray[0].question;
    firstBack.textContent=newflashcardArray[0].answer;
    resizeTextToFitDiv();
    changeCardIndex(b);
  }

  function switchClicked(){
    for (let i = 0; i < newflashcardArray.length; i++) {
      swapQuestionAndAnswer(newflashcardArray[i]);
    }
    const cardFronttext=document.getElementById("spanQ");
    const cardBacktext=document.getElementById("spanA");

    const card= document.getElementById('currentFlashcard');
    if (card.classList.contains('flipped')){
      const backcard=document.getElementById('currentBack');
      const frontcard=document.getElementById('currentFront');
      cardFronttext.textContent=newflashcardArray[b].answer;
      cardBacktext.textContent=newflashcardArray[b].question;
      backcard.style.backgroundColor="#fdf6e3";
      frontcard.style.backgroundColor="#e9e3d0";
  }
  else{
      const backcard=document.getElementById('currentBack');
      const frontcard=document.getElementById('currentFront');
      cardFronttext.textContent=newflashcardArray[b].question;
      cardBacktext.textContent=newflashcardArray[b].answer;

      backcard.style.backgroundColor="#e9e3d0";
      frontcard.style.backgroundColor="#fdf6e3";
  }
  }

  function swapQuestionAndAnswer(flashcard) {
    const temp = flashcard.question;
    flashcard.question = flashcard.answer;
    flashcard.answer = temp;

    
  }