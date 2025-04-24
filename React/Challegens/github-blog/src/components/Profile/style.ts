import { fonts } from '@/styles/themes/fonts'
import styled from 'styled-components'

export const ProfileContainer = styled.div`
  width: 100%;
  max-width: 864px;
  margin: 0 auto;
  padding: 0 1.5rem;
  z-index: 10;

  margin-top: -5rem;
`

export const ProfileCard = styled.div`
  background: ${(props) => props.theme['base-profile']};
  border-radius: 10px;
  padding: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 10rem;
    border-radius: 6px;
  }

  /* box-shadow: 0px 0px 10px var(); */
`

export const ProfileSummary = styled.div`
  margin-left: 2rem;
  margin-top: 0.5rem;

  span {
    ${fonts.titleL}
    color: ${(props) => props.theme['base-title']};
  }

  p {
    ${fonts.textM}
    color: ${(props) => props.theme['base-text']};
    margin-top: 0.5rem;
  }
`
export const ProfileInfo = styled.div`
  display: flex;

  margin-top: 1.5rem;
  gap: 1.5rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  span {
    ${fonts.textM}
    color: ${(props) => props.theme['base-subtitle']};
  }
`
