
document.querySelector('button').addEventListener('click', function () {
  document.querySelector('.hide').style.display = "none";
  fetch('https://data.nasa.gov/resource/9g7e-7hzz.json?$select=facility,location,city,state')
    .then(res => res.json())
    .then(response => {
      const facilities = response;
      facilities.forEach(facility => {
        const lon = facility.location.coordinates[0]
        const lat = facility.location.coordinates[1]
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&APPID=a8f28ccdc222c2c4ffdd599ad3709f5d`)
          .then(res => res.json())
          .then((response) => {
            const temp = response.main.temp
            console.log(temp)
            facility.temp = temp;
            displayFacility(facility);
          })
      })
    })
    .catch(err => {
      console.log(`error ${err}`)
      alert("Sorry, nothing came back")
    })
})

function displayFacility(facility) {
  const table = document.getElementById('table');
  const row = document.createElement('tr');


  row.innerHTML = `

      <td class="data">${facility.facility}</td>
      <td class="data">${facility.city}</td>
      <td class="data">${facility.state}</td>
      <td class="data">${facility.temp}</td>

    `

  table.appendChild(row)
}
