# APIWebApp

Check it out at: https://enigmatic-falls-78431.herokuapp.com/

_Note: Unlike with the Base Web App, you shouldn't fork and clone the code in this repo onto your machine. Instead, try to follow the instructions below, using the code in this repo as a reference._

## All about APIs

First of all — what is an API? The actual definition of an API is pretty broad — APIs are a set of operations—with specific inputs and outputs—used for interacting with something, like a database, web service, or hardware.

For example, let's say you wanted to display Beyonce's Twitter feed on your website. You could use the Twitter API to grab the tweet history of a specific user (in this case, Beyonce). Most large software companies like Google, Twitter, Facebook, and even HubSpot have APIs that let you use their services and data in your own applications. Many different kinds of data can be accessed via an API — weather, movie information and reviews, sports stats, restaurants, maps, Beyonce's tweets, and so on. If you're wondering if an API exists for some form of data you’d like to incorporate into your app, give it a search. Chances are there's an API for it.

### How APIs work

Much like using HTTP, or Hyper Text Transfer Protocol, to request a website, the data from most web APIs can be accessed by sending an HTTP request to a URL. 

There are a few types of HTTP methods. Some popular ones are `GET`, `POST`, `DELETE`, and `PUT`. `GET` is the most commonly used type — it's for retrieving data from a service, like reading a specific item from a database. `POST` is for sending data to a service, usually to create something new in a database. This means that `POST` methods also contain a payload with the information you want to send. We won’t go through what all the other methods do right now, but check out the Resources section below for an in-depth explanation of each method type. 

### Making the request

Let’s explore using a `GET` request to grab the weather data for a given city. This means that your request will be read-only — it won’t actually change any of OpenWeatherMap's data.

While most APIs use HTTP requests, APIs all have different specifications for how developers can interact with them. Each API has its own URL structure and rules for what kinds of requests it will accept. 

For example, to get the weather for Boston, you send a `GET` request to this URL. 

```
  https://api.openweathermap.org/data/2.5/weather?q=Boston&units=imperial
```

This URL is a typical example of what a request to a web service usually looks like. First, you start off with the protocol: HTTP or HTTPS. Then you have some base URL — in this case, `api.openweathermap.org/`. Then you add more specific paths to tell the API exactly what information you want. In this case, adding `data/2.5/weather` to the URL means you want the current weather for a location. 

Then, you have the query parameters, like `?q=Boston&units=imperial`. They come after a question mark, are formed by key/value pairs, and are separated by ampersands. These query parameters are a useful way of specifying the information you want to the server so that it sends back the correct data. 

The data that the API returns will also be totally different depending on the API. Most web APIs return data in the JSON format, which is a very simple object format that uses key-value pairs.

OpenWeatherMap returns a large JSON object, which looks like this. By understanding the structure of a JSON object, you can easily take that object and pull out the information you want.

```
{
  "coord":{"lon":-71.06,"lat":42.36},
  "weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],
  "base":"cmc stations",
  "main":{"temp":37.42,"pressure":1029,"humidity":57,"temp_min":33.8,"temp_max":50},
  "wind":{"speed":8.05,"deg":60},
  "rain":{"1h":0.3},
  "clouds":{"all":1},
  "dt":1459956213,
  "sys":{"type":1,"id":1801,"message":0.0063,"country":"US","sunrise":1459937777,"sunset":1459984620},
  "id":4930956,
  "name":"Boston",
  "cod":200
}
```

A different weather API would probably return similar data, like the temperature, wind speed, chance of rain,  and so on — but it would likely return a JSON object in a completely different format. 

### Documentation

The best way to learn how to use a certain API is to go to its website and read the documentation. Most APIs will provide instructions for the different kinds of requests you can send, and what information will be sent back. OpenWeatherMap has extensive docs detailing how to structure a request and what kinds of weather data it’s capable of returning.

### Authorization

Most APIs require some form of authorization. By letting only authorized users make requests, it better protects the API from abuse. Usually, you can get authorization by making an account with the service and getting an API key, which is sometimes also called an access token. This is a string you send along with the request — usually as a query parameter like `apiKey=your api key` — that lets the API know you're an authorized user. APIs all have their own way of doing this and have instructions on how to get started in their documentation.

API keys are sensitive information, since they dictate how you can access different services. There are bots that continuously scrape GitHub looking for API keys to abuse. This means you should get in the practice of NOT exposing them in your code on GitHub. You can hide your API key by setting it as an environment variable on Heroku. This means Heroku will store the contents of that variable securely and will replace the variable with the real value when running your app.

Finally, to access an API and use its data in your app, you’ll need a way to actually send a request to it and handle the data it returns. You’ll use AJAX to send the request to OpenWeatherMap. AJAX is a technique for sending and receiving data from a server. One useful feature of AJAX is its success and error handlers. These are functions that get called based on the result of your API request.

