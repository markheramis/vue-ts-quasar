import { boot } from 'quasar/wrappers'
import NProgress from 'nprogress'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import useUserStore from '@/stores/user'
import { getToken } from '@/utils/storage'
import usePermissionStore from '@/stores/permission'


/* Turn off loading spinner
 *
 */

NProgress.configure({ showSpinner: false })




// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ router }) => {
/* Define routes accessible by unauthenticated
 * app users.
 */

  const whiteList = ['/login', 'auth-redirect', '/mfa', '/password-reset']
  

  /**
   * Callback function to pass on beforeGuard hook.
   */

  async function beforeGuard (
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: NavigationGuardNext
  ) {
    /**
     * The target route in the link
     */

    const { path: targetPath } = to

    /**
     * Instantiate user store
     */

    const userStore = useUserStore()

    /**
     * Instantiate permission store
     */

    const permissionStore = usePermissionStore()

    /**
     * Retrieve token if present from device storage
     */

    const { token } = userStore

    if (!token) 
      userStore.SetToken( getToken() )


    // Start the progress bar
    NProgress.start()

    if ( token ) {
      if ( targetPath === '/login' ) {
        // If is logged in, redirect to the home page
        next({ path: '/' })
        NProgress.done()
      } else {
        // Check whether the user has obtained his permission roles
        if ( userStore.roles.length === 0 ) {
          try {
            await userStore.GetUserInfo()
            const { roles } = userStore

            permissionStore.GenerateRoutes( roles )

            permissionStore.dynamicRoutes.forEach(route => {
              router.addRoute( route )
            })

            // Hack: ensure addRoutes is complete
            // Set the replace: true, so the navigation will not leave a history record
            // next({ ...to, replace: true })
            next(`${to.redirectedFrom?.fullPath}`)
          } catch (err) {
            userStore.ResetToken()
            next(`/login?redirect=${ targetPath }`)
            NProgress.done()
          }
        } else {
          next()
        }
      }
    } else {
      // Has no token
      if (whiteList.indexOf( targetPath ) !== -1) {
        // In the free login whitelist, go directly
        next()
      } else {
        // Other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${ targetPath }`)
        NProgress.done()
      }
    }
  }



  /**
   * Trigger global hook before the actual navigation
   */

  router.beforeEach( beforeGuard )
 

  /**
   * Set nprogress to done when route is resolved. Also
   * set the app title.
   */

  router.afterEach(async(to: RouteLocationNormalized) => {
    const { name } = to

    // Finish progress bar
    // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    NProgress.done()


    // set page title.
    const title = 'App'
    if ( name ) document.title = `${ name?.toString() } - ${ title }`
    else document.title = title
  })
})
