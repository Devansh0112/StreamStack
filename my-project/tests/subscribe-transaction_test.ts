import { Clarinet, Tx, Chain, Account, types } from "https://deno.land/x/clarinet@v0.19.0/index.ts";

Clarinet.test({
  name: "Ensure that a user can subscribe",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let user = accounts.get("wallet_1")!;

    let block = chain.mineBlock([
      Tx.contractCall(
        "subscribe-transaction",
        "subscribe",
        [],
        user.address
      )
    ]);

    block.receipts[0].result.expectOk().expectAscii("Subscription successful");

    // Verify that the user is marked as subscribed
    let isSubscribed = chain.callReadOnlyFn(
      "subscribe-transaction",
      "is-subscribed",
      [types.principal(user.address)],
      deployer.address
    );

    isSubscribed.result.expectOk().expectTuple();
  },
});
