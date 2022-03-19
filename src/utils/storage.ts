import { Cookies, LocalStorage, Platform } from 'quasar'


/* Determines how tokens are stored
 * according to platform used. Cookies for 
 * desktop, LocalStorage otherwise.
 */


/* Define set of tokens
 *
 */
export enum Token {
  access = 'access_token',
  login = 'login_token'
}

/* Actions for setting/getting user
 * auth login tokens
 */
export const getToken = () => {
  return Platform.is.desktop ?
    Cookies.get(Token.access) :
    LocalStorage.getItem(Token.access)
}

export const setToken = (tokenType: string, value: string) => {
  return Platform.is.desktop ?
    Cookies.set(tokenType, value) :
    LocalStorage.set(tokenType, value)
}

export const removeToken = (tokenType: string) => {
    Cookies.remove(tokenType)
    LocalStorage.remove(tokenType)
}
