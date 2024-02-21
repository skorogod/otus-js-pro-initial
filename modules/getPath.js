export function getPath(el) {
  let path = el.tagName.toLowerCase();

  if (!(el instanceof HTMLElement)) {
    return "";
  }

  if (el.tagName === "BODY" || el.tagName === "HTML") {
    return el.tagName.toLocaleLowerCase();
  }

  if (el.id && el.id.match(/^[a-z].*/)) {
    return `#${el.id}`;
  }

  if (
    el.className.length &&
    document.getElementsByClassName(el.className).length === 1
  ) {
   
    path = Array.from(el.classList).reduce(
      (curr, next) => curr + `.${next}`,
      ""
    );

    return path;
  }

  const needNthPart = (el) => {
    let sibling = el.previousElementSibling;

    if (sibling) {
      if (!el.className) {
        return true;
      }

      while (sibling) {
        if (el.className !== sibling.className) {
          return false;
        }

        sibling = sibling.previousElementSibling;
      }

      return true;

    } else {
      return false;
    }
  };

  const getNthPart = (el) => {
    let childIndex = 1;

    let sibling = el.previousElementSibling;

    while (sibling) {
      childIndex++;
      sibling = sibling.previousElementSibling;
    }

    return `:nth-child(${childIndex})`;
  };

  if (needNthPart(el)) {
    path += getNthPart(el);
  }

  if (!el.parentElement) {
    return path;
  }

  return `${getPath(el.parentElement)} > ${path}`;
}
