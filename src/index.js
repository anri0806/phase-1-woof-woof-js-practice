document.addEventListener("DOMContentLoaded", () => {
  getPupData();
  filterGoodDog();
});

////Fetch - ADD PUPS TO DOG BAR////
function getPupData() {
  fetch("http://localhost:3000/pups")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((pup) => renderPup(pup));
    });
}

////Fetch/Patch - TOGGLE GOOD DOG////
function updateDogInfo(pup, newValue) {
  fetch(`http://localhost:3000/pups/${pup.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      isGoodDog: newValue,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

////Render DOM - ADD PUPS TO DOG BAR////
function renderPup(pup) {
  let span = document.createElement("span");
  span.innerText = pup.name;
  document.querySelector("#dog-bar").appendChild(span);

  ////Render DOM - SHOW MORE INFO ABOUT EACH PUP////
  span.addEventListener("click", () => {
    let dogInfo = document.querySelector("#dog-info");

    if (pup.isGoodDog === true) {
      dog = "Good Dog!";
    } else if (pup.isGoodDog === false) {
      dog = "Bad Dog!";
    }

    dogInfo.innerHTML = `
    <img src="${pup.image}" />
    <h2>${pup.name}</h2>
    <button class="dogBtn">${dog}</button>
    `;

    ////Render DOM - TOGGLE GOOD DOG////
    let dogBtn = document.querySelector(".dogBtn");
    dogBtn.addEventListener("click", (e) => {
      if (e.target.innerText === "Good Dog!") {
        dogBtn.innerText = "Bad Dog";
        newValue = false;
      } else if (e.target.innerText === "Bad Dog!") {
        dogBtn.innerText = "Good Dog";
        newValue = true;
      }
      updateDogInfo(pup, newValue);
    });
  });
}

////BONUS - FILTER GOOD DOGS////
//function filterGoodDog() {
  //let filterBtn = document.getElementById("good-dog-filter");
  //filterBtn.addEventListener("click", () => {
    //if (filterBtn.innerText === "Filter good dogs: OFF") {
      //filterBtn.innerText = "Filter good dogs: ON";
      //renderFilteredDog();
    //} else {
      //filterBtn.innerText === "Filter good dogs: OFF";
    //}
  //});
//}

//function renderFilteredDog() {
  //fetch("http://localhost:3000/pups")
    //.then((response) => response.json())
    //.then((data) => {
      //console.log(data)
      //data.forEach((pup) => {
        //console.log("pup.isGoodDog value:", pup.isGoodDog

        //if (pup.isGoodDog === true) {
          //console.log("true pup:", pup)
          //renderPup(pup);
        //}
      //});
    //});
//}
