import axios from 'axios';

const API_BASE_URL = 'https://api.distancematrix.ai/maps/api/distancematrix/json';
const API_KEY = "kKN2TCtAq5thNvouC7u6ssrno5C0jUsfTnH9jKPGw6r9IqhCyFpgjLwlP6BvViIv"

interface DistanceMatrixParams {
  origins: string;
  destinations: string;
  mode?: 'driving' | 'walking' | 'bicycling' | 'transit';
  traffic_model?: 'best_guess' | 'pessimistic' | 'optimistic';
}

export async function getDistanceMatrix(params: DistanceMatrixParams) {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        origins: params.origins,
        destinations: params.destinations,
        mode: params.mode || 'driving',
        traffic_model: params.traffic_model || 'best_guess',
        key: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching distance matrix:', error);
    throw error;
  }
}

