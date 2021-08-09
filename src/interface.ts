import {
  Chapter,
  ExtensionMetadata,
  PageRequesterData,
  Series,
  SeriesListResponse,
} from "./types";
import { Response, RequestInfo, RequestInit } from "node-fetch";
import DOMParser from "dom-parser";
import { SeriesSourceType, SettingType } from "./enums";

/**
 * Get a series from the content source.
 *
 * @param sourceType the source type of the series
 * @param id the id of the series on the content source
 * @returns the series populated with fields from the content source, or undefined
 */
export interface GetSeriesFunc {
  (sourceType: SeriesSourceType, id: string): Promise<Series | undefined>;
}

/**
 * Request chapters for a series from the content source.
 *
 * @param sourceType the source type of the series
 * @param id the id of the series on the content source
 * @returns a list of chapters for the series, populated with fields from the content source
 */
export interface GetChaptersFunc {
  (sourceType: SeriesSourceType, id: string): Promise<Chapter[]>;
}

/**
 * Request data for a PageRequesterData object containing values used to get individual page URLs.
 *
 * This function is to support handling content sources with a non-uniform method of getting page
 * URLs -- i.e. each chapter may be hosted on an arbitrary server, which can only be identified
 * after requesting the base URL. The PageRequesterData received is solely used for GetPageUrlsFunc.
 *
 * @param sourceType the source type of the series
 * @param seriesSourceId
 * @param chapterSourceId
 * @returns the PageRequesterData for passing to any GetPageUrlsFunc call for the chapter
 */
export interface GetPageRequesterDataFunc {
  (
    sourceType: SeriesSourceType,
    seriesSourceId: string,
    chapterSourceId: string
  ): Promise<PageRequesterData>;
}

/**
 * Get page URLs for a chapter.
 *
 * Strictly speaking, this function does not necessarily return precise URLs for a resource; it only
 * needs to return identifiers that can locate the actual page source (using the Series object if
 * necessary). Particularly, if the series is an archive file, this function returns a list of paths
 * within the archive that need to be extracted separately.
 *
 * @param pageRequesterData
 * @returns list of URLs that can be used to retrieve page data (using GetPageDataFunc)
 */
export interface GetPageUrlsFunc {
  (pageRequesterData: PageRequesterData): string[];
}

/**
 * Get data for a page.
 *
 * This method should return a value that can be put inside the src tag of an HTML <img>. In most
 * cases that can simply be the URL itself.
 *
 * @param series the series this page belongs to
 * @param url the url for this page from GetPageUrlsFunc
 * @returns promise for the data for the page that can be put inside an <img> src
 */
export interface GetPageDataFunc {
  (series: Series, url: string): Promise<string>;
}

/**
 * Search the content source for a series.
 *
 * @param text the user's search content, with any entered search params removed
 * @param params a map of user-specified parameters for searching. These are currently entered in
 * the form "key:value" like "author:oda" but this is not currently well-defined.
 * @param offset optional page/count offset for the results
 * @returns SeriesListResponse with series that have fields set as available
 */
export interface GetSearchFunc {
  (
    text: string,
    params: { [key: string]: string },
    offset?: number
  ): Promise<SeriesListResponse>;
}

/**
 * Get the directory for the content source (often equivalent to an empty search).
 *
 * @param offset optional page/count offset for the results
 * @returns SeriesListResponse with series that have fields set as available
 */
export interface GetDirectoryFunc {
  (offset?: number): Promise<SeriesListResponse>;
}

/**
 * Get the types for the extension's settings.
 *
 * @returns a map of settings for the extension and their SettingType
 */
export interface GetSettingTypesFunc {
  (): { [key: string]: SettingType };
}

/**
 * Get the current settings for the extension.
 *
 * @returns a map of settings for the extension (with default/initial values already set)
 */
export interface GetSettingsFunc {
  (): { [key: string]: any };
}

/**
 * Set the settings for the extension.
 *
 * Use GetSettingsFunc to see available fields and their types.
 *
 * @param settings a map of settings for the extension
 */
export interface SetSettingsFunc {
  (settings: { [key: string]: any }): void;
}

export interface FetchFunc {
  (url: RequestInfo, init?: RequestInit | undefined): Promise<Response>;
}

export interface WebviewFunc {
  (url: string): Promise<string>;
}

export interface ExtensionClientInterface {
  fetchFn: FetchFunc;
  webviewFn: WebviewFunc;
  domParser: DOMParser;

  settings: { [key: string]: any };

  getMetadata: () => ExtensionMetadata;
  getSeries: GetSeriesFunc;
  getChapters: GetChaptersFunc;
  getPageRequesterData: GetPageRequesterDataFunc;
  getPageUrls: GetPageUrlsFunc;
  getPageData: GetPageDataFunc;
  getSearch: GetSearchFunc;
  getDirectory: GetDirectoryFunc;
  getSettingTypes: GetSettingTypesFunc;
  getSettings: GetSettingsFunc;
  setSettings: SetSettingsFunc;
}

export abstract class ExtensionClientAbstract
  implements ExtensionClientInterface
{
  fetchFn: FetchFunc;
  webviewFn: WebviewFunc;
  domParser: DOMParser;

  settings: { [key: string]: any } = {};

  constructor(
    fetchFn: FetchFunc,
    webviewFn: WebviewFunc,
    domParser: DOMParser
  ) {
    this.fetchFn = fetchFn;
    this.webviewFn = webviewFn;
    this.domParser = domParser;
  }

  getMetadata!: () => ExtensionMetadata;
  getSeries!: GetSeriesFunc;
  getChapters!: GetChaptersFunc;
  getPageRequesterData!: GetPageRequesterDataFunc;
  getPageUrls!: GetPageUrlsFunc;
  getPageData!: GetPageDataFunc;
  getSearch!: GetSearchFunc;
  getDirectory!: GetDirectoryFunc;
  getSettingTypes!: GetSettingTypesFunc;
  getSettings!: GetSettingsFunc;
  setSettings!: SetSettingsFunc;
}
