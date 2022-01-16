// eslint-disable-next-line
import session from 'express-session'

declare module 'express-session' {
  export interface SessionData {
    userId: number
  }
}
