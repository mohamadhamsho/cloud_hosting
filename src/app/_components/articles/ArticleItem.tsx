import { IArticle } from '@/types/types'
import Link from 'next/link'
import React from 'react'


const ArticleItem = ({article}: IArticle) => {
  return (
    <div
      className="border border-gray px-3 py-4 rounded-md hover:bg-gray-100"
    >
      <h3 className="text-md font-semibold line-clamp-1">{article.title}</h3>
      <p className="text-sm line-clamp-3">{article.description}</p>
      <Link
        href={`/articles/${article.id}`}
        className="bg-primary hover:bg-secondary text-white py-1 px-3 rounded-md w-full block text-center mt-2"
      >
        Read more
      </Link>
    </div>
  )
}

export default ArticleItem
