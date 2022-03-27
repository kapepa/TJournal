interface IListNews {
  _id: string,
  title: string,
  comments: number,
}

interface IArticle {
  _id: string,
  title: string,
  comments: number,
  type: string,
  created_at: Date,
}

export type { IListNews, IArticle }