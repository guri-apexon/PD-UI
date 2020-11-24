import axios from 'axios'

export const httpCall = async (config) => {
console.log('config :', config);
    try {
        const response = await axios(config);
        return {
            success: true,
            data: response.data
        }
    } catch (err) {
        return {
            success: false,
            err
        }
    }
}

export const BASE_URL = '';