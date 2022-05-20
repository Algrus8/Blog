export default class KataSercvice {
  constructor() {
    this.rootURL = 'https://kata.academy:8021/api'
  }

  async getGlobalArticles(offset = 0) {
    const response = await fetch(`${this.rootURL}/articles?offset=${offset}&limit=5`)
    if (!response.ok) throw new Error('Get articles error')
    return await response.json()
  }

  async getArticle(slug) {
    const response = await fetch(`${this.rootURL}/articles/${slug}`)
    if (!response.ok) throw new Error('Get article error')
    return await response.json()
  }

  async registerNewUser(user) {
    const response = await fetch(`${this.rootURL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: user,
    })
    if (!response.ok && response.status !== 422) throw new Error('Register error')
    return await response.json()
  }

  async userLogin(user) {
    const response = await fetch(`${this.rootURL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
      },
      body: user,
    })
    if (!response.ok && response.status !== 422) throw new Error('Login error')
    return await response.json()
  }

  async getUser() {
    const response = await fetch(`${this.rootURL}/user`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    if (!response.ok) throw new Error('Get user error')
    return await response.json()
  }
}
