export const API_URL = 'http://localhost:3000'

export const getToken = () => {
  const token = JSON.parse(localStorage.getItem('book-shop-token')) || null

  return token
}

export const setToken = data => {
  localStorage.setItem('book-shop-token', JSON.stringify(data))
}

export const removeToken = () => {
  localStorage.removeItem('book-shop-token')
}

export const homeMenu = [
  {
    name: 'Dashboard',
    icon: 'pi pi-home',
    path: 'dashboard'
  }
]

export const manageMenu = [
  {
    name: 'Books',
    icon: 'pi pi-book',
    path: 'books'
  },
  {
    name: 'Users',
    icon: 'pi pi-users',
    path: 'users'
  },
  {
    name: 'Bookmark',
    icon: 'pi pi-bookmark',
    path: 'bookmark'
  },
  {
    name: 'Feedback',
    icon: 'pi pi-thumbs-up',
    path: 'feedback'
  }
]

export const onFormatCurrency = value => {
  return (
    value &&
    value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'VND'
    })
  )
}

export const onFormatDate = value => {
  return (
    value &&
    value.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  )
}
