// $(document).ready(function() {
//   getWeather();
// });

function getWeather(searchQuery) {
  $(".error-message").text("");
  $(".city").text("");
  $(".temp").text("");
  var url = "http://api.openweathermap.org/data/2.5/weather?q="+searchQuery+"&units=imperial&APPID="+apiKey;
  $.ajax(url, {
    success: function (data) {
      $(".city").text(data.name);
      $(".temp").text(data.main.temp + " °F");
    }, error: function (error) {
      $(".error-message").text("An error occured: "+error.responseJSON.message);
    }
  });
}

function searchWeather() {
  var searchQuery = $('.search').val(); // grab value from search input
  getWeather(searchQuery);
}