import { http } from '../services/config.js'

const urlGetMe = "/auth/get-me?access_token="

async function checkLogin () {
    const access_token = localStorage.getItem("access_token")
    const refresh_token = localStorage.getItem("refresh_token")

    if (access_token){
        console.log("CHECK ACCESS TOKEN")
        const url = "/auth/check-token?access_token=" + access_token;
        try {
            const resp = await http.get(url)
            if (resp.status == 200){
                const uri = urlGetMe + access_token;
                console.log("RETURN ME DATA")
                return (await http.get(uri)).data
            }
        } catch (error) {
            console.log("ACCESS TOKEN ERROR.")
        }
    }
    if (refresh_token){
        console.log("TRY REFRESH TOKEN")
        const url = "/auth/refresh-token?refresh_token=" + refresh_token;
        try {
            const resp = await http.post(url)
            if (resp.status == 201){
                localStorage.setItem("access_token", resp.data.access_token)
                localStorage.setItem("refresh_token", resp.data.refresh_token)
                const uri = urlGetMe + resp.data.access_token;
                console.log("RETURN ME DATA")
                return (await http.get(uri)).data
            } 
        }catch (error) {
            console.log("REFRESH TOKEN ERROR.")
        }
    }
    return null
}

export default checkLogin;