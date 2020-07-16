/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function(){


  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  

  const createTweetElement = function(tweet){
    let name = tweet.user.name;
    let image = tweet.user.avatars;
    let handle = tweet.user.handle;
    let content = tweet.content.text;
    let contentFiltered = `${escape(content)}`;
    
    let date = Date.now();
    let time = date - tweet.created_at;
    let secondT = Math.floor(time/1000);
    let minuteT = Math.floor(secondT/60);
    let hourT = Math.floor(minuteT/60);
    let days = Math.floor(hourT/24);
    let seconds = secondT % 60;
    let minutes = minuteT % 60;
    let hours = hourT%24;
    
    let $new_tweet = $(`<article class = "tweet">
      <header class="tweets-header">
      <h6 class = "creator-handle"><img class="tweets-pic" src="${image}"> ${name}</h6>
      <h6 class = "handle">${handle}</h6>
      </header>
      <p>
      ${contentFiltered}
      </p>
      <footer class="tweets-footer">
      <p class="footer-element">${days} days ${hours} hours ${minutes}minutes ${seconds}seconds ago</p>
      <p class="footer-element">reactions</p>
      </footer></article>`)
  
  return $new_tweet;
}
 
  
  
const renderTweet = function(tweets){
  for(let tweet of tweets){
    let $result = createTweetElement(tweet);
    $('.tweets').prepend($result); 
  }
}


const loadTweets = function(){
  $.ajax({
    url:'/tweets/',
    method:'GET'
  })
  .then(function(tweetData){
    $(".tweets").empty();
    renderTweet(tweetData);
   
  })
}

loadTweets();

$(".new-tweet-form").submit(function(event){
  event.preventDefault();
  if($("#tweet-text").val().length > 140){
    let $errorMessage = $(`<div id="errorM">Too long...</div>`);
    $(".errorMessage").prepend($errorMessage);
    $("#errorM").show().delay(3000).fadeOut();
    
  } else if($("#tweet-text").val().length  <= 0){
    let $errorMessage = $(`<div id="errorM">Please enter something to tweet...</div>`);
    $(".errorMessage").prepend($errorMessage);
    $("#errorM").show().delay(3000).fadeOut();
  }
  else {
    $(".errorMessage").empty();
    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: $(this).serialize()})
    .then(function(response) {
      loadTweets();
    })
    $('#tweet-text').val('');
    $('.counter').val(140);
  
  }
  

})


});
