// Generated by https://app.quicktype.io/

/**
 * For clients list
 */
export interface VersionsManifest {
    versions: Version[];
}

export interface Version {
    id: string;
    type: Type;
    url: string;
}

export enum Type {
    OldAlpha = "old_alpha",
    OldBeta = "old_beta",
    Release = "release",
    Snapshot = "snapshot",
}

/**
 * For client
 */
export interface VersionProfile {
    assetIndex: AssetIndex;
    assets: string;
    downloads: VersionProfileDownloads;
    id: string;
    javaVersion: JavaVersion;
    libraries: Library[];
    mainClass: string;
    logging?: Logging;
}

export enum Action {
    Allow = "allow",
    Disallow = "disallow",
}

export enum Name {
    Linux = "linux",
    Osx = "osx",
    Windows = "windows",
}

export interface AssetIndex {
    id: string;
    sha1: string;
    size: number;
    totalSize: number;
    url: string;
}

export interface VersionProfileDownloads {
    client: Client;
}

export interface Client {
    sha1: string;
    size: number;
    url: string;
}

export interface JavaVersion {
    majorVersion: number;
}

export interface Library {
    downloads: LibraryDownloads;
    name: string;
    rules?: LibraryRule[];
    extract?: Extract;
    natives?: Natives;
}

export interface LibraryDownloads {
    artifact?: Artifact;
    classifiers?: Classifiers;
}

export interface Artifact {
    path: string;
    sha1: string;
    size: number;
    url: string;
}

export interface Classifiers {
    "natives-linux"?: Artifact;
    "natives-osx"?: Artifact;
    "natives-windows"?: Artifact;
    "natives-macos"?: Artifact;
}

export interface Extract {
    exclude: string[];
}

export type Natives = {
    [x in Name]?: keyof Classifiers;
};

export interface LibraryRule {
    action: Action;
    os?: OS;
}

export interface OS {
    name: Name;
    version?: string;
}

export interface Logging {
    client: LoggingClient;
}

export interface LoggingClient {
    argument: string;
    file: File;
    type: string;
}

export interface File {
    id: string;
    sha1: string;
    size: number;
    url: string;
}

/**
 * For assets
 */
export interface Assets {
    /**
     * Найдено в https://launchermeta.mojang.com/v1/packages/3d8e55480977e32acd9844e545177e69a52f594b/pre-1.6.json \
     * до версии 1.6 (если точнее до снапшота 13w23b)
     */
    map_to_resources?: boolean;
    /**
     * Найдено в https://launchermeta.mojang.com/v1/packages/770572e819335b6c0a053f8378ad88eda189fc14/legacy.json \
     * начиная с версии версии 1.6 (если точнее с снапшота 13w24a) и до 1.7.2 (13w48b)
     */
    virtual?: boolean;
    objects: { [key: string]: Asset };
}

export interface Asset {
    hash: string;
    size: number;
}
