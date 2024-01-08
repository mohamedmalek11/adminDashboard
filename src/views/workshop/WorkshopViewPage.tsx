// ** MUI Imports
import Grid from '@mui/material/Grid'


// ** Demo Components Imports
import WorkshopViewLeft from 'src/views/workshop/WorkshopViewLeft'
import WorkshopViewRight from 'src/views/workshop/WorkshopViewRight'

type Props = {
  tab: string
}

const WorkshopView = ({ tab }: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <WorkshopViewLeft />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <WorkshopViewRight tab={tab}  />
      </Grid>
    </Grid>
  )
}

export default WorkshopView
