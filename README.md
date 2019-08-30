# SoundByte Extensions

This repository contains the official SoundByte Extensions. These extensions are all in various stages of development.

The `soundbyte.d.ts` file is the JavaScript API def, (note that some features may be added via the manifest file).

## How to build

These extensions do not use TypeScript, but instead make use of the TypeScript CLI to combine files.

1. Ensure node / npm are installed (or see step 2)
2. `npm install -g typescript` (`sudo apt install node-typescript` may also work on linux / WSL)
3. Go to the extension folder that you wish to build, open the `src` folder
4. Run the `tsc` command to generate the extension `main.js` file

## iOS install instructions

1. Open SoundByte on your iOS device
2. Click on the "Me" tab
3. Scroll down to "Settings", and open the application settings
4. Scroll down to "Enable Developer Mode" and enable
5. Under the "Extensions" heading, click "Load External Extension"
6. Provide a public url to a `.zip` file that contains `manifest.json` at the root level
7. The extension is now installed. You may need to restart the app

## UWP install instructions

***Please Note**: These instruction apply to SoundByte with CoreV2. This version is not yet publicly released.*

***Please Note**: Depending on your SoundByte version, SoundCloud is considered a core extension and cannot be overridden. If this is the case, please upgrade your SoundByte client to CoreV2.*

1. Open SoundByte on your Windows 10 device
2. Open the settings menu ('...' icon on the top right -> "Settings")
3. Toggle "Enable Developer Mode" to true
4. Click on the extensions icon on the top right (or click on the '...' button and click 'Extensions')
5. Click "Load unpacked extension"
6. Navigate to the root folder containing the `manifest.json` file

## Provided Extensions

### SoundCloud

Provides support for accessing SoundCloud services.

#### Features

- [ ] Trending and top tracks on the `Explore` page.
- [ ] SoundCloud stream on the `Home` page.
- [ ] SoundCloud weekly on the `Home` page.
- [ ] Liked tracks on the `MyMusicLikes` page.
- [ ] Liked playlists on the `MyMusicPlaylists` page.
- [ ] Uploaded tracks on the `Profile` page.
- [ ] Liked tracks on the `Profile` page.
- [ ] Uploaded playlists on the `Profile` page.
- [ ] Following users on the `Profile` page.
- [ ] Followed users on the `Profile` page.
- [ ] Tracks on the `Search` page.
- [ ] Playlists on the `Search` page.
- [ ] Users on the `Search` page.
- [ ] Follow/unfollow user on the `Profile` page.
- [ ] Ability to manage playlists.
- [ ] Ability to create playlists.
- [ ] Ability to add track to playlist.
- [ ] Ability to like / unlike tracks.


### YouTube

Provides support for accessing YouTube services.
