pragma solidity ^0.5.0;

contract Property{
    address owner;
    address public seller;

    mapping(address => uint) public balances;
    struct Plot{
        address owner;
        address seller;
        bool forSale;
        uint price;
    }
    Plot[3] public plots;

    event PlotOwnerChanged(
        uint index
    );

    event PlotPriceChanged(
        uint index,
        uint price
    );

    event PlotAvailabilityChanged(
        uint index,
        uint price,
        bool forSale
    );
    constructor() public {
        owner = msg.sender;
        plots[0].price = 2000;
        plots[0].forSale = true;
        plots[1].price = 2000;
        plots[1].forSale = true;
        plots[2].price = 2000;
        plots[2].forSale = true;
    }

    function plotForSale(uint index, uint price) public{
        Plot storage plot = plots[index];

        require(msg.sender == plot.owner && price > 0);
        plot.forSale = true;
        plot.price = price;
        emit PlotAvailabilityChanged(index, price, true);
    }
function sell() public{
    seller = msg.sender;
}
    function takeOffMarket(uint index) public{
        Plot storage plot = plots[index];

        require(msg.sender == plot.owner);

        plot.forSale = false;
        emit PlotAvailabilityChanged(index, plot.price, false);
    }

    function getPlots() public view returns(address[] memory, bool[] memory, uint[] memory){
        address[] memory addr = new address[](3);
        bool[] memory available = new bool[](3);
        uint[] memory price = new uint[](3);

        for(uint i=0; i<3; i++){
              Plot storage plot = plots[i];
            addr[i] = plot.owner;
            price[i] = plot.price;
            available[i] = plot.forSale;
        }
        return(addr,available,price);
    }

    function buyPlots(uint index) public payable{
        Plot storage plot = plots[index];

        require(msg.sender != plot.owner && plot.forSale && msg.value >= plot.price);

        if(address(plot.seller) == address(0x0)){
            balances[seller] += msg.value;
        } else{
            balances[plot.seller] += msg.value;
        }
        // plot.owner =msg.sender;
        // plot.forSale = false;
        emit PlotOwnerChanged(index);
    }

    function withDraw() public payable{
        address payable payee = msg.sender;
        uint payment = balances[payee];

        require(payment >0);

        balances[payee] = 0;
        require(payee.send(payment));
    }

    // function destroy() payable public{
    //     require(msg.sender == owner);
    //     selfdestruct(owner);
    // }

}

//contractAddress:0xE95194ddDD05B09f0e500D59Cba88e7F68cb1d1e