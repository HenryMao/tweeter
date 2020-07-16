/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
//everything happens inside document.ready
//escape helper function to filter the text entered by user before rendering it onto the page
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
//given a tweet object the function returns the entire html element to display
  const createTweetElement = function(tweet) {

    //put different values into variables
    let name = tweet.user.name;
    let image = tweet.user.avatars;
    let handle = tweet.user.handle;
    let content = tweet.content.text;
    let contentFiltered = `${escape(content)}`;
    //some math to get the time passed from the given created at
    //secondT and minuteT and so on are meant for temporary variables for calculation purposes
    //due to complication of leap years calculation stops at the unit of days
    let date = Date.now();
    let time = date - tweet.created_at;
    let secondT = Math.floor(time / 1000);
    let minuteT = Math.floor(secondT / 60);
    let hourT = Math.floor(minuteT / 60);
    let days = Math.floor(hourT / 24);
    let seconds = secondT % 60;
    let minutes = minuteT % 60;
    let hours = hourT % 24;
    //put all the variables and data into the html before returning it
    let $new_tweet = $(`<article class = "tweet">
      <header class="tweets-header">
      <h6 class = "creator-handle"><img class="tweets-pic" src="${image}"> ${name}</h6>
      <h6 class = "handle">${handle}</h6>
      </header>
      <p>
      ${contentFiltered}
      </p>
      <footer class="tweets-footer">
      <p class="footer-element">${days} days ${hours} hours ${minutes} minutes ${seconds} seconds ago</p>
      <p class="footer-element" id = "reactions"> &#127988 &nbsp &#xf079 &nbsp &#128077 </p>
      </footer></article>`);
  
    return $new_tweet;
  };
 
  
  // makes use of the createTweetElement function to render the tweet onto the page by
  //prepending the element inside the .tweets element
  const renderTweet = function(tweets) {
    for (let tweet of tweets) {
      let $result = createTweetElement(tweet);
      $('.tweets').prepend($result);
    }
  };

//makes use of the renderTweet function,
//defining loadTweets, once the data is received we renderTweet onto the page
  const loadTweets = function() {
    $.ajax({
      url:'/tweets/',
      method:'GET'
    })
      .then(function(tweetData) {
        $(".tweets").empty();
        renderTweet(tweetData);
   
      });
  };

  //calling the loadTweets function once so the page starts with the proper initial tweets
  loadTweets();
  //event checking for the form submission
  $(".new-tweet-form").submit(function(event) {
    //stops the page from reloading when form is submitted
    event.preventDefault();
    //verify the content entered into the textfield
    //cant be longer than 140
    if ($("#tweet-text").val().length > 140) {
      let $errorMessage = $(`<div id="errorM">Too long...</div>`);
      $(".errorMessage").prepend($errorMessage);
      $("#errorM").show().delay(3000).fadeOut();
    //cant be nothing
    } else if ($("#tweet-text").val().length  <= 0) {
      let $errorMessage = $(`<div id="errorM">Please enter something to tweet...</div>`);
      $(".errorMessage").prepend($errorMessage);
      $("#errorM").show().delay(3000).fadeOut();
    } else {
      //if all checks out we make the request and once successfully made we invoke loadTweets function
      $(".errorMessage").empty();
      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: $(this).serialize()})
        .then(function(response) {
          loadTweets();
        });
      //we reset the textfield to empty here
      $('#tweet-text').val('');
      //we reset the counter value here to 140
      $('.counter').val(140);
  
    }
  

  });


});
