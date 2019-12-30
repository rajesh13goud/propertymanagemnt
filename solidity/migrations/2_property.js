var Migrations = artifacts.require("./Property.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
