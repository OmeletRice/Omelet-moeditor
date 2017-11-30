/**
 * BlockManager.js
 */
class BlockManager {
  constructor(editor) {
    this.editor = editor
    this.textTypeNames = ['p', 'span', 'strong', 'q', 'blockquote', 'address', 'code', 'pre', 'br', 'hr']
    this.imgTypeNames = ['image']
    // this.styleList = ['color', 'font-size', 'font-family', 'font-stlye', 'font-weight', 'line-height']
  }
  /**
   * Get block's id, type, el, state { revisability, Locking, modified }
   * @param {Node} node Node from iframe touchstart emit
   */
  getBlockInfo(node) {
    if (!node) return null
    return {
      id: this.getBlockId(node),
      type: this.getBlockType(node),
      el: node,
      newEl: this.getBlockEl(node),
      parentElStyles: this.getBlockParentStlyes(node)
    }
  }

  /**
   * get block id, moeditor-id attribute
   * @param {Element} el Element from iframe touchstart emit
   * @param {String} attrName Attribute name
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
   * @param {Element} el Element from iframe touchstart emit
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
   * @param {Node} node Node from iframe touchstart emit
   */
  getBlockEl(node) {
    if (!node || node.nodeType !== 1) return null
    return this.createCloneNode(node, true)
  }
  cloneChild(node) {
    let cloneNode = this.createCloneNode(node)
    const childrens = node.children
    if (childrens.length > 0) {
      for (let i = 0, len = childrens.length; i < len; i++) {
        // const _cloneChild = this.createCloneNode(childrens[i])
        const _cloneChild = this.cloneChild(childrens[i])
        cloneNode.append(_cloneChild)
      }
    } else {
      cloneNode.textContent = node.textContent
    }
    return cloneNode
  }
  createCloneNode(node, deep = false, styleList) {
    const computedStyles = this.getElComputedStyles(node, styleList)
    let cloneNode = node.cloneNode(deep)
    if (!deep) {
      Object.keys(computedStyles).forEach(name => {
        cloneNode.style[name] = computedStyles[name]
      })
    }
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

  /**
   * 获取该节点的父级节点的所有 计算后的style
   * @param {Element} el Element
   * @param {Array} styleList 所需的样式，默认全部
   */
  getBlockParentStlyes(el, styleList) {
    const parent = el.parentNode
    if (!parent) return
    return this.getElComputedStyles(parent, styleList)
  }

  /**
   * 使用新节点替换旧节点
   * @param {Element} newNode
   * @param {Element} oldNode
   */
  replaceNode(newNode, oldNode) {
    if (!newNode || !oldNode) return false
    oldNode.parentNode.replaceChild(newNode, oldNode)
  }
}

export default BlockManager
