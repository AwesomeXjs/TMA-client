import {defineStore} from 'pinia'
import {useWebApp, useWebAppCloudStorage} from "vue-tg";


export const useWebTgApp = defineStore('tgWebApp', () =>{
    const webAppData = ref(null)
    const dataUnsafe = ref(null)
    const first_name = ref(null)

    watch(dataUnsafe, () => {
        if (dataUnsafe) {
            first_name.value = dataUnsafe.value.user.first_name
        }
    })

    const init = () => {
        webAppData.value = useWebApp()

        window.Telegram.WebApp.CloudStorage.getItem("initData", (_, data) => {
            if (typeof data === 'string' && data === '') {
                console.log("data is saved in storage!")
                dataUnsafe.value = useWebApp().initDataUnsafe
                useWebAppCloudStorage().setStorageItem('initData', JSON.stringify(dataUnsafe.value))
            } else {
                console.log("data exist in storage")
                dataUnsafe.value = JSON.parse(data)
            }
        })
    }



    return {
        webAppData,
        dataUnsafe,
        init,
        first_name

    }
})

