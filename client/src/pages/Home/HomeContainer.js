// import React, { Component } from "react";
// import Home from "./Home";

// class HomeContainer extends Component {
//   render() {
//     return (
//       <Query query={GET_ITEMS} variables={{ id: 1 }}>
//         {({ loading, error, data }) => {
//           if (loading) return "Loading";
//           if (error) return `Error: ${error}`;
//           if (data) {
//             console.log(data);
//             return <Items items={data.items} />;
//           }
//         }}
//       </Query>
//     );
//   }
// }
// export default HomeContainer;
