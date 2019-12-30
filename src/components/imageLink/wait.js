import {ReactDOM} from 'react-dom';
import React from 'react';
import '../imageLink/wait.css';
import BlockChain from '../imageLink/blockchain';
const Waiters = () =>{
const {useEffect} = React;
const loader = document.querySelector('.loader');
const showLoader = () => loader.classList.remove('loader--hide');
const hideLoader = () => loader.classList.add('loader--hide');

const App = ({hideLoader}) => {
    useEffect(()=> hideLoader(),[]);

    return(
        <div>
            <BlockChain />
        </div>
    );
}
// setTimeout(() =>
// console.log('waite...'),

//     <App 
//     hideLoader={hideLoader}
//     showLoader={showLoader}
//     />
// )(), 60000}
}
// setTimeout(()=>{
//     console.log('hgjhdh');
//     <App hideLoader={hideLoader} showLoader={showLoader} />
// },60000)
export default Waiters;