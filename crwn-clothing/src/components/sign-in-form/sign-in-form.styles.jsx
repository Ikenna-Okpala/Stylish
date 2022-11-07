import styled from "styled-components"
import { BaseButton, GoogleSignInButton, InvertedButton } from "../button/button.styles"

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  h2 {
    margin: 10px 0;
    font-weight: 600;
    font-size: 25px;
  }

  span {
    font-weight: 300;
    font-size: 18px;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  ${BaseButton},
  ${GoogleSignInButton},
  ${InvertedButton}
  {
    font-weight: 300;
  }
`

