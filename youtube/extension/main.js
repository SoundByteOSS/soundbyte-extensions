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
function getUserLikes(count, token, parameters) {
    var returnItems = new Array();
    var uri = "https://www.googleapis.com/youtube/v3/videos?part=id,snippet,contentDetails&myRating=like&maxResults=" +
        count +
        "&videoCategoryId=10&pageToken=" +
        token +
        "&key=" +
        clientKey;
    var data = JSON.parse(soundbyte.network.performRequest(uri));
    if (data.items.length == 0) {
        return new soundbyte.SourceResponse("No results found", "Like some videos on Youtube to get started");
    }
    data.items.forEach(function (item) {
        if (item.kind == "youtube#video") {
            returnItems.push(toSbTrack(item));
        }
    });
    return new soundbyte.SourceResponse(returnItems, data.nextPageToken);
}
function getUserPlaylists(count, token, parameters) {
    var returnItems = new Array();
    var uri = "https://www.googleapis.com/youtube/v3/playlists?part=id,snippet,contentDetails&mine=true&maxResults=" +
        count +
        "&pageToken=" +
        token +
        "&key=" +
        clientKey;
    var data = JSON.parse(soundbyte.network.performRequest(uri));
    if (data.items.length == 0) {
        return new soundbyte.SourceResponse("No results found", "Create some playlists on Youtube to get started");
    }
    data.items.forEach(function (item) {
        if (item.kind == "youtube#playlist") {
            returnItems.push(toSbPlaylist(item));
        }
    });
    return new soundbyte.SourceResponse(returnItems, data.nextPageToken);
}
function getSearchedTracks(count, token, parameters) {
    return handleSearch("video", parameters["query"], count, token);
}
function getSearchedPlaylists(count, token, parameters) {
    return handleSearch("playlist", parameters["query"], count, token);
}
function getSearchedUsers(count, token, parameters) {
    return new soundbyte.SourceResponse("Not Implemented", "Not Implemented");
}
function handleSearch(type, query, count, token) {
    var returnItems = new Array();
    var uri = "https://www.googleapis.com/youtube/v3/search?part=id&maxResults=" + count + "&pageToken=" + token + "&type=" + type + "&key=" + clientKey + "&q=" + query;
    var data = JSON.parse(soundbyte.network.performRequest(uri));
    if (data.items.length == 0) {
        return new soundbyte.SourceResponse("No results found", "Could not find any results matching " + query);
    }
    var idList = "";
    data.items.forEach(function (item) {
        idList = idList + item.id[type + "Id"] + ",";
    });
    var extendedData = getExtendedList(type + "s", idList);
    extendedData.items.forEach(function (item) {
        if (item.kind == "youtube#" + type) {
            switch (type) {
                case "video":
                    returnItems.push(toSbTrack(item));
                    break;
            }
        }
    });
    return new soundbyte.SourceResponse(returnItems, data.nextPageToken);
}
function getExtendedList(type, idList) {
    var uri = "https://www.googleapis.com/youtube/v3/" + type + "?part=snippet,contentDetails&key=" + clientKey + "&id=" + idList;
    return JSON.parse(soundbyte.network.performRequest(uri));
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
    track.artworkUrl = getThumbnail(item.snippet.thumbnails);
    return track;
}
function toSbUser(item) {
    return new soundbyte.User();
}
function toSbPlaylist(item) {
    var user = new soundbyte.User();
    user.userId = item.snippet.channelId;
    user.username = item.snippet.channelTitle;
    var playlist = new soundbyte.Playlist();
    playlist.playlistId = item.id;
    playlist.title = item.snippet.title;
    playlist.description = item.snippet.description;
    playlist.user = user;
    playlist.artworkUrl = getThumbnail(item.snippet.thumbnails);
    return playlist;
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
