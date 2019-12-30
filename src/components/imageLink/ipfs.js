let IPFS = require('ipfs-http-client');
let ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export default ipfs;
// var ipfsClient = require('ipfs-http-client');
// var ipfs = new ipfsClient('/ip4/127.0.0.1/tcp/5001');

// function ipfsUp(data, callback)  {
//     let content = ipfs.types.Buffer.from(data)
//     ipfs.add(content, (err, res) => {
//         if (err) {
//             console.log(err);
//             var data = {
//                 status: "error",
//                 message: " INTERNAL ERROR : Please refresh and try again"
//             }
//             callback(data);
//         }
//         else {
//             console.log(res)
//             callback(res);
//         }
//     })

// }


// export default ipfsUp;

// ipfs.add(this.state.data, (error, result) => {
    //     if(error) {
    //       console.error(error)
    //       return
    //     }
    //    this.setState({ipfsHash: result[0].hash })
    //    console.log('ifpsHash', this.state.ipfsHash)
    //    })
