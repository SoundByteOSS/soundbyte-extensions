function getMediaStream(trackId) {
    var id = playbackIds[Math.floor(Math.random() * playbackIds.length)];
    return "https://api.soundcloud.com/tracks/" + trackId + "/stream?client_id=" + id;
}
function getUserStream(count, token, parameters) {
    var returnItems = new Array();
    var uri = "https://api-v2.soundcloud.com/stream?limit=" + count + "&cursor=" + token + "&linked_partitioning=1&client_id=" + clientId;
    var data = JSON.parse(soundbyte.network.performRequest(uri));
    var nextUrl = data.next_href;
    var extractedToken = null;
    if (nextUrl != null) {
        var matches = nextUrl.match(/offset=([^&]*)/);
        extractedToken = matches[0].substring(7, matches[0].length);
    }
    if (data.collection.length == 0) {
        return new soundbyte.SourceResponse("No items", "Follow someone on SoundCloud to get started.");
    }
    data.collection.forEach(function (item) {
        switch (item.type) {
            case "track":
            case "track-repost":
                returnItems.push(toSbTrack(item.track));
                break;
            case "playlist":
            case "playlist-repost":
                returnItems.push(toSbPlaylist(item.playlist));
                break;
        }
    });
    return new soundbyte.SourceResponse(returnItems, extractedToken);
}
function getUserLikes(count, token, parameters) {
    var returnTracks = new Array();
    var uri = "https://api.soundcloud.com/me/favorites?limit=" + count + "&cursor=" + token + "&linked_partitioning=1&client_id=" + clientId;
    var data = JSON.parse(soundbyte.network.performRequest(uri));
    var nextUrl = data.next_href;
    var extractedToken = null;
    if (nextUrl != null) {
        var matches = nextUrl.match(/cursor=([^&]*)/);
        extractedToken = matches[0].substring(7, matches[0].length);
    }
    if (data.collection.length == 0) {
        return new soundbyte.SourceResponse("No likes", "You have not liked any music on SoundCloud yet.");
    }
    data.collection.forEach(function (item) {
        returnTracks.push(toSbTrack(item));
    });
    return new soundbyte.SourceResponse(returnTracks, extractedToken);
}
function getTopTracks(count, token, parameters) {
    return getExploreItems(count, token, parameters, "top");
}
function getTrendingTracks(count, token, parameters) {
    return getExploreItems(count, token, parameters, "trending");
}
function getExploreItems(count, token, parameters, kind) {
    var filter = parameters["filter"] || "all-music";
    var genre = "soundcloud%3Agenres%3A" + filter;
    var returnTracks = new Array();
    var uri = "https://api-v2.soundcloud.com/charts?kind=" + kind + "&genre=" + genre + "&limit=" + count + "&offset=" + token + "&linked_partitioning=1&client_id=" + clientId;
    var data = JSON.parse(soundbyte.network.performRequest(uri));
    var nextUrl = data.next_href;
    var extractedToken = null;
    if (nextUrl != null) {
        var matches = nextUrl.match(/offset=([^&]*)/);
        extractedToken = matches[0].substring(7, matches[0].length);
    }
    if (data.collection.length == 0) {
        return new soundbyte.SourceResponse("No results found", "No items matching");
    }
    data.collection.forEach(function (item) {
        if (item.track != null) {
            var sbTrack = toSbTrack(item.track);
            if (sbTrack != null) {
                returnTracks.push(sbTrack);
            }
        }
    });
    return new soundbyte.SourceResponse(returnTracks, extractedToken);
}
function navigateTopTracks(parent) {
    navigateToExploreView(parent, "Top 50 SoundCloud Tracks");
}
function navigateTrendingTracks(parent) {
    navigateToExploreView(parent, "New & Hot SoundCloud Tracks");
}
function navigateToExploreView(parent, title) {
    soundbyte.navigation.navigateTo("FilteredListViewModel", new soundbyte.FilteredListViewModelHolder(parent.collection, title, [
        new soundbyte.FilterViewItem(true, "General"),
        new soundbyte.FilterViewItem("All Music Genres", "all-music"),
        new soundbyte.FilterViewItem("All Audio Genres", "all-audio"),
        new soundbyte.FilterViewItem(true, "Music"),
        new soundbyte.FilterViewItem("Alternative Rock", "alternativerock"),
        new soundbyte.FilterViewItem("Ambient", "ambient"),
        new soundbyte.FilterViewItem("Classical", "classical"),
        new soundbyte.FilterViewItem("Country", "country"),
        new soundbyte.FilterViewItem("Dance & EDM", "danceedm"),
        new soundbyte.FilterViewItem("Dancehall", "dancehall"),
        new soundbyte.FilterViewItem("Deep House", "deephouse"),
        new soundbyte.FilterViewItem("Disco", "disco"),
        new soundbyte.FilterViewItem("Drum & Bass", "drumbass"),
        new soundbyte.FilterViewItem("Dubstep", "dubstep"),
        new soundbyte.FilterViewItem("Electronic", "electronic"),
        new soundbyte.FilterViewItem("Folk & Singer-Songwriter", "folksingersongwriter"),
        new soundbyte.FilterViewItem("Hip Hop & Rap", "hiphoprap"),
        new soundbyte.FilterViewItem("House", "house"),
        new soundbyte.FilterViewItem("Indie", "indie"),
        new soundbyte.FilterViewItem("Jazz & Blues", "jazzblues"),
        new soundbyte.FilterViewItem("Latin", "latin"),
        new soundbyte.FilterViewItem("Metal", "metal"),
        new soundbyte.FilterViewItem("Piano", "piano"),
        new soundbyte.FilterViewItem("Pop", "pop"),
        new soundbyte.FilterViewItem("R&B & Soul", "rbsoul"),
        new soundbyte.FilterViewItem("Reggae", "reggae"),
        new soundbyte.FilterViewItem("Reggaeton", "reggaeton"),
        new soundbyte.FilterViewItem("Rock", "rock"),
        new soundbyte.FilterViewItem("Soundtrack", "soundtrack"),
        new soundbyte.FilterViewItem("Techno", "techno"),
        new soundbyte.FilterViewItem("Trance", "trance"),
        new soundbyte.FilterViewItem("Trap", "trap"),
        new soundbyte.FilterViewItem("Triphop", "triphop"),
        new soundbyte.FilterViewItem("World", "world"),
        new soundbyte.FilterViewItem(true, "Audio"),
        new soundbyte.FilterViewItem("Audiobooks", "audiobooks"),
        new soundbyte.FilterViewItem("Business", "business"),
        new soundbyte.FilterViewItem("Comedy", "comedy"),
        new soundbyte.FilterViewItem("Entertainment", "entertainment"),
        new soundbyte.FilterViewItem("Learning", "learning"),
        new soundbyte.FilterViewItem("News & Politics", "newspolitics"),
        new soundbyte.FilterViewItem("Religion & Spirituality", "religionspirituality"),
        new soundbyte.FilterViewItem("Science", "science"),
        new soundbyte.FilterViewItem("Sports", "sports"),
        new soundbyte.FilterViewItem("Storytelling", "storytelling"),
        new soundbyte.FilterViewItem("Technology", "technology")
    ]));
}
var clientId = "gU5Rw9VDiPPA4OcDlC8VVcb19sHDZFTT";
var playbackIds = ["gU5Rw9VDiPPA4OcDlC8VVcb19sHDZFTT", "ytXCP8DpxZPd96FN12KsjT1P2mSHglXH", "59f81c512bd8eda616a21851093b2f16", "8547e755a4a625d4be8f243c1c7756a9", "0452ba585c12c2a37a143aca3b426b19"];
function toSbTrack(item) {
    var user = toSbUser(item.user);
    var artworkUrl = item.artwork_url || user.artworkUrl;
    if (artworkUrl.indexOf("large") != -1) {
        artworkUrl = artworkUrl.replace("large", "t500x500");
    }
    var track = new soundbyte.Track();
    track.trackId = item.id;
    track.link = item.permalink_url;
    track.artworkUrl = artworkUrl;
    track.created = item.created_at;
    track.duration = soundbyte.timeFromMilliseconds(item.duration);
    track.description = item.description;
    track.title = item.title;
    track.user = user;
    return track;
}
function toSbUser(item) {
    var defaultUser = "http://a1.sndcdn.com/images/default_avatar_large.png";
    var user = new soundbyte.User();
    user.userId = item.id;
    user.username = item.username;
    user.artworkUrl = item.avatar_url || defaultUser;
    return user;
}
function toSbPlaylist(item) {
    var user = toSbUser(item.user);
    var artworkUrl = item.artwork_url || user.artworkUrl;
    if (artworkUrl.indexOf("large") != -1) {
        artworkUrl = artworkUrl.replace("large", "t500x500");
    }
    var playlist = new soundbyte.Playlist();
    playlist.playlistId = item.id;
    playlist.link = item.permalink_url;
    playlist.artworkUrl = artworkUrl;
    playlist.created = item.created_at;
    playlist.duration = soundbyte.timeFromMilliseconds(item.duration);
    playlist.description = item.description;
    playlist.title = item.title;
    playlist.user = user;
    return playlist;
}
