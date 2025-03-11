import axios from "axios";

const API_KEY = "AIzaSyCt8V99wWaJFWCrU36EiqMof6cGhtPbqdI"; // Reemplázala con tu clave real
const CHANNELS = [
  "UCRSvtnW26zUos-X1uWfc7ZQ", // Canal de itsMrJoss
  "UClBxL8-JaQOWoiAgsbT2DKA", // Canal de Pasalapasa
  "UCHxmWeT86sVY29WHXoR5aqg", // Canal de Blessur
];

// Obtener los videos de los canales
export async function fetchYouTubeVideos() {
  try {
    const videos = [];

    for (const channelId of CHANNELS) {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            key: API_KEY,
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

// Obtener la información de los canales (incluyendo el logo)
export async function fetchYouTubeChannels() {
  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels`, {
      params: {
        key: API_KEY,
        id: CHANNELS.join(","),
        part: "snippet"
      }
    });

    const channels = response.data.items.map((channel) => ({
      id: channel.id,
      name: channel.snippet.title,
      logo: channel.snippet.thumbnails.default.url
    }));

    return channels;
  } catch (error) {
    console.error("Error al obtener información de los canales:", error);
    throw error;
  }
}
