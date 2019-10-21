/// <reference path="../../soundbyte.d.ts" />

/**
 * Gets the video stream url for the music provider.
 * @param {*} trackId The track we need the music stream for.
 */
function getVideoStream(trackId: string) {
    return "";
}

/**
 * Gets the audio stream url for the music provider.
 * @param {*} trackId The track we need the music stream for.
 */
function getAudioStream(trackId: string) {
    return "";
}

// CONTENT GROUPS

function getTrending(count: number, token: string, parameters: any) {
    // Temp array that will store the return items
    var returnItems = new Array<soundbyte.Media>();

    // Construct the URL
    var uri = "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=" + count + "&videoCategoryId=10&pageToken=" + token + "&key=" + clientKey;

    // Get a response from the YouTube API, and parse
    // it into an object.
    var data = JSON.parse(soundbyte.network.performRequest(uri));

    // Handle when there are no items
    if (data.items.length == 0) {
        return new soundbyte.SourceResponse("No results found", "There are no trending YouTube videos.");
    }

    // Convert the YouTube tracks into SoundByte objects.
    data.items.forEach(function (item: any) {
        // Only YouTube videos
        if (item.kind == "youtube#video") {
            returnItems.push(toSbTrack(item));
        }
    });

    // Return the items back to SoundByte
    return new soundbyte.SourceResponse(returnItems, data.nextPageToken);
}