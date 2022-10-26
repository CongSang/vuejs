import { onBeforeUnmount, onMounted } from 'vue'

export const useClickAwayListener = (ref, callback) => {
  if (!ref) return

  let listener = e => {
    if (e.target == ref.value || e.composedPath().includes(ref.value)) {
      return
    }
    if (typeof callback == 'function') {
      callback()
    }
  }

  onMounted(() => {
    window.addEventListener('click', listener)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('click', listener)
  })
  return {
    listener
  }
}
