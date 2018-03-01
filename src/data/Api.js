import axios from "axios";

const HEAD = "https://api.500px.com/v1/photos?feature=";
const TAIL = "&sort=created_at&image_size=3&include_store=store_download&include_states=voted";
const CONSUMER_KEY = "LK8VIVPcKRpV4ix9VXO4mGbdL3kUeVvkzZl2NITS";

export function fetchPhotos(filter, page){
	return axios.get(HEAD.concat((filter).concat(TAIL)),{
		params: {
			feature: filter,
			page: page || 1,
			consumer_key: CONSUMER_KEY,
			image_size: 3,
			rpp: 21,
			exclude: "nude"
		}
	});
}


