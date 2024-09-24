// src/declarations.d.ts or in the root

declare module 'youtube-search-api' {
    export function GetListByKeyword(
      keyword: string,
      options?: { type?: string; maxResults?: number; regionCode?: string }
    ): Promise<{
      items: Array<{
        id: string;
        title: string;
        thumbnail: string;
        // Add other properties returned by the API
      }>;
    }>;

    type ThumbnailDetail = {
        url: string;
        width: number;
        height: number;
      };
      
      type VideoDetails = {
       
          thumbnails: ThumbnailDetail[];
        
      };
  
    export function GetVideoDetails(
      videoId: string
    ): Promise<{
      id: string;
      title: string;
      description: string;
      thumbnail: VideoDetails;
      // Add other properties returned by the API
    }>;
  
    // Define other functions and exports as necessary
  }
  