import { crashReporter } from 'electron'
import windows from './index'

let options = {
    submitURL: '',
    uploadToServer: false,
    companyName: "Gkiokan.NET",
}

crashReporter.start(options)
