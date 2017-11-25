/**
 * IframeManager.js
 */

// var IframeManager = function(editor) {
//   this.editor = editor
// }

// IframeManager.prototype = {
//   /**
//    * Get the iframe html body height
//    * @link contentWindow[https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/contentWindow]
//    * @param iframe {Iframe}
//    */
//   getIframeBodyHeight(iframe) {
//     const iframeWindow = iframe.contentWindow
//     if (iframeWindow) {
//       const rect = iframeWindow.document.body.getBoundingClientRect()
//       return rect.height
//     }
//   }
// }

class IframeManager {
  constructor(editor) {
    this.editor = editor
  }

  getIframeBodyHeight(iframe) {
    const iframeWindow = iframe.contentWindow
    if (iframeWindow) {
      const rect = iframeWindow.document.body.getBoundingClientRect()
      console.log('editor', this.editor)
      return `${rect.height}px`
    }
  }
}

export default IframeManager
