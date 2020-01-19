/// <reference path="../../../soundbyte.d.ts" />

const clientKey = "AIzaSyD2l10qiS2CRIn5Mp8p9L9zltmepKu9Xrk";

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
  return new soundbyte.Playlist();
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
