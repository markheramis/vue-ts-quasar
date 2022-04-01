/* eslint-disable */

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined
    VUE_ROUTER_BASE: string | undefined
  }

  interface ProcessEnv {
    SERVER_URL: string
    SERVER_BASEURL: string
    SERVER_PORT: string
    SERVER_PROTOCOL: 'http' | 'https'
    DEV_PORT: string
  }
}
