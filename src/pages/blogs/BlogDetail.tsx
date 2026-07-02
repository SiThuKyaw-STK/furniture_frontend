import React from 'react'
import { useParams } from 'react-router'

const BlogDetail = () => {
    const {blogId} = useParams<{blogId: string}>()
  return (
    <div>BlogDetail: {blogId}</div>
  )
}

export default BlogDetail