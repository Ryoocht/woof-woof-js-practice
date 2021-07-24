const url = "http://localhost:3000/pups";
let dogFlag = false;

document.addEventListener("DOMContentLoaded", () => {
    getDogName();
    let filter = document.getElementById('good-dog-filter')
    filter.addEventListener('click', () => {
        dogFlag = !dogFlag
        if (dogFlag){
            filter.innerText = "Filter good dogs: ON";
            document.querySelectorAll(".false").forEach((dogo) => dogo.style.display = "none");
        } else {
            filter.innerText = "Filter good dogs: OFF";
            document.querySelectorAll(".false").forEach((dogo) => dogo.style.display = "flex");
        }
    })
})

function getDogName(){
    fetch(url)
    .then((resp) => resp.json())
    .then(dogObj => {
        console.log(dogObj)
        dogObj.forEach(dog => renderDoggo(dog))
    });
}

function renderDoggo(dog){
    let dogBar = document.getElementById('dog-bar');
    let span = document.createElement('span');
    span.className = dog.isGoodDog;
    span.innerText = dog.name;
    span.id = dog.id;
    dogBar.append(span)
    span.addEventListener('click', e => {
        fetchDog(e);
    });
}

function fetchDog(e){
    let dogId = e.target.id;
    fetch(`${url}/${dogId}`)
    .then((resp) => resp.json())
    .then((dog) => showMoreInfo(dog))
}

function showMoreInfo(dog){
    let dogInfo = document.getElementById('dog-info');
    let img = document.createElement('img');
    let dogName = document.createElement('h2');
    let isDogGoodBtn = document.createElement('button');
    img.src = dog.image;
    dogName = dog.name;
    isDogGoodBtn.id = 'toggle';
    dog.isGoodDog ? isDogGoodBtn.innerText = "IS GOOD DOG": isDogGoodBtn.innerText = "IS BAD DOG"
    isDogGoodBtn.addEventListener('click', e => {
        toggleDog(dog);
    })
    dogInfo.innerHTML = "";
    dogInfo.append(img, dogName, isDogGoodBtn);
}

function toggleDog(dog){
    let isGudDog = document.getElementById('toggle');
    dog.isGoodDog = !dog.isGoodDog;
    let dogId = document.getElementById(dog.id);
    dogId.className = dog.isGoodDog;
    fetch(`${url}/${dog.id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({isGoodDog: dog.isGoodDog})
    })
    .then((response) => response.json())
    .then(dog.isGoodDog ? isGudDog.innerText = "IS GOOD DOG": isGudDog.innerText = "IS BAD DOG")
}