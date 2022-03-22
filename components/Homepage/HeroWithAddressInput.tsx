import { Box } from '@material-ui/core'
import HeroImage from './HeroImage'
import HeroText from './HeroText'
import AddressInput from './AddressInput'

const HeroWithAddressInput = () => {
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      position="relative"
      zIndex={1}
      top="0px"
      bgcolor="#ffe0db"
    >
      <HeroImage />
      <Box className="hero-text-input-container">
        <HeroText />
        <AddressInput />
      </Box>
    </Box>
  )
}

export default HeroWithAddressInput
