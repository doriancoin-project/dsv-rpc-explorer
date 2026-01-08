#!/usr/bin/env node

var debug = require("debug");
var debugLog = debug("dsvexp:config");

// to debug arg settings, enable the below line:
//debug.enable("dsvexp:*");

const args = require('meow')(`
	Usage
	  $ dsv-rpc-explorer [options]

	Options
	  -p, --port <port>			  port to bind http server [default: 3002]
	  -i, --host <host>			  host to bind http server [default: 127.0.0.1]
	  -a, --basic-auth-password <..> protect web interface with a password [default: no password]
	  -C, --coin <coin>			  crypto-coin to enable [default: DSV]

	  -b, --doriancoind-uri <uri>	   connection URI for doriancoind rpc (overrides the options below)
	  -H, --doriancoind-host <host>	 hostname for doriancoind rpc [default: 127.0.0.1]
	  -P, --doriancoind-port <port>	 port for doriancoind rpc [default: 1948]
	  -c, --doriancoind-cookie <path>   path to doriancoind cookie file [default: ~/.doriancoin/.cookie]
	  -u, --doriancoind-user <user>	 username for doriancoind rpc [default: none]
	  -w, --doriancoind-pass <pass>	 password for doriancoind rpc [default: none]

	  --address-api <option>		 api to use for address queries (options: electrum) [default: none]
	  -E, --electrum-servers <..>   comma separated list of electrum servers to use for address queries; only used if --address-api=electrum [default: none]

	  --rpc-allowall				 allow all rpc commands [default: false]
	  --rpc-blacklist <methods>	  comma separated list of rpc commands to block [default: see in config.js]
	  --cookie-secret <secret>	   secret key for signed cookie hmac generation [default: hmac derive from doriancoind pass]
	  --demo						 enable demoSite mode [default: disabled]
	  --no-rates					 disable fetching of currency exchange rates [default: disabled]
	  --slow-device-mode			 disable performance-intensive tasks (e.g. UTXO set fetching) [default: enabled]
	  --privacy-mode				 enable privacyMode to disable external data requests [default: disabled]
	  --max-mem <bytes>			  value for max_old_space_size [default: 1024 (1 GB)]

	  --ganalytics-tracking <tid>	tracking id for google analytics [default: disabled]
	  --sentry-url <sentry-url>	  sentry url [default: disabled]

	  -e, --node-env <env>		   nodejs environment mode [default: production]
	  -h, --help					 output usage information
	  -v, --version				  output version number

	Examples
	  $ dsv-rpc-explorer --port 8080 --doriancoind-port 1948 --doriancoind-cookie ~/.doriancoin/.cookie
	  $ dsv-rpc-explorer -p 8080 -P 1948 -c ~/.doriancoin/.cookie

	Or using connection URIs
	  $ dsv-rpc-explorer -b doriancoin://bob:myPassword@127.0.0.1:1948/
	  $ dsv-rpc-explorer -b doriancoin://127.0.0.1:1948/?cookie=$HOME/.doriancoin/.cookie

	All options may also be specified as environment variables
	  $ DSVEXP_PORT=8080 DSVEXP_DORIANCOIND_PORT=1948 DSVEXP_DORIANCOIND_COOKIE=~/.doriancoin/.cookie dsv-rpc-explorer


`, {
		flags: {
			port: {alias:'p'},
			host: {alias:'i'},
			basicAuthPassword: {alias:'a'},
			coin: {alias:'C'},
			doriancoindUri: {alias:'b'},
			doriancoindHost: {alias:'H'},
			doriancoindPort: {alias:'P'},
			doriancoindCookie: {alias:'c'},
			doriancoindUser: {alias:'u'},
			doriancoindPass: {alias:'w'},
			demo: {},
			rpcAllowall: {},
			electrumServers: {alias:'E'},
			nodeEnv: {alias:'e', default:'production'},
			privacyMode: {},
			slowDeviceMode: {}
		}
	}
).flags;

const envify = k => k.replace(/([A-Z])/g, '_$1').toUpperCase();

Object.keys(args).filter(k => k.length > 1).forEach(k => {
	if (args[k] === false) {
		debugLog(`Config(arg): DSVEXP_NO_${envify(k)}=true`);

		process.env[`DSVEXP_NO_${envify(k)}`] = true;

	} else {
		debugLog(`Config(arg): DSVEXP_${envify(k)}=${args[k]}`);

		process.env[`DSVEXP_${envify(k)}`] = args[k];
	}
});

require('./www');
