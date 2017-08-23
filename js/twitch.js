$('document').ready(function(){
  
  getLiveStreamers();

function getLiveStreamers(){
  let users = getRegularStreamingUsers();
  for(let i=0;i<users.length;i++){
    makeAjaxRequest(generateApiUrl('channels',users[i]));
  }
}

function getRegularStreamingUsers(){
  const twitchUsernames=["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  return twitchUsernames;
}

function makeAjaxRequest(twitchApiUrl){

  let ajaxRequestOptions = {
    url:twitchApiUrl,
    success:renderResults,
    error:errorHandler,
    dataType:"jsonp"
  }
  return $.ajax(ajaxRequestOptions);
}

function generateApiUrl(routeName,twitchUserName){
  const twitchApiURl =  "https://wind-bow.gomix.me/twitch-api/";
  let generatedUrl = twitchApiURl+'/'+routeName+'/'+twitchUserName;
  return generatedUrl;
}


function renderResults(userChannelInfo){
  let userStatusMessage = userChannelInfo["status"];
  let userDisplayName = userChannelInfo["display_name"];
  let userAvatar = userChannelInfo["logo"];
  let userChannelUrl = userChannelInfo["url"];

  $('#header').append('<div class="well row">'+
    '<div class="col-xs-3 twitch-user-avatar">'+
    '<img src='+ userAvatar +' class="img-circle" style="width:50px; height:50px;">'+
  '</div>'+
  '<div class="col-xs-3 twitch-channel-link">'+
  '<a href='+userChannelUrl+'>'+userDisplayName+'</a>'+
  '</div>'+
  '<div class="col-xs-3">'+
  '<p class="text-nowrap status">'+userStatusMessage+'</p>'+
  '</div>'+
  '</div>')
}

function errorHandler(){
  console.log("Error, occurred");
}

});
