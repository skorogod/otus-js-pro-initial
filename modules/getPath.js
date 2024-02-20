export function getPath(el) {
  let path = "";

  if (!(el instanceof HTMLElement)) {
    console.log("EL ",el)
    return "";
  }

  if (el.tagName === "body" || el.tagName === "html") {
    return el.tagName;
  }

  if (el.id && el.id.match(/^[a-z].*/)) {
    return `#${el.id}`;
  }

  if (el.classList.length && document.querySelectorAll(el.tagName).length > 1) {
    path = Array.from(el.classList).reduce(
      (curr, next) => curr + ` .${next}`,
      ""
    );
    if (document.querySelectorAll(el.className).length === 1) {
      return path;
    }
  } else {
    path = el.tagName;
  }

  const needNthPart = (el) => {
    let sibling = el.previousElementSibling;
    if (!el.className){
        return true;
    }

    while (sibling) {
        if (el.className !== sibling.className) {
            return false
        }

        sibling = sibling.previousElementSibling;
    }

    return false

  }

  const getNthPart = (el) => {
    let childIndex = 1;

    let sibling = el.previousElementSibling;
    
    while(sibling) {
        childIndex ++;
        sibling = sibling.previousElementSibling;
    }

    return `:nth-child(${childIndex})`
  }

  if (needNthPart(el)) {
    path += getNthPart(el);
  }


  if (!el.parentElement) {
    return path;
  }

  return `${getPath(el.parentElement)} > ${path}`
}
