/// <reference path="../../soundbyte.d.ts" />

// ------------------------------------------------- //
// This file contains all the
// resolvers for SoundCloud (e.g. given an
// ID or list of IDs, resolve a certain resource)
// ------------------------------------------------- //

/**
 * Performs a request to resolve a soundcloud playlist
 * @param playlistId A single playlist id to resolve
 */
function resolvePlaylist(playlistId: string) {
  return toSbPlaylist(
    JSON.parse(
      soundbyte.network.performRequest(
        "https://api.soundcloud.com/playlists/" +
          playlistId +
          "?client_id=" +
          clientId
      )
    )
  );
}

/**
 *
 * @param playlistIds A comma seperated list of ids to resolve
 */
function resolvePlaylists(playlistIds: string) {}

/**
 * Performs a request to resolve a soundcloud track
 * @param trackId A single track id to resolve
 */
function resolveTrack(trackId: string) {
  return toSbTrack(
    JSON.parse(
      soundbyte.network.performRequest(
        "https://api.soundcloud.com/tracks/" +
          trackId +
          "?client_id=" +
          clientId
      )
    )
  );
}

/**
 *
 * @param trackIds A comma seperated list of ids to resolve
 */
function resolveTracks(trackIds: string) {}

/**
 * Performs a request to resolve a soundcloud user
 * @param userId A single user id to resolve
 */
function resolveUser(userId: string) {
  return toSbUser(
    JSON.parse(
      soundbyte.network.performRequest(
        "https://api.soundcloud.com/users/" + userId + "?client_id=" + clientId
      )
    )
  );
}

/**
 *
 * @param userIds A comma seperated list of ids to resolve
 */
function resolveUsers(userIds: string) {}

/**
 * Gets the auto stream url for the music provider.
 * @param {*} trackId The track we need the music stream for.
 */
function getMediaStream(trackId: string) {
  // SoundCloud has a fixed rate on playbacks. This system
  // chooses a key on random and plays from it.
  var id = playbackIds[Math.floor(Math.random() * playbackIds.length)];
  return (
    "https://api.soundcloud.com/tracks/" + trackId + "/stream?client_id=" + id
  );
}
