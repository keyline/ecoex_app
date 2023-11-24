import axios from "axios";
import { BASE_URL, KEY, SOURCE } from "./Constant";
import { getAccessToken } from "./AsyncStorage";

export const Network = (method, endpoint, data = {}) => {


    return fetch = new Promise(async (resolve, reject) => {
        try {
            let accesstoken = await getAccessToken();
            // let accesstoken='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwicGhvbmUiOiI5NjE0MzExMDU4IiwiZXhwIjoxNzAwMjEzNjQ0fQ.VdUmy7el_IzXWYNYL9qwSEh5SxEXo_y4fzlvn-SyKcI'
            let config = {
                method: method,
                url: `${BASE_URL}${endpoint}`,
                headers: {
                    "Accept": "multipart/form-data",
                    'Content-Type': 'application/json',
                    key: KEY,
                    source: SOURCE,
                    'Authorization': accesstoken
                },
                data: JSON.stringify(data)
            }
            if (__DEV__) {
                console.log('BaseUrl', BASE_URL);
                console.log('EndPoint ', endpoint);
                console.log('PayLoad ', JSON.stringify(data));
                console.log('accesstoken', accesstoken)
            }
            axios.request(config)
                .then((response) => {
                    if (response.data) {
                        resolve(response.data);
                    } else {
                        reject('Something Went Wrong');
                    }
                })
                .catch(error => {
                    reject(error)
                })
        } catch (error) {
            reject(error);
        }
    })
}