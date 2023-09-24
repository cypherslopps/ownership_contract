const FirstContract = artifacts.require("FirstContract");

contract("FirstContract", (accounts) => {
  it("has been deployed successfully", async () => {
    const firstContract = await FirstContract.deployed();
    assert(firstContract, "contract was not deployed");
  });

  describe("greet()", () => {
    it("returns 'Hello, World!'", async () => {
      const firstContract = await FirstContract.deployed();
      const expected = "Hello, World!";
      const actual = await firstContract.greet()                                                                        ;
  
      assert.equal(actual, expected, "greeted with 'Hello, World!'");
    })
  });

  describe("owner()", () => {
    it("returns the address of the owner", async () => {
      const firstContract = await FirstContract.deployed();
      const owner = await firstContract.owner();
      const expected = accounts[0];

      assert.equal(owner, expected, "matches address used to deploy contract");
    })
  })
});

contract("FirstContract: update greeting", (accounts) => {
  describe("setGreeting(string)", () => {
    describe("when message is sent by the owner", () => {
      it("sets greeting to passed in string", async () => {
        const firstContract = await FirstContract.deployed();
        const expected = "Hi there!";
  
        await firstContract.setGreeting(expected);
        const actual = await firstContract.greet();
  
        assert.equal(actual, expected, "greeting updated");
      });
    });

    describe("when message is sent by another account", () => {
      it("does not set the greeting", async () => {
        const firstContract = await FirstContract.deployed();
        const expected = await firstContract.greet();

        try {
          await firstContract.setGreeting("Not the owner", {
            from: accounts[1]
          })
        } catch(err) {
          const errorMessage = "Ownable: caller is not the owner";
          assert.equal(err.reason, errorMessage, "greeting should not be updated");
          return;
        }

        assert(false, "greeting should not be updated")
      })
    })
  });
});