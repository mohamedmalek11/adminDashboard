// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'tabler:smart-home',
    },
    {
      title: 'Customers',
      path: '/customers',
      icon: 'tabler:users',
    },
    {
      title: 'Tickets',
      path: '/tickets',
      icon: 'tabler:id',
    }
  ]
}

export default navigation
