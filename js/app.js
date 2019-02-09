class AjaxWeather{
  constructor(){
    this.apiKey = 'b260d64f81c9d6d97d3dcaf49c5ab3e4';
  }
  async getWeather(city){
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.apiKey}&units=metric`;
    const weatherData = await fetch(url);
    const weather = await weatherData.json();
    return weather;
  }
}

class Display{
  constructor(){
    this.results = document.querySelector('.results');
    this.cityName = document.getElementById('cityName');
    this.cityCountry = document.getElementById('cityCountry');
    this.cityIcon = document.getElementById('cityIcon');
    this.cityTemp = document.getElementById('cityTemp');
    this.cityHumidity = document.getElementById('cityHumidity');
  }
  showWeather(data){
    //console.log(data);
    const {name,sys:{country},main:{temp,humidity}} = data;
    const {icon}=data.weather[0];

    this.results.classList.add('showItem');
    this.cityName.textContent = name;
    this.cityCountry.textContent = country;
    this.cityTemp.textContent = temp;
    this.cityHumidity.textContent = humidity;
    this.cityIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
  }
}



(function() {
  //getting the related DOM elements
  const form = document.getElementById('wheatherForm');
  const cityInput = document.getElementById('cityInput');
  const feedback = document.querySelector('.feedback');

  //class
  const ajax = new AjaxWeather();
  const display = new Display();

  form.addEventListener("submit", event => {
    //clicking on the submit button submits the form which is prevented by preventDefault()
    event.preventDefault();
    //get the name of the city
    const city = cityInput.value;
    //if the form is empty
    if(city.length===0){
      showFeedback('City Value cannot be empty');
    }
    else{
      //else search for the city
      ajax.getWeather(city).then(data => {
        if(data.message === 'city not found'){
          showFeedback('City with such name cannot be found')
        }else{
          display.showWeather(data);
        }
      });
    }

  })

//display the result with a timeout for 3 secs.
  function showFeedback(text){
    feedback.classList.add('showItem');
    feedback.innerHTML = `<p>${text}</p>`;

    setTimeout(() => {
      feedback.classList.remove('showItem');
    },3000)
  }


}());
