// This function commented out after adding the capability for users to search.
// What would you do if you wanted the page to show the weather for a default city once loaded?

// $(document).ready(function() {
//   getWeather();
// });

// This function first resets the text fields to have no content.
// Then, it creates the URL to send to OpenWeatherMap, including the content from the page's 
//    search field.
// Then, it performs an AJAX call to that URL.
// If it's successful, the function takes the JSON data that was returned, and pulls the name 
//    and temperature out of the object, then uses jQuery to display them on the page.
// If there is an error, it shows an error message instead.
function getWeather(searchQuery) {
  $(".error-message").text("");
  $(".city").text("");
  $(".temp").text("");
  var url = "https://api.openweathermap.org/data/2.5/weather?q="+searchQuery+"&units=imperial&APPID="+apiKey;
  $.ajax(url, {
    success: function (data) {
      $(".city").text(data.name);
      $(".temp").text(data.main.temp + " °F");
    }, error: function (error) {
      $(".error-message").text("An error occured: "+error.responseJSON.message);
    }
  });
}

// This function grabs the value from the search input, then passes it along to the 
//     getWeather() function.
function searchWeather() {
  var searchQuery = $('.search').val(); // grab value from search input
  getWeather(searchQuery);
}