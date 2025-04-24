import { createGlobalStyle } from 'styled-components'
import { fonts } from './themes/fonts'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors['base-text']};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    ${fonts.textM};
  }

  button {
    border: none;
    cursor: pointer;
  }
`
