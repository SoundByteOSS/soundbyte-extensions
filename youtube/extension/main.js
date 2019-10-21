function getVideoStream(trackId) {
    return "";
}
function getAudioStream(trackId) {
    return "";
}
function getTrending(count, token, parameters) {
    var returnItems = new Array();
    var uri = "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=" + count + "&videoCategoryId=10&pageToken=" + token + "&key=" + clientKey;
    var data = JSON.parse(soundbyte.network.performRequest(uri));
    if (data.items.length == 0) {
        return new soundbyte.SourceResponse("No results found", "There are no trending YouTube videos.");
    }
    data.items.forEach(function (item) {
        if (item.kind == "youtube#video") {
            returnItems.push(toSbTrack(item));
        }
    });
    return new soundbyte.SourceResponse(returnItems, data.nextPageToken);
}
var clientKey = "AIzaSyACcC1JE0krWn90rfk5kVpx-Y8qkoqta40";
function toSbTrack(item) {
    var user = new soundbyte.User();
    user.userId = item.snippet.channelId;
    user.username = item.snippet.channelTitle;
    var track = new soundbyte.Track();
    track.trackId = item.id;
    track.title = item.snippet.title;
    track.description = item.snippet.description;
    track.isLive = item.snippet.liveBroadcastContent != "none";
    track.user = user;
    track.artworkUrl = item.snippet.thumbnails.maxres.url;
    return track;
}
function toSbUser(item) {
    return new soundbyte.User();
}
function toSbPlaylist(item) {
    return new soundbyte.Playlist();
}
