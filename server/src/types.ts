import express, { Request, Response } from 'express'

export enum DBField {
  CONTENT = 'contents',
  USER = 'users',
}

export enum Method {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface CustomRoute{
  method: Method
  route: string
  handler : (req:Request,res:Response) => void
}

export interface Content {
  id:string;
  text: string;
  username:string;
  timestamp: number
}

export interface User {
  id: string
  nickname: string
}

export interface Users {
  [key: string]: User
}