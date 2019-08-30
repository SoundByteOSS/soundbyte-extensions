# Goals

This page lists the goals of the SoundByte Extension API

- Ability to see what songs are currently playing, listen to song change events, playback change events etc.
  - Extensions like LastFM could make use of this, or Discord Rich Presence.
- Ability to skip, play, pause songs etc.
  - Extensions that let the user control music from other device, e.g google home, iftt etc.
- Ability to register custom app schemes (via the url protocol), can be combined with the above goal. 
  - Lets extensions / music providers register schemes for playback etc.
- Music Provider support.
  - Ability to set content groups throughout the app (normal, auth and parameter passed (search, user, playlist)).
  - Like / unlike logic (and if liked) (via callbacks)
  - Add to playlist logic / get playlists (via callbacks).
  - Callback to get audio url.
  - Callback to get track info from url.
  - Callback to get multiple track infos from url.
  - Callback to create a new playlist.
  - Auth system to connect account / view profile.
  - Support OAuth but also allow custom auth.
- HTTP / Web Socket APIs
