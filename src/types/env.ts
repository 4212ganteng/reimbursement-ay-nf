/* eslint-disable @typescript-eslint/no-namespace */
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().min(1),
  BASEPATH: z.string(),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  R2_PUBLIC_URL: z.string().min(1),
  R2_ACCESS_ID: z.string().min(1),
  R2_SECRET_KEY: z.string().min(1),
  R2_S3API_URL: z.string().min(1)
  R2_BUCKET_NAME: z.string().min(1)
})

const envParse = envSchema.safeParse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  BASEPATH: process.env.BASEPATH,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  R2_PUBLIC_URL: process.env.R2_PUBLIC_URL,
  R2_ACCESS_ID: process.env.R2_ACCESS_ID,
  R2_SECRET_KEY: process.env.R2_SECRET_KEY,
  R2_S3API_URL: process.env.R2_S3API_URL
  R2_BUCKET_NAME: process.env.R2_BUCKET_NAME
})

if (!envParse.success) {
  throw new Error('Error ENV validation')
  process.exit(1)
}

type TENV = z.infer<typeof envSchema>

declare global {
  namespace NodeJS {
    interface ProcessEnv extends TENV {}
  }
}
