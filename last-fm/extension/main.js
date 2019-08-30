function onInit() {
    soundbyte.playback.onBeforeTrackChange = onTrackChange;
}
function onTrackChange(track) {
    var currentTrack = soundbyte.playback.getPlayingTrack();
    soundbyte.network.postAsync('http://ws.audioscrobbler.com/2.0/track.updateNowPlaying', {
        'artist': track.user.username,
        'track': track.title,
        'duration': track.duration,
        'api_key': '',
        'api_sig': '',
        'sk': ''
    });
}
function onAccountDisconnected() {
}
function onAccountConnected() {
}
function isAccountConnected() {
    return false;
}
