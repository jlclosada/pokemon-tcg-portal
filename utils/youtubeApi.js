import axios from "axios";

const CHANNELS = [
  "UCRSvtnW26zUos-X1uWfc7ZQ", // Canal de itsMrJoss
  "UClBxL8-JaQOWoiAgsbT2DKA", // Canal de Pasalapasa
  "UCHxmWeT86sVY29WHXoR5aqg", // Canal de Blessur
];

// Obtener los videos de los canales
export async function fetchYouTubeVideos(apiKey) {
  try {
    const videos = [];

    for (const channelId of CHANNELS) {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            key: apiKey, // 🔥 Ahora la API Key viene del argumento
            channelId,
            part: "snippet",
            maxResults: 6,
            order: "date",
            type: "video"
          }
        }
      );

      response.data.items.forEach((item) => {
        videos.push({
          id: item.id.videoId,
          title: item.snippet.title,
          channel: item.snippet.channelTitle,
          channelId,
          thumbnail: item.snippet.thumbnails.high.url
        });
      });
    }

    return videos;
  } catch (error) {
    console.error("Error al obtener videos de YouTube:", error);
    throw error;
  }
}
