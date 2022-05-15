export default class KataSercvice {
  constructor() {
    this.rootURL = 'https://kata.academy:8021/api'
  }

  async getGlobalArticles(offset = 0) {
    try {
      const response = await fetch(`${this.rootURL}/articles?offset=${offset}&limit=5`)
      return await response.json()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getArticle(slug) {
    try {
      const response = await fetch(`${this.rootURL}/articles/${slug}`)
      return await response.json()
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
