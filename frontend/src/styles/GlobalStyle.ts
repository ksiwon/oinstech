import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Pretendard 폰트 설정 */
  @import url('https://unpkg.com/pretendard/dist/web/static/pretendard.css');

  /* Handletter 폰트 설정 */
  @font-face {
    font-family: 'Handletter';
    src: url('https://unpkg.com/@noonnu/handletter@0.1.0/fonts/handletter-normal.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'Pretendard Variable', Pretendard, 'Handletter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    max-width: 100vw;
  }
`;

export default GlobalStyle;
