import {defineStore} from 'pinia'
import {useWebApp, useWebAppCloudStorage} from "vue-tg";


const initData = 'initData'
const storeName = 'tgWebApp'


export const useWebTgApp = defineStore(storeName, () => {
    const webAppData = ref(null)
    const dataUnsafe = ref(null)


    const init = () => {
        webAppData.value = useWebApp()
        if (webAppData.value.version > '6.0') {
            initDataUnsafe()
        }
    }

    const initDataUnsafe = () => {
        window.Telegram.WebApp.CloudStorage.getItem(initData, (_, data) => {
            if (typeof data === 'string' && data === '') {
                dataUnsafe.value = useWebApp().initDataUnsafe
                useWebAppCloudStorage().setStorageItem(initData, JSON.stringify(dataUnsafe.value))
            } else {
                dataUnsafe.value = JSON.parse(data)
            }
        })
    }

    return {
        webAppData,
        dataUnsafe,
        init,

    }
})

