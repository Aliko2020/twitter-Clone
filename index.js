const tweetsData = [   
    {
        handle: `@Grace66756542 💎`,
        profilePic: `images/grace.jpeg`,
        likes: 27,
        retweets: 10,
        tweetText: `Buy Bitcoin, ETH Make 💰💰💰 low low prices. 
            Guaranteed return on investment. HMU DMs open!!`,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: '4b161eee-c0f5-4545-9c4b-8562944223ee',
    },    
    {
        handle: `@Peter ✅`,
        profilePic: `images/peter.png`,
        likes: 6500,
        retweets: 234,
        tweetText: `I need volunteers for a one-way mission to Mars 🪐. No experience necessary🚀`,
        replies: [
                  {
                handle: "@TomCruise ✅",
                profilePic: "./images/dfdf.jpeg",
                tweetText: `Yes! Sign me up! 😎🛩`,
            },
                  {
                handle: `@ChuckNorris ✅`,
                profilePic: `images/chucknorris.jpeg`,
                tweetText: `I went last year😴`,
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '3c23454ee-c0f5-9g9g-9c4b-77835tgs2',
    },
        {
        handle: `@NoobCoder12`,
        profilePic: `images/flower.png`,
        likes: 10,
        retweets: 3,
        tweetText: `Are you a coder if you only know HTML?`,
        replies: [
            {
                handle: `@StackOverflower ☣️`,
                profilePic: `images/overflow.png`,
                tweetText: `No. Onviosuly not. Go get a job in McDonald's.`,
            },
            {
                handle: `@YummyCoder64`,
                profilePic: `images/love.png`,
                tweetText: `You are wonderful just as you are! ❤️`,
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '8hy671sff-c0f5-4545-9c4b-1237gyys45',
    },     
]





import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


console.log(tweetsData);

document.addEventListener('click',(e)=>{
    if(e.target.dataset.like){
        handleLikes(e.target.dataset.like)
    }
    else if(e.target.dataset.retweet){
        handleRetweet(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReply(e.target.dataset.reply)
    }
    else if(e.target.dataset.tweetbtn){
        handleRetweet()
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetClic()
    }
    
})

function handleTweetClic(){
    let tweetInput = document.getElementById("tweet-input")
    if(tweetInput.value){
        tweetsData.unshift({
            handle : `@amosblackgh`,
            profilePic: `images/amos.jpeg`,
            likes: 0,
            retweets: 0,
            tweetText : tweetInput.value,
            replies:[],
            isLiked: false,
            isRetweeted:false,
            uuid: uuidv4()
        })
        render()
    }
    tweetInput.value = ''
}
function handleReply(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle("hidden")
}

function handleLikes(tweetId) {
    const targetTweet= tweetsData.filter((tweet)=>{
        return tweet.uuid === tweetId
    })[0]
    if(targetTweet.isLiked){
        targetTweet.likes--
        
    }else{
        targetTweet.likes++
        
    }
    targetTweet.isLiked = ! targetTweet.isLiked
    render()
}



function handleRetweet(retweetId){
    const targetRetweet = tweetsData.filter((tweet)=>{
        return tweet.uuid === retweetId
    })[0]
    if(targetRetweet.isRetweeted){
        targetRetweet.retweets --
    }else{
        targetRetweet.retweets ++
    }
    targetRetweet.isRetweeted =!targetRetweet.isRetweeted
    render()
}

function getFeedHtml(){
    let feedHtml = ``
  tweetsData.forEach(tweet => {
    let likeIconClass = ''
    let retweetIconClass = ''
    if(tweet.isLiked){
        likeIconClass = 'liked'
    }
     if(tweet.isRetweeted){
        retweetIconClass= 'retweeted'
    }

    let repliesHtml = ''
    if(tweet.replies.length > 0){
        tweet.replies.forEach((reply)=>{
           repliesHtml += `<div class="tweet-reply">
           <div class="tweet-inner">
               <img src="${reply.profilePic}" class="profile-pic">
                   <div>
                       <p class="${reply.handle}</p>
                       <p class="tweet-text">${reply.tweetText}</p>
                   </div>
               </div>
       </div>` 
        })
    }



    feedHtml += `<div class="tweet" id="tweeet">
        <div class="tweet-inner">
            <img src="${tweet.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${tweet.handle}</p>
                <p class="tweet-text">${tweet.tweetText}</p>
                <div class="tweet-details">
                    <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"  data-reply="${tweet.uuid}"></i>
                    ${tweet.replies.length}
                    </span>
                    <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"  data-like="${tweet.uuid}"></i>
                    ${tweet.likes}
                    </span>
                    <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                    ${tweet.retweets}
                    </span>
            
                </div>   
            </div>            
        </div>
    </div>
    <div id="replies-${tweet.uuid}" class="hidden">
        ${repliesHtml}
    </div>   
</div>`
  });
  return feedHtml
}
function render(){
    const feedsDiv = document.getElementById('feed').innerHTML = getFeedHtml();
}
render()
