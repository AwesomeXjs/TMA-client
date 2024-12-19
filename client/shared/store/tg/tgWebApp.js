import {defineStore} from 'pinia'
import {useWebApp, useWebAppCloudStorage} from "vue-tg";


const initData = 'initData'
const storeName = 'tgWebApp'


export const useWebTgApp = defineStore(storeName, () => {
    const webAppData = ref(null)
    const dataUnsafe = ref(null)
    const dataSafe = ref(null)


    const init = () => {
        webAppData.value = useWebApp()
        if (webAppData.value.version > '6.0') {
            initDataUnsafe()
            initDataSave()
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

    const initDataSave = () => {
        window.Telegram.WebApp.CloudStorage.getItem('initDataSave', (_, data) => {
            if (typeof data === 'string' && data === '') {
                dataSafe.value = useWebApp().initData
                useWebAppCloudStorage().setStorageItem('initDataSave', JSON.stringify(dataSafe.value))
            } else {
                dataSafe.value = JSON.parse(data)
            }
        })
    }

    return {
        webAppData,
        dataUnsafe,
        init,
        dataSafe

    }
})

