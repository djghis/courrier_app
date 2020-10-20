/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react'
export const onRenderBody = (
    {setHeadComponents}, pluginOptions
) => {
    setHeadComponents([
        <script
         type="text/javascript" 
         src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GATSBY_KEY}&libraries=places`}
         >
         </script>
    ])
}





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

// import React from "react";
// import Container from "./src/container";
// export const wrapRootElement = ({ element, ...restProps }, ...args) => {
//   return (
//     <Container
//       name="wrapRootElement"
//       props={restProps}
//       args={args}
//       mode="browser"
//     >
//       {element}
//     </Container>
//   );
// };