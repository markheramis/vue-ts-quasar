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
  login = 'login_token',
}


/* Actions for setting/getting user
 * auth login tokens
 */

export const getToken = (tokenType=Token.access): string => {
  if (Platform.is !== undefined && Platform.is.desktop) {
    return Cookies.get(tokenType)
  } else {
    return LocalStorage.getItem(tokenType) || ''
  }
}


/** Set token to device storage for auth use.
 *  Falls back to localstorage if cookies not 
 *  supported.
 */

export const setToken = (tokenType: string, value: string) => {
  return Platform.is !== undefined && Platform.is.desktop
    ? Cookies.set(tokenType, value, { secure: true })
    : LocalStorage.set(tokenType, value)
}


/** Remove access/login token regardless of
 *  the device type.
 */

export const removeToken = (tokenType=Token.access) => {
  Cookies.remove(tokenType)
  LocalStorage.remove(tokenType)
}
