/// <reference path="../../../soundbyte.d.ts" />

const clientId = "gU5Rw9VDiPPA4OcDlC8VVcb19sHDZFTT";

function toSbTrack(item: any): soundbyte.Track {

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

function toSbUser(item: any): soundbyte.User {
    return new soundbyte.User();
}

function toSbPlaylist(item: any): soundbyte.Playlist {
    return new soundbyte.Playlist();
}

