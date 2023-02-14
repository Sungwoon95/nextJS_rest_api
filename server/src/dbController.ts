import fs from 'fs'
import {resolve} from 'path'
import { DBField } from './types'

const basePath = resolve()

const filenames = {
  [DBField.CONTENT]:resolve(basePath, 'src/db/contents.json'),
  [DBField.USER]:resolve(basePath, 'src/db/user.json')
}

export const readDB = (target:DBField) => {
  try {
    return JSON.parse(fs.readFileSync(filenames[target],'utf-8'))
  } catch (err) {
    console.error(err)
  }
}

export const writeDB = (target:DBField, data:string)=> {
  try {
    return fs.writeFileSync(filenames[target], JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}