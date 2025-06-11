;(function () {
  setInterval(function () {
    ;(function (suffix) {
      return (function (suffix) {
        if (window._debugger_ === false) return () => {}
        return Function(`Function(arguments[0]+"${suffix}")()`)
      })(suffix)
    })(['b', 'u', 'g', 'g', 'e', 'r'].join(''))(['d', 'e'].join(''))
  }, 1000)

  document.addEventListener('contextmenu', function (e) {
    e.preventDefault()
  })

  document.addEventListener('keydown', function (e) {
    try {
      const { code, ctrlKey, metaKey } = e
      const _ctrlKey = ctrlKey || metaKey

      if (code === 'F12') {
        e.preventDefault()
      } else if (_ctrlKey && code === 'KeyS') {
        e.preventDefault()
      } else if (_ctrlKey && code === 'KeyW') {
        e.preventDefault()
      }
    } catch (e) {
      console.error(e)
    }
  })
})()
