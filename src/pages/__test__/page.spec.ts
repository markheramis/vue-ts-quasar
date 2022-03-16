import IndexPage from '../IndexPage.vue'
import { mount } from '@vue/test-utils'
import { mergeWith } from 'lodash'


const createWrapper = (overrides?: any) => {
  const defaultMountingOptions = {
    //
  }

  return mount(
    IndexPage,
    mergeWith(defaultMountingOptions, overrides)
  )
}

describe(
  'Sample Test',
  () => {
    test(
      'sanity check',
      () => {
        const wrapper = createWrapper()

        console.log(wrapper)
      }
    )
  }
)
