/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
// import React from 'react'
// import Container from './src/container'

// const WrapRootElement = ({ element }) => {
//   return (
//     <Container>
//       {element}
//     </Container>
//   )
// }

// export default WrapRootElement

import React from "react";
import Container from "./src/container";
export const wrapRootElement = ({ element, ...restProps }, ...args) => {
  return (
    <Container
      name="wrapRootElement"
      props={restProps}
      args={args}
      mode="browser"
    >
      {element}
    </Container>
  );
};