/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function(){

  

  const createTweetElement = function(tweet){
    let name = tweet.user.name;
    let image = tweet.user.avatars;
    let handle = tweet.user.handle;
    let content = tweet.content.text;
    let timestamp = tweet.created_at;
  
    let $new_tweet = $(`<article class = "tweet">
      <header class="tweets-header">
      <h6 class = "creator-handle"><img class="tweets-pic" src="${image}"> ${name}</h6>
      <h6 class = "handle">${handle}</h6>
      </header>
      <p>
      ${content}
      </p>
      <footer class="tweets-footer">
      <p class="footer-element">${timestamp}</p>
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
    alert("Too long!");
    
  } else if($("#tweet-text").val().length  <= 0){
    alert("Too short!");
  }
  else {
    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: $(this).serialize()})
    .then(function(response) {
      console.log("pls");
      loadTweets();
    })
    $('#tweet-text').val('');
    $('.counter').val(140);
  
  }
  

})


});
