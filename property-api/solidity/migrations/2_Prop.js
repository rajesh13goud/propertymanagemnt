const Migrations = artifacts.require("Prop");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
