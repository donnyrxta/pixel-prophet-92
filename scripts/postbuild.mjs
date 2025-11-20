import { copyFileSync, existsSync } from 'fs'
import { join } from 'path'

const dist = join(process.cwd(), 'dist')
const src = join(dist, 'index.html')
const dest = join(dist, '404.html')

if (existsSync(src)) {
  copyFileSync(src, dest)
}
