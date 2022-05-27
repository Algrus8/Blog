export default class KataSercvice {
  constructor() {
    this.rootURL = 'https://kata.academy:8021/api'
    this.token = document.cookie.replace('token=', '')
  }

  async getGlobalArticles(offset = 0) {
    const response = await fetch(`${this.rootURL}/articles?offset=${offset}&limit=5`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.token}`,
      },
    })
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
      body: JSON.stringify(user),
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
      body: JSON.stringify(user),
    })
    if (!response.ok && response.status !== 422) throw new Error('Login error')
    return await response.json()
  }

  async getUser() {
    const response = await fetch(`${this.rootURL}/user`, {
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    })
    if (!response.ok) throw new Error('Get user error')
    return await response.json()
  }

  async userUpdate(user) {
    const response = await fetch(`${this.rootURL}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(user),
    })
    if (!response.ok && response.status !== 422) throw new Error('Update user error')
    return await response.json()
  }

  async createArticle(article) {
    const response = await fetch(`${this.rootURL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(article),
    })
    if (!response.ok) throw new Error('Create article error')
    return await response.json()
  }

  async updateArticle(article, slug) {
    const response = await fetch(`${this.rootURL}/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(article),
    })
    if (!response.ok) throw new Error('Edit article error')
    return await response.json()
  }

  async deleteArticle(slug) {
    const response = await fetch(`${this.rootURL}/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.token}`,
      },
    })
    if (!response.ok) throw new Error('Delete article error')
    return response
  }
  async likeArticle(slug) {
    const response = await fetch(`${this.rootURL}/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.token}`,
      },
    })
    if (!response.ok) throw new Error('Like article error')

    return await response.json()
  }
  async unLikeArticle(slug) {
    const response = await fetch(`${this.rootURL}/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.token}`,
      },
    })
    if (!response.ok) throw new Error('Unlike article error')

    return await response.json()
  }
}
