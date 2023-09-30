const router = require("express").Router()
const Category = require("../model/category")
const IP = require('ip')

router.post("/", async (req, res) => {
  const newCat = new Category(req.body)
  try {
    const savedCat = await newCat.save()
    res.status(200).json(savedCat)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get("/", async (req, res) => {
    try {
      const cat = await Category.find()
      res.status(200).json(cat)
    } catch (error) {
      res.status(500).json(error)
    }
  })

  router.get("/ip", async (req, res) => {
    const ipAddress = IP.address();
    res.send(ipAddress)
  })

module.exports = router