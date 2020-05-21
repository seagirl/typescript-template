import cors from 'cors'

export const corsHandler = cors({
  origin: function (origin, callback) { callback(null, true) },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200,
  allowedHeaders: ['Authorization', 'Cookie', 'Content-Type'],
  credentials: true,
  preflightContinue: false,
})