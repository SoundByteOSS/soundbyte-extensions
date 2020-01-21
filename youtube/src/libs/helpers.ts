/// <reference path="../../../soundbyte.d.ts" />

const clientKey = "AIzaSyACcC1JE0krWn90rfk5kVpx-Y8qkoqta40";

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
  track.artworkUrl = getThumbnail(item.snippet.thumbnails);

  return track;
}

function toSbUser(item: any): soundbyte.User {
  return new soundbyte.User();
}

function toSbPlaylist(item: any): soundbyte.Playlist {
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

function getThumbnail(thumbnails: any): string {
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
