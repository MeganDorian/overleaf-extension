import 'src/app.css'
import Settings from 'src/lib/components/pages/Settings.svelte'

const app = new Settings({
    target: document.getElementById('app'),
})

export default app
