// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Tenants',
      path: '/tenants',
      icon: 'tabler:users',
    },
    {
      title: 'Customers',
      path: '/customers',
      icon: 'tabler:users',
    },
    {
      title: 'Employees',
      path: '/employees',
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
