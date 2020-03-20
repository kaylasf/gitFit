
var addWorkout = document.getElementById("newWorkout")
var showForm = document.querySelector(".newForm")
var hideForm = document.querySelector(".hide")


function handleNewWorkout() {
    //   window.location.href = "/user";
    showForm.setAttribute('style', 'display: show')
}
function hideMe() {

    showForm.setAttribute('style', 'display: none')
}
addWorkout.addEventListener("click", handleNewWorkout)
hideForm.addEventListener("click", hideMe)