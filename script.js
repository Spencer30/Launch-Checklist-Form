// Write your JavaScript code here!
window.addEventListener("load", function() {
   //Get JSON data
   let mission = document.getElementById('missionTarget');
   fetch('https://handlers.education.launchcode.org/static/planets.json').then(function(response){
      response.json().then(function(json){
         let randomNum = Math.floor(Math.random() * json.length);
         mission.innerHTML = `<h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[randomNum].name}</li>
            <li>Diameter: ${json[randomNum].diameter}</li>
            <li>Star: ${json[randomNum].star}</li>
            <li>Distance from Earth: ${json[randomNum].distance}</li>
            <li>Number of Moons: ${json[randomNum].moons}</li>
         </ol>
         <img src="${json[randomNum].image}">`
      })
   })

   //Form Validations
   let form = document.querySelector('form');
   let pilotName = document.querySelector('input[name = pilotName]');
   let coPilotName = document.querySelector('input[name = copilotName]');
   let fuelLevel = document.querySelector('input[name = fuelLevel]');
   let cargoMass = document.querySelector('input[name = cargoMass]');
   //Update Shuttle Requirements
   let launchStatus = document.getElementById('launchStatus');
   let pilotStatus = document.getElementById('pilotStatus');
   let copilotStatus = document.getElementById('copilotStatus');
   let fuelStatus = document.getElementById('fuelStatus');
   let cargoStatus = document.getElementById('cargoStatus');
   form.addEventListener("submit", function(event) {  
      event.preventDefault();
      
      //Validation Checks
      if (pilotName.value === "" || coPilotName.value === "" || fuelLevel.value === "" || cargoMass.value === ""){
         return alert("All fields are required!");
      } 

      if (!isNaN(pilotName.value)) {
         return alert('Please enter a valid pilot name!');
      }

      if (!isNaN(coPilotName.value)) {
         return alert('Please enter a valid copilot name!');
      }

      if (isNaN(fuelLevel.value)) {
         return alert('Please enter a number only for fuel level!');
      }

      if (isNaN(cargoMass.value)) {
         return alert('Please enter a number only for cargo mass!');
      }
      
      //Update Launch Information
      document.getElementById('faultyItems').style.visibility = 'visible';
      pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
      copilotStatus.innerHTML = `CoPilot ${coPilotName.value} is ready for launch`;
      if (fuelLevel.value > 10000) {
         fuelStatus.innerHTML = `Fuel level high enough for launch`;
      }  else {
         fuelStatus.innerHTML = `Fuel level too low for launch`;
      } 
      
      if (cargoMass.value < 10000) {
         cargoStatus.innerHTML = `Cargo mass low enough for launch`;
      } else {
         cargoStatus.innerHTML = `Cargo mass too high for launch`;
      }
      if (fuelLevel.value > 10000 && cargoMass.value < 10000) {
         launchStatus.innerHTML = `Shuttle is ready for launch!`;
         launchStatus.style.color = 'green';
      } else {
         launchStatus.innerHTML = `Shuttle is NOT ready for launch!`;
         launchStatus.style.color = 'red';
      }

      //Reset fields after submit
      pilotName.value = '';
      coPilotName.value = '';
      fuelLevel.value = '';
      cargoMass.value = '';
   });
   
});



