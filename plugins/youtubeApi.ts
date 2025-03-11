export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
  
    const API_KEY = config.public.YOUTUBE_API_KEY;
    const CHANNELS = [
      "UCRSvtnW26zUos-X1uWfc7ZQ", // Canal de itsMrJoss
      "UClBxL8-JaQOWoiAgsbT2DKA", // Canal de Pasalapasa
      "UCHxmWeT86sVY29WHXoR5aqg", // Canal de Blessur
    ];
  
    async function fetchYouTubeVideos() {
      try {
        const videos = [];
        for (const channelId of CHANNELS) {
          const response = await $fetch("https://www.googleapis.com/youtube/v3/search", {
            params: {
              key: API_KEY,
              channelId,
              part: "snippet",
              maxResults: 6,
              order: "date",
              type: "video",
            },
          });
  
          response.items.forEach((item) => {
            videos.push({
              id: item.id.videoId,
              title: item.snippet.title,
              channel: item.snippet.channelTitle,
              channelId,
              thumbnail: item.snippet.thumbnails.high.url,
            });
          });
        }
        return videos;
      } catch (error) {
        console.error("Error al obtener videos de YouTube:", error);
        throw error;
      }
    }
  
    return {
      provide: {
        youtube: {
          fetchVideos: fetchYouTubeVideos,
        },
      },
    };
  });
  