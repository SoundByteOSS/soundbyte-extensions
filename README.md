# SoundByte Extensions

This repository contains the official SoundByte Extensions. These extensions are all in various stages of development.

The `soundbyte.d.ts` file is the JavaScript API def, (note that some features may be added via the manifest file).

## How to build

These extensions do not use TypeScript, but instead make use of the TypeScript CLI to combine files.

1. Ensure node / npm are installed (or see step 2)
2. `npm install -g typescript` (`sudo apt install node-typescript` might also work on linux / WSL)
3. Navigate to the extension folder that you wish to build / run
4. Run the `tsc` command to generate the extension `main.js` file

## iOS install instructions

1. Open this repo on your iOS device, toggle desktop mode in your browser and download the repo
2. In the iOS Files app, find the downloaded repo, long press, and rename. Append .zip to the end of the file
3. Tap on the renamed zip folder to extract
4. Open SoundByte on your iOS device, tap on the "Me" tab
5. Click "Load From Device" and navigate to the extension that you want to install (make sure you click on the "extension" subfolder - the one that contains the manifest.yml file)
6. The extension is now installed. You will need to refresh your screens to see any changes (swipe down)

## UWP install instructions

**\*Please Note**: These instruction apply to SoundByte 20.x. This version is not yet publicly released.\*

**\*Please Note**: Depending on your SoundByte version, SoundCloud is considered a core extension and cannot be overridden. If this is the case, please upgrade your SoundByte client to 20.x.\*

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

- [x] Trending and top tracks on the `Explore` page
- [x] SoundCloud stream on the `Home` page
- [ ] SoundCloud weekly on the `Home` page
- [x] Liked tracks on the `MyMusicLikes` page
- [x] Liked playlists on the `MyMusicPlaylists` page
- [ ] Uploaded tracks on the `Profile` page
- [ ] Liked tracks on the `Profile` page
- [ ] Uploaded playlists on the `Profile` page
- [ ] Following users on the `Profile` page
- [ ] Followed users on the `Profile` page
- [ ] Tracks on the `Search` page
- [ ] Playlists on the `Search` page
- [ ] Users on the `Search` page
- [ ] Follow/unfollow user on the `Profile` page
- [ ] Ability to manage playlists
- [ ] Ability to create playlists
- [ ] Ability to add track to playlist
- [ ] Ability to like / unlike tracks

### YouTube

Provides support for accessing YouTube services

#### Features

- [x] Ability to sign in with your YouTube account
- [x] View trending YouTube music videos on the `Discover` page
- [x] Listen to YouTube videos
- [x] View your playlists
- [x] View your likes
