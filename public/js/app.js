
const addWorkout = document.getElementById("newWorkout")
const showForm = document.querySelector(".newForm")
const subForm = document.querySelector(".submitForm")
const hideForm = document.querySelector(".hide")
let routineId = ""
//Exercise Intake
const routineName = document.getElementById("routineName")
// CARDIO
let cardioeName = document.getElementById("cardioName")
const distance = document.getElementById("distance")
const duration = document.getElementById("duration")
const cardioAdd = document.getElementById("cardioAdd")
// RESISTANCE
const weighteName = document.getElementById("weightName")
const weight = document.getElementById("weight")
const sets = document.getElementById("sets")
const reps = document.getElementById("reps")
const weightAdd = document.getElementById("weightAdd")
//SUBMIT 
const postRoutine = document.getElementById("postRoutine")

//create routines function


//FUNCTIONALITY to hide and show Build Routine form
function handleNewWorkout() {
    //   window.location.href = "/user";
    showForm.setAttribute('style', 'display: show')
    subForm.setAttribute('style', 'display: show')

    //WHEN CLICKING CREATE ROUTINE- IT CREATES A ROUTINE
    $.post('/api/routine', function (res) {
        console.log(res)
        routineId = res._id
        console.log(`this is routineID ${res._id}`)
    })
}
function hideMe() {
    showForm.setAttribute('style', 'display: none')
    subForm.setAttribute('style', 'display: none')
}

addWorkout.addEventListener("click", handleNewWorkout)
// hideForm.addEventListener("click", hideMe)





// GRAB ID OF ROUTINE (routineId) AND START ADDING EXERCISES TO IT. 


function addCardio() {
    const cardio = {
        name: cardioeName.value,
        distance: distance.value,
        duration: duration.value
    }
    $.post(`/exercise/${routineId}`, cardio, function (res) {
        console.log(res.exercises)
        for (let i = 0; i < res.exercises.length; i++) {
            const cardioCard = document.createElement('div')
            cardioCard.innerHTML = `
<div class="card cardioCard mb-3">

         <div class="card-header">
           <div class="row">
             <div class="col-6">
               <h5>${res.exercises[i].name}</h5>
             </div>
             <div class="col-6">
               <button type="button" class="btn btn-secondary btn-sm">Delete</button>
             </div>
           </div>
         </div>

         <div class="card-body">
           <div class="row">
             <div class="col-6">
               <p class="card-text">Distance: ${res.exercises[i].distance}</p>
             </div>
             <div class="col-6">
               <p class="card-text">Duration: ${res.exercises[i].duration}</p>
             </div>
           </div>
         </div>
     
       </div>
`
document.getElementById("cardsGoHere").appendChild(cardioCard)
          
        
        }   

        cardioeName.value = ""
        distance.value = ""
        duration.value = ""
    })


}
cardioAdd.addEventListener("click", addCardio)

//ADD WEIGHT TRAINING
function addWeight() {
    const weightExercise = {
        name: weighteName.value,
        weight: weight.value,
        sets: sets.value,
        reps: reps.value
    }
    $.post(`/exercise/${routineId}`, weightExercise, function (res) {
        console.log(res)
        for (let j = 0; j < res.exercises.length; j++) {
        const weightCard = document.createElement('div')
        weightCard.innerHTML = `
        <div class="card weightCard mb-3">

        <div class="card-header">
          <div class="row">
            <div class="col-6">
              <h5>${res.exercises[j].name}</h5>
            </div>
            <div class="col-6">
              <button type="button" class="btn btn-secondary btn-sm">Delete</button>
            </div>
          </div>
        </div>

        <div class="card-body">

          <div class="row">
            <div class="col-6">
              <p class="card-text">Weight:${res.exercises[j].weight}</p>
            </div>
            <div class="col-6">
              <p class="card-text">Sets:${res.exercises[j].sets}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <p class="card-text">Reps:${res.exercises[j].reps}</p>
            </div>
           
          </div>
        
        
        </div>
      
      </div>
`
        document.getElementById("cardsGoHere").appendChild(weightCard)

        weighteName.value = ""
        weight.value = ""
        sets.value = ""
        reps.value = ""
        }

    })

}
weightAdd.addEventListener("click", addWeight)


//Submit routine

function addRoutine() {

    const submitRoutine = {
        name: routineName.value,
        completed: false,
    }

    $.post(`/routine/${routineId}`, submitRoutine, function (res) {
        console.log(res)
        hideMe()

        const routineCard = document.createElement('div')
        routineCard.innerHTML = `<div class="card">
    <div class="card-body">
    <h5 class="card-title">${res.value.name}</h5>
     <p class="card-text">card's content.</p>
    </div>
    </div>`

        document.getElementById("routineHere").appendChild(routineCard)
    })
}

postRoutine.addEventListener("click", addRoutine)