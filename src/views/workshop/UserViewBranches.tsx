// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import UsersProjectListTable from 'src/views/workshop/UsersProjectListTable'

const UserViewAccount = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UsersProjectListTable />
      </Grid>
    </Grid>
  )
}

export default UserViewAccount
