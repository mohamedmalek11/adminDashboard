// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Home',
    path: '/home',
    icon: 'tabler:smart-home',
  },
  {
    title: 'Second Page',
    path: '/second-page',
    icon: 'tabler:mail',
  }
]

export default navigation
