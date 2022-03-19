export function renderPagination(elementId, pagination) {
  const ulPagination = document.getElementById(elementId)
  if (!pagination || !ulPagination) return

  const { _page, _limit, _totalRows } = pagination
  //calc totalPage
  const totalPages = Math.ceil(_totalRows / _limit)
  //set data totalPage, check disable
  ulPagination.dataset.page = _page
  ulPagination.dataset.totalPages = totalPages

  if (_page <= 1) ulPagination.firstElementChild?.classList.add('disabled')
  else ulPagination.firstElementChild?.classList.remove('disabled')
  if (_page >= totalPages) ulPagination.lastElementChild?.classList.add('disabled')
  else ulPagination.lastElementChild?.classList.remove('disabled')
}

export function initPagination({ elementId, defaultParams, onChange }) {
  //bind click event for pre,next
  const ulPagination = document.getElementById(elementId)
  if (!ulPagination) return

  //add lick event for previous
  const prevLink = ulPagination.firstElementChild?.firstElementChild
  if (prevLink) {
    prevLink.addEventListener('click', (e) => {
      e.preventDefault()
      const page = Number.parseInt(ulPagination.dataset.page) || 1
      if (page > 1) onChange?.(page - 1)
    })
  }

  //add lick event for next
  const nextLink = ulPagination.lastElementChild?.lastElementChild
  if (nextLink) {
    nextLink.addEventListener('click', (e) => {
      e.preventDefault()
      const page = Number.parseInt(ulPagination.dataset.page) || 1
      const totalPages = ulPagination.dataset.totalPages
      if (page < totalPages) onChange?.(page + 1)
    })
  }
}
