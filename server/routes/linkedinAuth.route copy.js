import express from 'express'
import { linkedinAuthVerification } from '../controller/verifyLinkedin.js'

const auth = express.Router()
console.log("routes");
auth.get('/linkedin/:code', linkedinAuthVerification)

export default auth;