import {ApiService} from "@/shared/api/api_client"


export default defineNuxtPlugin((nuxtApp) => {
    const apiService = new ApiService("http://127.0.0.1:8080")

    return {
        provide: {
            apiService
        }
    }
})