import 'src/app.css'
import Popup from 'src/lib/components/pages/Popup.svelte'

const app = new Popup({
    target: document.getElementById('app'),
})

export default app
