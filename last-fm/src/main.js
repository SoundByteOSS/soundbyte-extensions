/**
 * This function is called when SoundByte first loads the extension.
 */
function onInit() {
    // Bind the events
    soundbyte.playback.onBeforeTrackChange = onTrackChange;
}

// Events used for this extension

/**
 * This method is called before the next track starts playing,
 * so we can get the current track (the track that just finished),
 * and scrobble with with last.fm.
 * @param {The base track that will play next} track 
 */
function onTrackChange(track) {
    // Get the current playing track
    var currentTrack = soundbyte.playback.getPlayingTrack();

    // Send the scrobble request.


    // Send the now playing request for the track that's about to start
    // playing.
    soundbyte.network.postAsync('http://ws.audioscrobbler.com/2.0/track.updateNowPlaying', {
        'artist': track.user.username,
        'track': track.title,
        'duration': track.duration,
        'api_key': '',
        'api_sig': '',
        'sk': ''
    });
}

// Custom Auth Events

function onAccountDisconnected() {
    // TODO
}

function onAccountConnected() {
    // TODO
}

function isAccountConnected() {
    return false;
}