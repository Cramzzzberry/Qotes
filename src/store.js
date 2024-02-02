import { computed, reactive, ref } from 'vue'
import Queue from './scripts/queue-time'

export const useRefreshStore = reactive({
  toggle: false,
  refresh() {
    this.toggle = !this.toggle
  }
})

export const useHomeTabStore = reactive({
  index: 0,
  setIndex(index) {
    this.index = index
  }
})

export const useDrawerStore = reactive({
  state: false,
  open() {
    this.state = true
  },
  close() {
    this.state = false
  }
})

export const usePreviewStore = reactive({
  state: false,
  sheetID: '',
  open() {
    this.state = true
  },
  close() {
    this.state = false
  }
})

export const useGroupPreviewStore = reactive({
  state: false,
  open() {
    this.state = true
  },
  close() {
    this.state = false
  }
})

export const useSelectionStore = () => {
  const items = ref([])
  const toggle = ref(false)

  const isToggled = computed({
    get() {
      if (items.value.length > 0) {
        toggle.value = true
      }
      return toggle.value
    },
    set(newValue) {
      items.value = []
      toggle.value = newValue
    }
  })

  const hasItems = computed(() => {
    return items.value.length > 0
  })

  const getLength = computed(() => {
    return items.value.length
  })

  const organizedItems = computed(() => {
    let ids = items.value.map((e) => {
      return e.split('---')[0]
    })

    let importants = items.value.map((e) => {
      return e.split('---')[1]
    })

    let lineups = items.value.map((e) => {
      return e.split('---')[2]
    })

    return {
      ids: ids,
      importants: importants,
      hasImportants: importants.includes('true'),
      noImportants: importants.includes('false'),
      lineups: lineups,
      hasLineups: lineups.includes('true'),
      noLineups: lineups.includes('false')
    }
  })

  return {
    items,
    toggle,
    isToggled,
    hasItems,
    getLength,
    organizedItems
  }
}

export const useToastStore = (maxItems = 2) => {
  const queue = ref(new Queue(maxItems))

  function addToast(message, duration = 4000) {
    queue.value.enqueue(message, duration)
  }

  function getItems() {
    return queue.value.getQueue()
  }

  return { addToast, getItems }
}
