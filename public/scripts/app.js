const data = [{
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
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
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
const renderTweets = function (tweets) {
  let array = []
  for (let tweet of tweets) {
    array.unshift(createTweetElement(tweet))
  }
  $("#tweetsContainer").append(array);
}

// create new tweet skeleton
const createTweetElement = function (tweet) {
  let $tweet = $("<article>").addClass("tweet");
  const html = `  
<section id="box" class="box" >
  <div class = "tweets-container">
    <img src=${tweet.user.avatars} />
    <p id = "username">${tweet.user.name}</p>
    <span id = "handle">
    ${tweet.user.handle}
    </span>
  </div>
  <br>
<span>
  <p class ="input"> 
  ${tweet.content.text}
  <hr/>
  </p>
</span>
<span id="hoverButton" class ="buttons">
  <i class="fas fa-flag"></i>
  <i class="fas fa-retweet"></i>
  <i class="fas fa-heart"></i>
</span>
<span class="date">
  <div>${moment(
    new Date(tweet.created_at)
  ).fromNow()}
</span>
</section>
<br>
`

  $tweet = $tweet.append(html);
  return $tweet;
}

// loadtweets function will use jQuery to make a request to /tweets and receive the array of tweets as JSON.
let loadTweets = function () {
  event.preventDefault();
  $.ajax({
    method: "GET",
    url: "/tweets",
    dataType: "json",
  }).done(function (data) {
    $("#tweetsContainer").empty();
    renderTweets(data);
  })
}

// check if length of text exceeds maximum character input
function lengthText(text){
  if(text.length> 140){
    return false;
  }else{
    return true;
  } 
}


function postTweets(){
  $("form").on("submit", function(event){
      event.preventDefault();
      let textInput = $("#textinput").val();
      if(!lengthText(textInput) || !textInput) {
        $(".errormessage").slideDown("slow", function(){
          setTimeout(function(){$(".errormessage").slideToggle()}, 1300);
        });
      }else{
          $.ajax({
          method: "POST",
          url: "/tweets",
          data: $("form").serialize(),
          dataType: "text",
          
      }).done(function(){
         $("#textinput").val('');
         $("#textcounter").text("140");
          data.content = "text= "
        loadTweets(data);
          
      }).error(function(){
          console.log("post tweet error")
      })
      }
  })
}

// reveals compose tweet textbox when clicked
    let slideDownBox = function () {
      $("#write").on("click", function () {
        $(".new-tweet").slideToggle();
      })
    }
    


    $(document).ready(function () {
      $(".new-tweet").slideToggle();
      loadTweets();
      postTweets();
      slideDownBox();
    })