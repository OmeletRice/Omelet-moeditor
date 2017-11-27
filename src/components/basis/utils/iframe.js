/* istanbul ignore next */

/**
 * Get the iframe html body height
 * @link contentWindow[https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/contentWindow]
 * @param iframe {Iframe}
 */
export function getIframeBodyHeight (iframe) {
  const iframeWindow = iframe.contentWindow
  if (!iframeWindow) return null
  const rect = iframeWindow.document.body.getBoundingClientRect()
  return rect.height
}

/**
 * Create script and append to iframe html's body
 * @param iframe {Iframe}
 */
export function appendScriptToHtmlBody(iframe, content) {
  const iframeWindow = iframe.contentWindow
  if (!iframeWindow || !content) return null
  const _script = document.createElement('script')
  _script.text = content
  iframeWindow.document.body.append(_script)
}

/**
 * Get iframe scroll length
 * @param iframe {Iframe}
 */
export function getIframeScrollLength(iframe) {
  if (!iframe) return null
  const rect = iframe.getBoundingClientRect()
  return {
    vertical: rect.top,
    horizontal: rect.left
  }
}

/**
 * Get the selected element position on screen
 * @param el {Element} Element be touch on iframe
 * @param iframe {Iframe}
 */
export function getSelectedElPosition(el, iframe) {
  let ret = {
    top: 0,
    left: 0,
    width: 0,
    height: 0
  }
  if (!el || !iframe) return ret
  const elRect = el.getBoundingClientRect()
  const iframeRect = iframe.getBoundingClientRect()
  ret.top = elRect.top + iframeRect.top
  ret.left = elRect.left + iframeRect.left
  ret.width = elRect.width
  ret.height = elRect.height
  return ret
}

/**
 * when scroll update the indicator box position
 * @param el {Element} Element be touch on iframe
 * @param scrollLength {Number}
 */
// export function updateIndicatorBoxPostion(el, scrollLength) {
//   if (!el || !scrollLength) return null
//   const elRect = el.getBoundingClientRect()
//   return {
//     top: elRect.top + scrollLength.vertical,
//     left: elRect.left + scrollLength.horizontal,
//     width: elRect.width
//     height: elRect.height
//   }
// }
