declare namespace soundbyte {
    export namespace navigation {
        export function navigateTo(viewModel: string, args: any): boolean;
        export function navigateTo(viewModel: string): boolean;
    }

    export namespace settings {
        export function getPreference(key: string): string;
        export function getSecure(key: string): string;

        export function removePreference(key: string): void;
        export function removeSecure(key: string): void;

        export function setPreference(key: string, value: string): void;
        export function setSecure(key: string, value: string): void;
    }

    export enum MediaType {
        Unknown,
        Track,
        User,
        Playlist,
        Podcast
    }

    export class Media {
        mediaType: MediaType;
        id: string;
        musicProviderId: string;
    }

    export class Track extends Media {
        trackId: string;
        link: string;
        isLive: boolean;
        audioStreamUrl: string;
        videoStreamUrl: string;
        artworkUrl: string;
        title: string;
        description: string;
        duration: number;
        created: Date;
        user: User;
    }

    export class User extends Media {

    }

    export class Playlist extends Media {

    }

    export class Podcast extends Media {

    }

    export class SourceResponse {
        constructor(items: Media[], nextToken: string, successful?: boolean, messageTitle?: string, messageContent?: string);
    }
}

// Allow other scripts to use this definition
export = soundbyte;
export as namespace soundbyte;