"use strict";

const os = require('os');
const path = require('path');
const url = require('url');
const fs = require("fs");

const debug = require("debug");
const debugLog = debug("dsvexp:config");

const dsvUri = process.env.DSVEXP_DORIANCOIND_URI ? url.parse(process.env.DSVEXP_DORIANCOIND_URI, true) : { query: { } };
const dsvAuth = dsvUri.auth ? dsvUri.auth.split(':') : [];




function loadFreshRpcCredentials() {
	let username = dsvAuth[0] || process.env.DSVEXP_DORIANCOIND_USER;
	let password = dsvAuth[1] || process.env.DSVEXP_DORIANCOIND_PASS;

	let authCookieFilepath = dsvUri.query.cookie || process.env.DSVEXP_DORIANCOIND_COOKIE || path.join(os.homedir(), '.doriancoin', '.cookie');

	let authType = "usernamePassword";

	if (!username && !password && fs.existsSync(authCookieFilepath)) {
		authType = "cookie";
	}

	if (authType == "cookie") {
		debugLog(`Loading RPC cookie file: ${authCookieFilepath}`);

		[ username, password ] = fs.readFileSync(authCookieFilepath).toString().trim().split(':', 2);

		if (!password) {
			throw new Error(`Cookie file ${authCookieFilepath} in unexpected format`);
		}
	}

	return {
		host: dsvUri.hostname || process.env.DSVEXP_DORIANCOIND_HOST || "127.0.0.1",
		port: dsvUri.port || process.env.DSVEXP_DORIANCOIND_PORT || 1948,

		authType: authType,

		username: username,
		password: password,

		authCookieFilepath: authCookieFilepath,

		timeout: parseInt(dsvUri.query.timeout || process.env.DSVEXP_DORIANCOIND_RPC_TIMEOUT || 5000),
	};
}

module.exports = {
	loadFreshRpcCredentials: loadFreshRpcCredentials,

	rpc: loadFreshRpcCredentials(),

	// optional: enter your api access key from ipstack.com below
	// to include a map of the estimated locations of your node's
	// peers
	// format: "ID_FROM_IPSTACK"
	ipStackComApiAccessKey: process.env.DSVEXP_IPSTACK_APIKEY,

	// optional: enter your api access key from mapbox.com below
	// to enable the tiles for map of the estimated locations of
	// your node's peers
	// format: "APIKEY_FROM_MAPBOX"
	mapBoxComApiAccessKey: process.env.DSVEXP_MAPBOX_APIKEY,

	// optional: GA tracking code
	// format: "UA-..."
	googleAnalyticsTrackingId: process.env.DSVEXP_GANALYTICS_TRACKING,

	// optional: sentry.io error-tracking url
	// format: "SENTRY_IO_URL"
	sentryUrl: process.env.DSVEXP_SENTRY_URL,
};
