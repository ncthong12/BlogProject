import React, { useEffect, useState } from "react"
import { Card } from "../../components/blog/Card"
import { Category } from "../../components/category/Category"
import axios from "axios"
import { useLocation } from "react-router-dom"

export const Home = () => {
  const [posts, setPosts] = useState([])
  const [cats, setCat] = useState([])

  // setp 2
  const { search } = useLocation()
  // const location = useLocation()

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("/posts" + search)
      setPosts(res.data)
    }
    const getCat = async () => {
      const res = await axios.get("/category" + search)
      setCat(res.data)
    }
    getCat()
    fetchPost()
  }, [search])
  // useEffect(() => {
  //   const getCat = async () => {
  //     const res = await axios.get("/category" + search)
  //     setCat(res.data)
  //   }
  //   getCat()
  // }, [search])
  return (
    <>
      <Category cats={cats}/>
      <Card posts={posts} />
    </>
  )
}
