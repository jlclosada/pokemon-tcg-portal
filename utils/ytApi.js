import axios from "axios";

const CHANNELS = [
  "UCRSvtnW26zUos-X1uWfc7ZQ", // Canal de itsMrJoss
  "UClBxL8-JaQOWoiAgsbT2DKA", // Canal de Pasalapasa
  "UCYcdw2wL6W6iGBKZgGK_Hjw", // Canal de Folagor
];

// Función para obtener la información del canal (incluye el logo)
async function fetchChannelInfo(apiKey, channelId) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels`,
      {
        params: {
          key: apiKey,
          id: channelId,
          part: "snippet"
        }
      }
    );

    const channel = response.data.items[0];
    return {
      name: channel.snippet.title,
      logo: channel.snippet.thumbnails.default.url, // 🔥 Aquí está el logo
      url: `https://www.youtube.com/channel/${channelId}`
    };
  } catch (error) {
    console.error(`Error al obtener información del canal ${channelId}:`, error);
    return { name: "Desconocido", logo: "", url: "#" };
  }
}

// Obtener los videos de los canales
export async function fetchYouTubeVideos(apiKey) {
  try {
    const videos = [];
    const channelInfoMap = {}; // 🔥 Para almacenar los datos de los canales y evitar peticiones duplicadas

    for (const channelId of CHANNELS) {
      // Obtener información del canal si no la hemos obtenido antes
      if (!channelInfoMap[channelId]) {
        channelInfoMap[channelId] = await fetchChannelInfo(apiKey, channelId);
      }

      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            key: apiKey,
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
          channelLogo: channelInfoMap[channelId].logo, // ✅ Incluir el logo del canal
          channelUrl: channelInfoMap[channelId].url,   // ✅ Incluir la URL del canal
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
