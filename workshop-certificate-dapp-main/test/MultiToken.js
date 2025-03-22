const { expect } = require("chai");

describe("MultiToken Test", function () {
  let owner, multiToken;
  const amount = 1;

  //The beforeEach method is a feature (hook) in test libraries that you can use to set preconditions for each test.
  beforeEach(async function () {
    // Retrieve the default account from ethers
    [owner] = await ethers.getSigners();

    // A helper to get the contracts instance and deploy it locally
    // A contract factory is a way to create instances of a smart contract, and it provides a convenient way to interact with the contract's functions and deploy new instances of the contract.
    const MultiToken = await ethers.getContractFactory("MultiToken");
    multiToken = await MultiToken.deploy();

    // console.log("MULTI_TOKEN", multiToken);
  });

  // Methods like ownerOf, approve are not defined in ERC115 unlike ERC720 or ERC20. They should be explicitly defined in the MultiToken contract itself

  it("check the mint function is correct", async () => {
    // Mint token ID 1 to owner address
    await multiToken.mint(owner.address, 1, amount, "0x00");

    const value = await multiToken.balanceOf(owner.address, 1);
    expect(value).to.equal(amount);
  });

  it("check the mintBatch is correct", async () => {
    // Check that owner address owns the token ID 0
    await multiToken.mintBatch(
      owner.address,
      [1, 2, 3],
      [amount, amount, amount],
      "0x00"
    );

    const value1 = await multiToken.balanceOf(owner.address, 1);
    expect(value1).to.equal(amount);
    const value2 = await multiToken.balanceOf(owner.address, 2);
    expect(value2).to.equal(amount);
    const value3 = await multiToken.balanceOf(owner.address, 3);
    expect(value3).to.equal(amount);
  });
});
