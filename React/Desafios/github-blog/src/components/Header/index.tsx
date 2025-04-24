import logoBanner from '../../assets/banner.svg'
import { HeaderContainer } from './style'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoBanner} alt="" srcSet="" />
      {/* <Profile /> */}
    </HeaderContainer>
  )
}
