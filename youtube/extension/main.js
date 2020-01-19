function getVideoStream(trackId) {
    return soundbyte.interop.youtube.getVideoStream(trackId);
}
function getAudioStream(trackId) {
    return soundbyte.interop.youtube.getAudioStream(trackId);
}
function getTrending(count, token, parameters) {
    var returnItems = new Array();
    var uri = "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=" +
        count +
        "&videoCategoryId=10&pageToken=" +
        token +
        "&key=" +
        clientKey;
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
var clientKey = "AIzaSyD2l10qiS2CRIn5Mp8p9L9zltmepKu9Xrk";
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
    track.artworkUrl = getThumbnail(item.snippet.thumbnails);
    return track;
}
function toSbUser(item) {
    return new soundbyte.User();
}
function toSbPlaylist(item) {
    return new soundbyte.Playlist();
}
function getThumbnail(thumbnails) {
    if (thumbnails.maxres != null) {
        return thumbnails.maxres.url;
    }
    if (thumbnails.high != null) {
        return thumbnails.high.url;
    }
    if (thumbnails.medium != null) {
        return thumbnails.medium.url;
    }
    if (thumbnails.default != null) {
        return thumbnails.default.url;
    }
    return "";
}
