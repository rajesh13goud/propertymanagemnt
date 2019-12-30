import React from 'react';
import { useWait, Waiter } from "react-wait";
// import BlockChain from '../imageLink/blockchain';
import Gas from '../imageLink/gas';
import BlockChain from '../imageLink/blockchain';
// import ImageLink from '../imageLink/imageLink';

function UserCreateButton(){
    const {startWaiting,endWaiting,isWaiting,Wait} = useWait();
    return(
        <button onClick={()=> startWaiting("creating user")}
        disabled={isWaiting("creating user")} >
            <Wait on="creating user" fallback={<div>mama</div>} >
                Waiting 
                <BlockChain />
            </Wait>
        
        </button>
    );
}

// function A() {
//   const { isWaiting } = useWait();
//   return (
//     <div>
//       {isWaiting("creating user") ? "Creating User..." : "Nothing happens"}
//     </div>
//   );
// }

// function B() {
//   const { anyWaiting } = useWait();
//   return (
//     <div>
//       {anyWaiting() ? "Something happening on app..." : "Nothing happens"}
//     </div>
//   );
// }

// function C() {
//   const { startWaiting, endWaiting, isWaiting } = useWait();

//   function createUser() {
//     startWaiting("creating user");
//     // Faking the async work:
//     setTimeout(() => {
//       endWaiting("creating user");
//     }, 1000);
//   }

//   return (
//     <button disabled={isWaiting("creating user")} onClick={createUser}>
//       <Wait on="creating user" fallback={<Spinner />}>
//         Create User
//       </Wait>
//     </button>
//   );
// }
// export default A;
// export default B;


// ReactDOM.render(
//   <Waiter>
//     <C />
//   </Waiter>,
//   document.getElementById("root")
// );
export default UserCreateButton;