import {
  SeriesSourceType,
  GenreKey,
  ThemeKey,
  ContentWarningKey,
  FormatKey,
  SeriesStatus,
  LanguageKey,
  DemographicKey,
} from "./enums";

export type ExtensionMetadata = {
  id: string;
  name: string;
  url: string;
  version: string;
  notice: string;
  noticeUrl: string;
  pageLoadMessage: string;
};

export type PageRequesterData = {
  server: string;
  hash: string;
  numPages: number;
  pageFilenames: string[];
};

export type Series = {
  id?: number;
  extensionId: string;
  sourceId: string;
  sourceType: SeriesSourceType;
  title: string;
  altTitles: string[];
  description: string;
  authors: string[];
  artists: string[];
  genres: GenreKey[];
  themes: ThemeKey[];
  contentWarnings: ContentWarningKey[];
  formats: FormatKey[];
  status: SeriesStatus;
  originalLanguageKey: LanguageKey;
  numberUnread: number;
  remoteCoverUrl: string;
  userTags: string[];
};

export type Chapter = {
  id?: number;
  seriesId?: number;
  sourceId: string;
  title: string;
  chapterNumber: string;
  volumeNumber: string;
  languageKey: LanguageKey;
  groupName: string;
  time: number;
  read: boolean;
};

export type Language = {
  key: LanguageKey;
  name: string;
  flagCode: string;
};

export type Genre = {
  key: GenreKey;
  name: string;
};

export type Theme = {
  key: ThemeKey;
  name: string;
};

export type Format = {
  key: FormatKey;
  name: string;
};

export type ContentWarning = {
  key: ContentWarningKey;
  name: string;
};

export type Demographic = {
  key: DemographicKey;
  name: string;
};
