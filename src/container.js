// import React, { Component } from 'react'

// class Container extends Component {
//     constructor(props) {
//       super(props)
    
//       this.state = {
//          loading: true,
//          quote: 50
//       }
//     }
    
//   render() {
//     return (
//       <>
//         <h1>Hello from container</h1>
//         {this.props.children}
//       </>
//     )
//   }
// }

// export default Container

import React, { Component } from 'react'

class Container extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }
    
  render() {
    return (
       <div>
     <h1>Hello from Contianer</h1>
      {this.props.children}
      
    </div> 
    )
  }
}

export default Container
