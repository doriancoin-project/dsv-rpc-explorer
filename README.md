# DSV RPC Explorer

## Self-Hosted Doriancoin explorer for everyone running [Doriancoin Core](https://github.com/AnorakCoin/Doriancoin).

---

![homepage](./public/img/screenshots/homepage.png)

This is a self-hosted explorer for the Doriancoin blockchain, driven by RPC calls to your own Doriancoin node. It is easy to run and can be connected to other tools (like Electrum servers) to achieve a full-featured explorer.

Whatever reasons you may have for running a full node (trustlessness, technical curiosity, supporting the network, etc) it's valuable to appreciate the *fullness* of your node. With this explorer, you can explore not just the blockchain database, but also explore all of the functional capabilities of your own node.

Based on [BTC RPC Explorer](https://github.com/janoside/btc-rpc-explorer) by Dan Janosik.


# Features

* Network Summary dashboard
* View details of blocks, transactions, and addresses
* Analysis tools for viewing stats on blocks, transactions, and miner activity
* JSON REST API
* See raw JSON content from doriancoind used to generate most pages
* Search by transaction ID, block hash/height, and address
* Optional transaction history for addresses by querying from Electrum-protocol servers (e.g. ElectrumX)
* Mempool summary, with fee, size, and age breakdowns
* RPC command browser and terminal


# Changelog / Release notes

See [CHANGELOG.md](/CHANGELOG.md).


# Getting started

## Prerequisites

1. Install `Doriancoin Core`. Ensure that `Doriancoin Core`'s RPC server is enabled (`server=1`).
2. Allow `Doriancoin Core` to synchronize with the Doriancoin network (you *can* use this tool while synchronizing, but some pages may fail).
3. Install Node.js (18+ required, 22+ recommended).

### Note about pruning and indexing configurations

This tool is designed to work best with full transaction indexing enabled (`txindex=1`) and pruning **disabled**.
However, you can run *without* `txindex` enabled and/or *with* `pruning` enabled and this tool will continue to function, but some data will be incomplete or missing.

In particular, with `pruning` enabled and/or `txindex` disabled, the following functionality is altered:

* You will only be able to search for mempool, recently confirmed, and wallet transactions by their txid. Searching for non-wallet transactions that were confirmed over 3 blocks ago is only possible if you provide the confirmed block height in addition to the txid.
* Pruned blocks will display basic header information, without the list of transactions. Transactions in pruned blocks will not be available, unless they're wallet-related. Block stats will only work for unpruned blocks.
* The address and amount of previous transaction outputs will not be shown, only the txid:vout.
* The mining fee will only be available for unconfirmed transactions.


## Install / Run

If you're running on mainnet with the default datadir and port, the default configuration should *Just Work*. Otherwise, see the **Configuration** section below.

#### Run from source:

1. `git clone <repository-url>`
2. `cd dsv-rpc-explorer`
3. `npm install`
4. `npm start`

After startup, the app can be viewed at [http://127.0.0.1:3002/](http://127.0.0.1:3002/)


## Configuration

Configuration options may be set via environment variables or CLI arguments.

#### Configuration with environment variables

To configure with environment variables, you need to create one of the following files and enter values in it:

1. `~/.config/dsv-rpc-explorer.env`
2. `.env` in the working directory for dsv-rpc-explorer

In either case, refer to [.env-sample](.env-sample) for a list of the options and formatting details.

#### Configuration with CLI args

For configuring with CLI arguments, run `dsv-rpc-explorer --help` for the full list of options. An example execution is:

```bash
node bin/cli.js --port 8080 --doriancoind-port 1948 --doriancoind-cookie ~/.doriancoin/.cookie
```

#### Key Configuration Options

| Variable | Description | Default |
|----------|-------------|---------|
| `DSVEXP_DORIANCOIND_HOST` | Doriancoin Core RPC host | 127.0.0.1 |
| `DSVEXP_DORIANCOIND_PORT` | Doriancoin Core RPC port | 1948 |
| `DSVEXP_DORIANCOIND_USER` | RPC username | - |
| `DSVEXP_DORIANCOIND_PASS` | RPC password | - |
| `DSVEXP_DORIANCOIND_COOKIE` | Path to RPC cookie file | ~/.doriancoin/.cookie |
| `DSVEXP_ADDRESS_API` | Address lookup API (electrum, none) | none |
| `DSVEXP_ELECTRUM_SERVERS` | Electrum server addresses | - |

#### SSO authentication

You can configure SSO authentication similar to what ThunderHub and RTL provide.
To enable it, make sure `DSVEXP_BASIC_AUTH_PASSWORD` is **not** set and set `DSVEXP_SSO_TOKEN_FILE` to point to a file write-accessible by dsv-rpc-explorer.
Then to access dsv-rpc-explorer, your SSO provider needs to read the token from this file and set it in URL parameter `token`.
For security reasons the token changes with each login, so the SSO provider needs to read it each time!

After successful access with the token, a cookie is set for authentication, so you don't need to worry about it anymore.
To improve user experience you can set `DSVEXP_SSO_LOGIN_REDIRECT_URL` to the URL of your SSO provider.
This will cause users to be redirected to your login page if needed.

## Run via Docker

1. `docker build -t dsv-rpc-explorer .`
2. `docker run -it -p 3002:3002 -e DSVEXP_HOST=0.0.0.0 dsv-rpc-explorer`


## Reverse proxy with HTTPS

See [instructions here](docs/nginx-reverse-proxy.md) for using nginx+certbot (letsencrypt) for an HTTPS-accessible, reverse-proxied site.


# Chain Parameters

| Parameter | Mainnet | Testnet |
|-----------|---------|---------|
| RPC Port | 1948 | 19332 |
| Block Time | 2.5 minutes | 2.5 minutes |
| Max Supply | 84,000,000 DSV | 84,000,000 DSV |
| Halving Interval | 840,000 blocks | 840,000 blocks |
| Address Prefix | D (P2PKH) | D (P2PKH) |


# License

MIT License - see [LICENSE](LICENSE) for details.

Based on BTC RPC Explorer by Dan Janosik.
