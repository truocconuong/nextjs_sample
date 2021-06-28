import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

const GlobalBaseStyle = createGlobalStyle`
  ${normalize};
  h1 {
  }
`

export default GlobalBaseStyle
