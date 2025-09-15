import express from 'express'
import { checkLinkedInProfileExists } from '../controller/profile.controller.js';

const ping = express.Router()
ping.post('/linkedin', checkLinkedInProfileExists)

export default ping;