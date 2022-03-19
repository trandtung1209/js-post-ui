function showModal(modalElement) {
  const modal = new window.bootstrap.Modal(modalElement)
  if (modal) modal.show()
}

export function registerLightBox({ modalId, imgSelector, prevSelector, nextSelector }) {
  const modalElement = document.getElementById(modalId)
  if (!modalElement) return

  //check modal registered
  if (modalElement.dataset.registered) return

  //selectors
  const imageElement = modalElement.querySelector(imgSelector)
  const prevButton = modalElement.querySelector(prevSelector)
  const nextButton = modalElement.querySelector(nextSelector)
  if (!imageElement || !prevButton || !nextButton) return

  //var
  let imgList = []
  let currentIndex = 0

  function showImageAtIndex(index) {
    imageElement.src = imgList[index].src
  }
  //handle click img
  document.addEventListener('click', (event) => {
    const { target } = event
    if (target.tagName !== 'IMG' || !target.dataset.album) return
    imgList = document.querySelectorAll(`img[data-album="${target.dataset.album}"]`)
    currentIndex = [...imgList].findIndex((x) => x === target)

    showImageAtIndex(currentIndex)
    showModal(modalElement)

    //add index. show modal
  })

  prevButton.addEventListener('click', () => {
    //show prev image
    currentIndex = (currentIndex - 1 + imgList.length) % imgList.length
    showImageAtIndex(currentIndex)
  })

  nextButton.addEventListener('click', () => {
    //show prev image
    currentIndex = (currentIndex + 1) % imgList.length
    showImageAtIndex(currentIndex)
  })

  modalElement.dataset.registered = 'true'
}
