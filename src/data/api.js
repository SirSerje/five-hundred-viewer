import axios from 'axios';

const URL = "https://api.500px.com/v1/photos";
const CONSUMER_KEY = "LK8VIVPcKRpV4ix9VXO4mGbdL3kUeVvkzZl2NITS";

export function fetchPhotos(filter, page){
    return axios.get(URL,{
      params: {
        feature: filter,
        page: page || 1,
        consumer_key: CONSUMER_KEY,
        image_size: 3,
        rpp: 50,
        exclude: "nude"
      }
    });
}


