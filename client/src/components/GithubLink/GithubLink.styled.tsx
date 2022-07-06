import styled from 'styled-components'

export const CornerStyles = styled.div`
  z-index: 2001;
  filter: brightness(1);
  position: absolute;
  bottom: 150px;
  left: 9px;
  .github-corner {
    &:hover .octo-arm {
      animation: octocat-wave 560ms ease-in-out;
    }
    svg {
      color: #6a6af9;
      .octo-arm {
        transform-origin: 130px 106px;
      }
    }
  }

  @keyframes octocat-wave {
    0%,
    100% {
      transform: rotate(0);
    }
    20%,
    60% {
      transform: rotate(-25deg);
    }
    40%,
    80% {
      transform: rotate(10deg);
    }
  }
  @media (max-width: 500px) {
    .github-corner {
      &:hover .octo-arm {
        animation: none;
      }
      .octo-arm {
        animation: octocat-wave 560ms ease-in-out;
      }
    }
  }
`
