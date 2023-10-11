export function AttributElement(tagName, attributes){
    const element = document.createElement(tagName)

    for (const [key, value] of Object.entries(attributes)) {
        if (value !== null){
            element.setAttribute(key,value)
        }
      }
      return element
}