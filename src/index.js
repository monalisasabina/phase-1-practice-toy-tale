let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-toy-btn");

  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function fetchToys(){

    fetch('http://localhost:3000/toys')
     .then((response) => response.json())
    .then(toys => toys.forEach(toy => renderOneToy()))
  }

  function initialize (){
   fetchToys()
  }
  initialize();

  function renderOneToy(toy){
  
    let card=document.createElement('li')
    card.innerHTML=`
       <div class="card">
         <h2>${toy.name}</h2>
         <img> src= "${toy.image}" class="toyAvatar" >
         <p> ${toy.likes} <strong>likes</strong></p>
         <button class="like-btn" id="[toy_id]">Like ❤️</button>
       </div>
    `

    // PATCH
    card.document.querySelector("button#like-btn").addEventListener('click', () => {
     toy.likes +=1
     updateTOY(toy)
     })
    
  }

 

  // ...................................................................
  // POST

  document.querySelectorAll('form#add-toy-form'),addEventListener('submit',handleSubmit)
      
     function handleSubmit(event){
        event.preventDefault();

        let toyObject ={
          name: event.target.name.value,
          image: event.target.image.value,
          likes: 5
        }
       renderOneToy(toyObject) 
       addToy(toyObject)
     
    
     function addToy(){
     fetch('http://localhost:3000/toys',{
     method: 'POST',
     headers: {
      'Content-Type':'application/json'
      },
     body:JSON.stringify(toyObject)  
    })
    .then((response) => response.json())
    .then( toy => console.log(toy))
  }


//......................................................................... 
// PATCH: INCREASING TOY LIKES 
  
 function updateTOY(){
  fetch('http://localhost:3000/toys',{
    method: 'PATCH',
    headers: {
     'Content-Type':'application/json'
     },
    body:JSON.stringify(toyObject)  
   })
   .then((response) => response.json())
   .then( toy => console.log(toy))
 }
 
     }
});