The success handler function will get called when the request goes smoothly and comes back with the desired data. In your case, the function will take the weather data, pull out the information you want, and display it on your page using jQuery. The error handler function is called when something goes wrong. This is extremely important when using APIs, as requests can sometimes run into an error. In most cases, they’ll return some form of error message that you can display to your user.

With this information, you now have enough baseline knowledge on APIs to start using them.

## Adding the OpenWeatherMap API

With a working knowledge of APIs, let’s dive into reading API documentation, setting up your environment variables, and making API calls to retrieve data and display it in your web app.

Today we’ll be using the OpenWeatherMap API as an example. We chose this service because it’s simple and free to use. If you want to use another API, the steps you’ll take today should apply to most APIs. If you're not familiar with APIs, we’d recommend staying away from more complicated ones like Google and Facebook. Instead, stick with something a bit simpler for now to practice.

#### 1. Create an account
Go to “openweathermap.org” and click “Sign Up.” Enter your information to create your account.

#### 2. Find your API Key
Next, you need your API key. Your API key is like a passcode that gets you access to an API. On the OpenWeatherMap website, you can find it by clicking on “API Keys.” Your default API key lives here — it’ll look like a bunch of jumbled numbers and letters.

#### 3. Hide your API Key
Next, for security reasons, let’s make sure that Heroku knows your API key without listing it anywhere in your code. Copy that API key, then head to your terminal. Type, the following, then hit enter. 
```
  heroku config:set API_KEY=WhateverYourAPIKeyIs
```
Next, save that API key variable locally in a file named `.env`. This file will never be pushed to Github or Heroku; the web app will read from this file locally, and will pull it from Heroku's own configuration system once deployed. This way, you can use `API_KEY` in your local environment and on Heroku without actually having it in your code. To do that, run: 
```
  heroku config:get API_KEY -s >> .env
```
Next, because you’ll need to use the API key inside of your app when setting up your API request, let’s set it as a variable. Go to your `head.ejs` file, and put it before the reference to your `main.js` file. This way, you make sure the code you write later on in your `main.js` file can use the variable. Inside a `<script>` tag, write: 
```
  var apiKey = '<%= process.env.API_KEY %>';
```

#### 4. Set up the HTML
Let’s start with an easy one — let's display the temperature for one city. Start by creating a place in `index.ejs` where you can display that text. Add a `div` with the class of “city” and another `div` with the class of “temp.”

#### 5. Fetch the weather when the page loads
To call the API, you’ll use jQuery’s `ajax` method to make your requests and to update your HTML with the values you get back. Luckily, jQuery is one of the libraries we already included in your app.

Head to your `main.js` file. This is where you’ll be writing the functions that will interact with the OpenWeatherMap API. At the top of your main.js file, write a function that calls a function called `getWeather()`, which makes the API request, as soon as the user loads the page. It should look like:

```
  $(document).ready(function() {
    getWeather();
  });
```

Now you’ll create a function called `getWeather()` that will retrieve the weather for a particular city. HubSpot is located in Boston, so we’ll be using Boston as our example, but feel free to use your own. We'll have to build the URL for the API request according to OpenWeatherMap's specifications. Let’s go to the documentation to figure out how to do that.

#### 6. Read the documentation

