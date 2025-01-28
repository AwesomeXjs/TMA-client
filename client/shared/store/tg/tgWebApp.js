import {defineStore} from 'pinia'
import {useWebApp, useWebAppCloudStorage} from "vue-tg";


const initData = 'initData'
const storeName = 'tgWebApp'


export const useWebTgApp = defineStore(storeName, () => {
    const webAppData = ref(null)
    const dataUnsafe = ref(null)
    const dataSafe = ref(null)
    const userAuthToken = ref(null)


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

    const setUserAuthToken = () => {
        const queryParams = new URLSearchParams(dataSafe.value);
        const hash = queryParams.get('hash');
        queryParams.delete('hash');
        queryParams.sort();

        let dataCheckingString = "";
        for (const [key, value] of queryParams.entries()) {
            dataCheckingString += `${key}=${value}\n`;
        }

        dataCheckingString = dataCheckingString.slice(0, -1);

        // Создаем токен для авторизации
        const authData = `${dataCheckingString}:${hash}`;
        const authToken = btoa(unescape(encodeURIComponent(authData)));
        userAuthToken.value = authToken
    }

    return {
        webAppData,
        dataUnsafe,
        init,
        dataSafe,
        userAuthToken,
        setUserAuthToken,

    }
})

