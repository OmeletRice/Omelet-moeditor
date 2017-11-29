/**
 * BlockManager.js
 */
class BlockManager {
  constructor(editor) {
    this.editor = editor
    this.textTypeNames = ['p', 'span', 'strong', 'q', 'blockquote', 'address', 'code', 'pre', 'br', 'hr']
    this.imgTypeNames = ['image']
    this.styleList = ['color', 'font-size', 'font-family', 'font-stlye', 'font-weight', 'line-height']
  }
  /**
   * Get block's id, type, el, state { revisability, Locking, modified }
   * @param node {Node} Node from iframe touchstart emit
   */
  getBlockInfo(node) {
    if (!node) return null
    return {
      id: this.getBlockId(node),
      type: this.getBlockType(node),
      el: this.getBlockEl(node)
    }
  }

  /**
   * get block id, moeditor-id attribute
   * @param el {Element} Element from iframe touchstart emit
   * @param attrName {String} Attribute name
   */
  getBlockId(el, attrName) {
    if (!el || el.nodeType !== 1) return null
    attrName = attrName || 'moeditor-id'
    return el.getAttribute(attrName)
  }

  /**
   * get block type, 'text', 'img'
   * analyze the el's nodeName
   * text: <p> <span> <strong> <q> <blockquote>
   *       <address> <code> <pre> <br /> <hr />
   * img: <image>
   * @param el {Element} Element from iframe touchstart emit
   */
  getBlockType(el) {
    if (!el || el.nodeType !== 1) return null
    const nodeName = el.nodeName.toLowerCase()
    const { textTypeNames, imgTypeNames } = this
    if (this.matchNodeName(nodeName, textTypeNames)) return 'text'
    if (this.matchNodeName(nodeName, imgTypeNames)) return 'img'
  }
  matchNodeName(nodeName, NameList) {
    return !!(NameList.indexOf(nodeName) !== -1)
  }

  /**
   * 克隆一个节点。
   *    计算一个节点的 computed style，并以 inline-stlye 的方式添加到该节点
   *  如果这个节点有子节点，重复上操作
   * @param node {Node} Node from iframe touchstart emit
   */
  getBlockEl(node) {
    if (!node || node.nodeType !== 1) return null
    return this.cloneChild(node)
  }
  cloneChild(node) {
    let cloneNode = this.createCloneNode(node)
    const childrens = node.children
    for (let i = 0, len = childrens.length; i < len; i++) {
      // const _cloneChild = this.createCloneNode(childrens[i])
      const _cloneChild = this.cloneChild(childrens[i])
      cloneNode.append(_cloneChild)
    }
    return cloneNode
  }
  createCloneNode(node) {
    const computedStyles = this.getElComputedStyles(node, this.styleList)
    let cloneNode = node.cloneNode(false)
    Object.keys(computedStyles).forEach(name => {
      cloneNode.style[name] = computedStyles[name]
    })
    return cloneNode
  }
  getElComputedStyles(el, styleList) {
    const computedStyle = document.defaultView.getComputedStyle(el, null)
    var retStyleList = {}
    if (styleList) {
      styleList.forEach(name => {
        const val = computedStyle[name]
        if (val) {
          retStyleList[name] = val
        }
      })
      return retStyleList
    } else {
      return computedStyle
    }
  }
}

export default BlockManager
