import AppsRoundedIcon from '@mui/icons-material/AppsRounded'
import CatchingPokemonRoundedIcon from '@mui/icons-material/CatchingPokemonRounded'
import DiamondRoundedIcon from '@mui/icons-material/DiamondRounded'
import DirectionsBikeRoundedIcon from '@mui/icons-material/DirectionsBikeRounded'
import FolderRoundedIcon from '@mui/icons-material/FolderRounded'
import HeadphonesRoundedIcon from '@mui/icons-material/HeadphonesRounded'
import LaptopChromebookRoundedIcon from '@mui/icons-material/LaptopChromebookRounded'
import LocalAirportRoundedIcon from '@mui/icons-material/LocalAirportRounded'
import LocalCafeRoundedIcon from '@mui/icons-material/LocalCafeRounded'
import LocalFloristRoundedIcon from '@mui/icons-material/LocalFloristRounded'
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded'
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded'
import PublicRoundedIcon from '@mui/icons-material/PublicRounded'
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded'
import SportsBaseballRoundedIcon from '@mui/icons-material/SportsBaseballRounded'
import SportsBasketballRoundedIcon from '@mui/icons-material/SportsBasketballRounded'
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded'
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded'
import SportsTennisRoundedIcon from '@mui/icons-material/SportsTennisRounded'
import SportsVolleyballRoundedIcon from '@mui/icons-material/SportsVolleyballRounded'
import TimeToLeaveRoundedIcon from '@mui/icons-material/TimeToLeaveRounded'

export const DynamicIcon = (
  icon: string = '',
  size: 'small' | 'inherit' | 'large' | 'medium' = 'medium',
  color: string = '',
): JSX.Element => {
  switch (icon) {
    case 'baseball':
      return <SportsBaseballRoundedIcon fontSize={size} sx={{ color }} />
    case 'basketball':
      return <SportsBasketballRoundedIcon fontSize={size} sx={{ color }} />
    case 'soccer':
      return <SportsSoccerRoundedIcon fontSize={size} sx={{ color }} />
    case 'tennis':
      return <SportsTennisRoundedIcon fontSize={size} sx={{ color }} />
    case 'volley':
      return <SportsVolleyballRoundedIcon fontSize={size} sx={{ color }} />
    case 'videogame':
      return <SportsEsportsRoundedIcon fontSize={size} sx={{ color }} />
    case 'planet':
      return <PublicRoundedIcon fontSize={size} sx={{ color }} />
    case 'iphone':
      return <PhoneIphoneRoundedIcon fontSize={size} sx={{ color }} />
    case 'laptop':
      return <LaptopChromebookRoundedIcon fontSize={size} sx={{ color }} />
    case 'camera':
      return <PhotoCameraRoundedIcon fontSize={size} sx={{ color }} />
    case 'restaurant':
      return <RestaurantRoundedIcon fontSize={size} sx={{ color }} />
    case 'cafe':
      return <LocalCafeRoundedIcon fontSize={size} sx={{ color }} />
    case 'headPhone':
      return <HeadphonesRoundedIcon fontSize={size} sx={{ color }} />
    case 'diamond':
      return <DiamondRoundedIcon fontSize={size} sx={{ color }} />
    case 'flower':
      return <LocalFloristRoundedIcon fontSize={size} sx={{ color }} />
    case 'bike':
      return <DirectionsBikeRoundedIcon fontSize={size} sx={{ color }} />
    case 'car':
      return <TimeToLeaveRoundedIcon fontSize={size} sx={{ color }} />
    case 'airport':
      return <LocalAirportRoundedIcon fontSize={size} sx={{ color }} />
    case 'app':
      return <AppsRoundedIcon fontSize={size} sx={{ color }} />
    case 'pokemon':
      return <CatchingPokemonRoundedIcon fontSize={size} sx={{ color }} />
    default:
      return <FolderRoundedIcon fontSize={size} sx={{ color }} />
  }
}
