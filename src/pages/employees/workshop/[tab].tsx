// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
import axios from 'axios'



// ** Demo Components Imports
import WorkshopViewPage from 'src/views/workshop/WorkshopViewPage'

const WorkshopView = ({ tab }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <WorkshopViewPage tab={tab} />
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'account' } },
      { params: { tab: 'security' } },
      { params: { tab: 'billing-plan' } },
      { params: { tab: 'notification' } },
      { params: { tab: 'connection' } }
    ],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const res = await axios.get('/apps/invoice/invoices')

  return {
    props: {
      tab: params?.tab
    }
  }
}

export default WorkshopView
