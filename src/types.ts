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
