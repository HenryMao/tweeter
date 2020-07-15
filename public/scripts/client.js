/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function(){
  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  

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
    $('.tweets').append($result); 
  }
}
renderTweet(tweetData);


$(".new-tweet-form").submit(function(event){
  event.preventDefault();

  $.ajax({
    url: '/tweets/',
    method: 'POST',
    data: $(this).serialize()})
  .then(function(response) {
    console.log(response);
    
})

})
const loadTweets = function(){

}

});
