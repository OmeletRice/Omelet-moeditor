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
