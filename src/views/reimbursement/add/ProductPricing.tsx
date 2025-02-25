// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'

// Component Imports
import Form from '@components/Form'
import CustomTextField from '@core/components/mui/TextField'

const ProductPricing = () => {
  return (
    <Card>
      <CardHeader title='Pricing' />
      <CardContent>
        <Form>
          <CustomTextField fullWidth label='Purposes' placeholder='Input needs' className='mbe-6' />
          <CustomTextField fullWidth label='Total Price' placeholder='$499' className='mbe-6' />

        </Form>
      </CardContent>
    </Card>
  )
}

export default ProductPricing
