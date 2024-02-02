import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useSelectionStore, useToastStore } from './store'

//common components
import AppButtonSolid from '@/components/AppButtonSolid.vue'
import AppButtonGhost from '@/components/AppButtonGhost.vue'
import AppButtonText from '@/components/AppButtonText.vue'
import AppButtonGhostIcon from '@/components/AppButtonGhostIcon.vue'
import AppFormSelect from '@/components/AppFormSelect.vue'
import AppFormTextbox from '@/components/AppFormTextbox.vue'
import AppLoader from '@/components/AppLoader.vue'
import AppDialog from '@/components/AppDialog.vue'

const toastStore = useToastStore()
const selectionStore = useSelectionStore()
const app = createApp(App)

app.use(router)
app.provide('selectionStore', selectionStore)
app.provide('toastStore', toastStore)
app.mount('#app')

app
  .component('AppButtonSolid', AppButtonSolid)
  .component('AppButtonGhost', AppButtonGhost)
  .component('AppButtonText', AppButtonText)
  .component('AppButtonGhostIcon', AppButtonGhostIcon)
  .component('AppFormSelect', AppFormSelect)
  .component('AppFormTextbox', AppFormTextbox)
  .component('AppLoader', AppLoader)
  .component('AppDialog', AppDialog)