On the [OpenWeatherMap website](https://openweathermap.org/), click on the "API" tab. Then click on the “How to Start” link. It says here that you need to include your API key in every call. Let’s remember that for later.

Since you’re loading the current weather data, let’s click on the docs for that option. Because Boston is a well-known city, we’ll use this option to search by city name. If your city or town is smaller, you might have to use one of the other options, like City ID or Zip Code. You’ll see  that the documentation provides the structure of the API call and some examples. Copy one of the examples — you’ll use it as a template when constructing your API call.

Now, head to your `main.js` file and start writing the function to retrieve the current weather. You’ll give your function the name `getWeather`. Since you’ll need to construct a URL as part of your request, create a variable called `url` and set it equal to that line you just copied. First, add the protocol — `https://`. Then, switch out `city name` in the example for `Boston`.

#### 7. Include your API Key
Let’s look at the documentation to reference how to include your API Key. Head back to the getting started page. It looks like it wants you to include the API key as a query parameter. Query parameters, which use the “key equals value” format, let you send additional information in an organized way to the server, and they’re separated by ampersands. Copy that and add it to your URL. Recall that you saved your apiKey as a variable, so you can just write `+apiKey` in your URL and the app will fill it in.

#### 8. Set up your AJAX Call

Next, let’s construct your AJAX call under your URL variable. You can do that by writing:

```
  $.ajax(url, {
    success: function (data) {
    
    }
  });
```

Then, to make sure the data is coming through, write a `console.log` function inside of the success handler with the `data` variable inside. This will show the result of the response in your browser’s JavaScript console. This is a useful tool for testing your code incrementally. Constructing a function like this can seem complicated, but there are lots of references out there that can guide you in the correct syntax until it becomes second nature.

Save your file, head to your terminal, and run your app. Now, in order to access your console, head to the “View” option, then “Developer,” then “JavaScript Console.” If you’re using a browser other than Chrome, these steps might be different, so just do a search to figure out how to access your console in that browser.

You should see an `Object` in your console. Open it up, and you should see all the data returned in that JSON object. You can see all sorts of information here, from the temperature to the wind speed. Notice that the temperature looks a little bit off — that’s a bit warm for Fahrenheit. Head back to the current weather API documentation to see what it says. Look in the “units format” section. As it turns out, OpenWeatherMap delivers its data in Kelvin by default. If you want to get Fahrenheit measurements, you should include another query parameter — `units=imperial` — in your API call. Copy that snippet and add it to the URL in your “main.js” file.

#### 9. Display the result on the page

Now that you know the API is returning the data correctly, you can put it on the screen. Remember those `div`’s you created earlier? You can access those and change their text using jQuery. To do that, type:

```
  $('.city').text();
```

This tells jQuery to change the text inside that `div`. Then, put the city name returned in the JSON object. To do that, write `data.name`. This tells the code to take the `data` object, then pull out the `name` attribute. 

Copy that line and do the same for the temperature, changing the class name to `temp` and the second part to `data.main. temp`. You can see this mirrored in the JSON object in your console. Start with the `data` object, then find the `main` section, then `temp` within that section — once you get the hang of it, you’ll be navigating JSON objects seamlessly.

Save your work, then go back to your app and refresh the page. There you go — you should see the city name and temperature displayed on the page. 

## Exploring more advanced API techniques 

Now, you’ll take your API calls one step further by letting your users search for the weather in any city. 

#### 1. Add a search bar in the HTML
To do that, you first need a search bar. Head to your `index.ejs` page, and add an input with the class of `search` and type `text`. To make it easy for users to understand what to type, add a placeholder of `Enter city name`. You’ll also want to add a button that users can click to trigger the search. Give that button the type `button` and an `onClick` handler of `searchWeather()`. This tells the button that when it’s clicked, it should execute the function `searchWeather()`. If you need a reference for what the finished code looks like, take a look at the  `index.ejs` page in this repo.

#### 2. Modify your code to take the input

Next, head to your `main.js` file to create that function. First, you need to get the text that the user entered in the input field. Create a variable called `searchQuery`, and set it equal to the value of that input field. You can do that using jQuery  to target the field with the class `search`, then type `.val()` to grab that value. 

Then, call the `getWeather` function that you wrote in the last section, passing in your `searchQuery` variable so that your `getWeather` function can use it. Next, you’ll want to modify your `getWeather` function to take a single argument — `searchQuery` — and send that value in the request. Add that argument to the top of your function. 

Next, take that `searchQuery` variable and plug it into your URL by using the `+` sign. This way, whatever value the user has typed into the search field will be inserted into the URL. And since your function now relies on having an input rather than running when the page loads, you can go ahead and remove or comment out the function at the top of the file which retrieves the weather automatically.

Go ahead and save your file. Then, refresh your web page and test it out. You should be able to search for the weather in other major cities. 

#### 3. Handle errors

Notice, though, what happens if you type nonsense into your search field — nothing. Open your JavaScript console to see what happened. Here, you can see a 404 error, which tells you that the server couldn’t find the information you were requesting.

Luckily, AJAX has an easy fix for this. Head back to your `main.js` file. In your AJAX call, you can create an error handler in the same way you created a success handler. After your success handler, type:

```
  $.ajax(url, {
    success: function (data) {
      // your code here
    }, error: function (error) {
    
    }
  });
```

This takes whatever error the server sends back and passes it into the function. Then inside of that function, let’s target a `div` with the class of `error-message`, and update the text to “An error occurred.” 

Finally, you’ll need to create that `div` in your HTML. Go ahead and do that, making sure to give it a class of `error-message`. Now let’s test it. Save your page, go to your app, and type some nonsense into the search field. You should see your error message show up.

#### 4. Cleaning up the code

The last thing you’ll want to do is make sure that message clears once the user types in another query. You can see that here if you now type in a new city, the old error message doesn’t go away.  Go back to your `getWeather()` function, and before your `AJAX` call, you can write some code to clear out whatever has been written in the HTML’s `div`s. Copy your code from further down in the function, and instead of setting each `div` equal to a specific value, set them equal to nothing — or an empty string (`""`) instead. 

Congratulations! You’ve integrated an API into your application — one that your users can even interact with. There’s so much more you can do from here. You can display more data in your HTML, like precipitation or wind speeds. You can use CSS to make your app look a little bit better. And you even have the skills to start integrating the API of your choice into your app.

Building web apps is about trial and error. If something’s not working for you, Google it! Chances are, other people have run into exactly the same issues that you have. 

## Additional Resources
- More information on APIs: https://en.wikipedia.org/wiki/Application_programming_interface
- An in-depth look at HTTP methods: http://www.tutorialspoint.com/http/http_methods.htm
