/// <reference path="../../soundbyte.d.ts" />

// MEDIA PLAYBACK

/**
 * Gets the auto stream url for the music provider.
 * @param {*} trackId The track we need the music stream for.
 */
function getMediaStream(trackId: string) {
    // SoundCloud has a fixed rate on playbacks. This system 
    // chooses a key on random and plays from it.
    var id = playbackIds[Math.floor(Math.random() * playbackIds.length)];
    return "https://api.soundcloud.com/tracks/" + trackId + "/stream?client_id=" + id;
}


// CONTENT GROUPS

function getUserStream(count: number, token: string, parameters: any) {
    return new soundbyte.SourceResponse("Not Implemented", "This content group has not been implemented");
}

function getUserLikes(count: number, token: string, parameters: any) {
    // Temp array that will store the return tracks
    var returnTracks = new Array<soundbyte.Media>();

    // Construct the URL
    var uri = "https://api.soundcloud.com/me/favorites?limit=" + count + "&cursor=" + token + "&linked_partitioning=1&client_id=" + clientId;

    // Get a response from the SoundCloud API, and parse
    // it into an object.
    var data = JSON.parse(soundbyte.network.performRequest(uri));

    // Extract the next offset / token
    var nextUrl = data.next_href;
    var extractedToken = null;

    if (nextUrl != null) {
        var matches = nextUrl.match(/cursor=([^&]*)/);
        extractedToken = matches[0].substring(7, matches[0].length);
    }

    // Handle when there are no items
    if (data.collection.length == 0) {
        return new soundbyte.SourceResponse("No likes", "You have not liked any music on SoundCloud yet.");
    }

    // Convert the SoundCloud tracks into SoundByte objects.
    data.collection.forEach(function (item: any) {
        returnTracks.push(toSbTrack(item));
    });

    // Return the tracks back to SoundByte
    return new soundbyte.SourceResponse(returnTracks, extractedToken);
}

function getTopTracks(count: number, token: string, parameters: any) {
    return getExploreItems(count, token, parameters, "top");
}

function getTrendingTracks(count: number, token: string, parameters: any) {
    return getExploreItems(count, token, parameters, "trending");
}

function getExploreItems(count: number, token: string, parameters: any, kind: string) {
    var filter = parameters["filter"] || "all-music";
    var genre = "soundcloud%3Agenres%3A" + filter;

    // Temp array that will store the return tracks
    var returnTracks = new Array<soundbyte.Media>();

    // Construct the URL
    var uri = "https://api-v2.soundcloud.com/charts?kind=" + kind + "&genre=" + genre + "&limit=" + count + "&offset=" + token + "&linked_partitioning=1&client_id=" + clientId;

    // Get a response from the SoundCloud API, and parse
    // it into an object.
    var data = JSON.parse(soundbyte.network.performRequest(uri));

    // Extract the next offset / token
    var nextUrl = data.next_href;
    var extractedToken = null;

    if (nextUrl != null) {
        var matches = nextUrl.match(/offset=([^&]*)/);
        extractedToken = matches[0].substring(7, matches[0].length);
    }

    // Handle when there are no items
    if (data.collection.length == 0) {
        return new soundbyte.SourceResponse("No results found", "No items matching");
    }

    // Convert the SoundCloud objects int SoundByte objects.
    data.collection.forEach(function (item: any) {
        if (item.track != null) {
            var sbTrack = toSbTrack(item.track);
            if (sbTrack != null) {
                returnTracks.push(sbTrack);
            }
        }
    });

    // Return the tracks back to SoundByte
    return new soundbyte.SourceResponse(returnTracks, extractedToken);
}

function navigateTopTracks(parent: any) {
    navigateToExploreView(parent, "Top 50 SoundCloud Tracks");
}

function navigateTrendingTracks(parent: any) {
    navigateToExploreView(parent, "New & Hot SoundCloud Tracks");
}

function navigateToExploreView(parent: any, title: string) {
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