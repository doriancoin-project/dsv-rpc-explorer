"use strict";

const Decimal = require("decimal.js");
const Decimal8 = Decimal.clone({ precision:8, rounding:8 });

const dsvFun = require("./dsvFun.js");

// Doriancoin uses 840,000 block halving interval (Litecoin-derived)
const blockRewardEras = [ new Decimal8(50) ];
for (let i = 1; i < 34; i++) {
	let previous = blockRewardEras[i - 1];
	blockRewardEras.push(new Decimal8(previous).dividedBy(2));
}

const currencyUnits = [
	{
		type:"native",
		name:"DSV",
		multiplier:1,
		default:true,
		values:["", "dsv", "DSV"],
		decimalPlaces:8
	},
	{
		type:"native",
		name:"mDSV",
		multiplier:1000,
		values:["mdsv"],
		decimalPlaces:5
	},
	{
		type:"native",
		name:"photons",
		multiplier:1000000,
		values:["photons"],
		decimalPlaces:2
	},
	{
		type:"native",
		name:"doris",
		multiplier:100000000,
		values:["doris", "dori"],
		decimalPlaces:0
	}
	// No exchanged currency units - exchange rates disabled for Doriancoin
];

module.exports = {
	name:"Doriancoin",
	ticker:"DSV",
	logoUrlsByNetwork:{
		"main":"./img/network-mainnet/logo.svg",
		"test":"./img/network-testnet/logo.svg",
		"regtest":"./img/network-regtest/logo.svg"
	},
	coinIconUrlsByNetwork:{
		"main":"./img/network-mainnet/coin-icon.svg",
		"test":"./img/network-testnet/coin-icon.svg",
		"regtest":"./img/network-regtest/coin-icon.svg"
	},
	coinColorsByNetwork: {
		"main": "#4A90D9",
		"test": "#1daf00",
		"regtest": "#777"
	},
	siteTitlesByNetwork: {
		"main":"Doriancoin Explorer",
		"test":"Doriancoin Testnet Explorer",
		"regtest":"Doriancoin Regtest Explorer"
	},
	// No demo sites for Doriancoin
	demoSiteUrlsByNetwork: {},
	// No known transactions defined yet - can be populated later
	knownTransactionsByNetwork: {
		main: null,
		test: null
	},
	// No mining pools configs for Doriancoin
	miningPoolsConfigUrls:[],
	maxBlockWeight: 4000000,
	maxBlockSize: 1000000,
	minTxBytes: 166,
	minTxWeight: 166 * 4,
	difficultyAdjustmentBlockCount: 2016,

	// Doriancoin uses LWMA (Linear Weighted Moving Average) difficulty adjustment
	useLWMA: true,
	lwmaActivationHeightByNetwork: {
		"main": 1243845,
		"test": 100,
		"regtest": 500
	},
	// LWMAv2 fixes feedback loop instability by using window-start target as reference
	lwmaV2ActivationHeightByNetwork: {
		"main": 1244300,
		"test": 200,
		"regtest": 600
	},
	lwmaWindow: 45,  // 45-block averaging window

	// Doriancoin uses ASERT (Absolutely Scheduled Exponentially Rising Targets) after LWMA
	useASERT: true,
	asertActivationHeightByNetwork: {
		"main": 1246000,
		"test": 300,
		"regtest": 700
	},
	asertHalfLife: 3600,  // 1 hour half-life

	maxSupplyByNetwork: {
		"main": new Decimal(84000000),
		"test": new Decimal(84000000),
		"regtest": new Decimal(84000000)
	},
	// Doriancoin: 2.5 minute block time (Litecoin-derived)
	targetBlockTimeSeconds: 150,
	targetBlockTimeMinutes: 2.5,
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"DSV":currencyUnits[0], "mDSV":currencyUnits[1], "photons":currencyUnits[2], "doris":currencyUnits[3]},
	baseCurrencyUnit:currencyUnits[3],
	defaultCurrencyUnit:currencyUnits[0],
	feeSatoshiPerByteBucketMaxima: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 75, 100, 150],

	// Doriancoin: 840,000 block halving interval (Litecoin-derived)
	halvingBlockIntervalsByNetwork: {
		"main": 840000,
		"test": 840000,
		"regtest": 150
	},

	terminalHalvingCountByNetwork: {
		"main": 32,
		"test": 32,
		"regtest": 32
	},

	// Supply checkpoints - start empty, populate as chain matures
	coinSupplyCheckpointsByNetwork: {
		"main": [ 0, new Decimal(0) ],
		"test": [ 0, new Decimal(0) ],
		"regtest": [ 0, new Decimal(0) ]
	},

	// UTXO set checkpoints - empty initially
	utxoSetCheckpointsByNetwork: {},

	// Doriancoin genesis block hashes
	genesisBlockHashesByNetwork:{
		"main":	"d21da25e277bd20b7456087d69c5fee2ebc6091b410271b5cb0623c7d1e7d1b9",
		"test":	"707769464eb59fdd7b75cdbc5f0e72226345281852325c965b8ee1fd592fbf51",
		"regtest": "707769464eb59fdd7b75cdbc5f0e72226345281852325c965b8ee1fd592fbf51"
	},
	// Genesis coinbase transaction IDs
	genesisCoinbaseTransactionIdsByNetwork: {
		"main":	"a27b7d0a286e46fae3cb7e5b1eae6001fc1b15afee2f6a147291e7eb19746d5d",
		"test":	null,
		"regtest": null
	},
	// Genesis coinbase transactions - hardcoded since RPC can't fetch genesis coinbase
	genesisCoinbaseTransactionsByNetwork:{
		"main": {
			"txid": "a27b7d0a286e46fae3cb7e5b1eae6001fc1b15afee2f6a147291e7eb19746d5d",
			"hash": "a27b7d0a286e46fae3cb7e5b1eae6001fc1b15afee2f6a147291e7eb19746d5d",
			"version": 1,
			"size": 218,
			"vsize": 218,
			"weight": 872,
			"locktime": 0,
			"vin": [
				{
					"coinbase": "04ffff001d01044c524c412054696d65732030382f4d61722f3230313420466f7220446f7269616e204e616b616d6f746f2c20626974636f696e2061727469636c65206272696e67732064656e69616c732c20696e747269677565",
					"sequence": 4294967295
				}
			],
			"vout": [
				{
					"value": 50.00000000,
					"n": 0,
					"scriptPubKey": {
						"asm": "040184710fa689ad5023690c80f3a49c8f13f8d45b8c857fbcbc8bc4a8e4d3eb4b10f4d4604fa08dce601aaf0f470216fe1b51850b4acf21b179c45070ac7b03a9 OP_CHECKSIG",
						"hex": "41040184710fa689ad5023690c80f3a49c8f13f8d45b8c857fbcbc8bc4a8e4d3eb4b10f4d4604fa08dce601aaf0f470216fe1b51850b4acf21b179c45070ac7b03a9ac",
						"type": "pubkey"
					}
				}
			],
			"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff5b04ffff001d01044c524c412054696d65732030382f4d61722f3230313420466f7220446f7269616e204e616b616d6f746f2c20626974636f696e2061727469636c65206272696e67732064656e69616c732c20696e747269677565ffffffff0100f2052a010000004341040184710fa689ad5023690c80f3a49c8f13f8d45b8c857fbcbc8bc4a8e4d3eb4b10f4d4604fa08dce601aaf0f470216fe1b51850b4acf21b179c45070ac7b03a9ac00000000"
		}
	},
	// Genesis block stats - leave empty, will be fetched from node
	genesisBlockStatsByNetwork:{},
	// No test data for Doriancoin
	testData: {
		txDisplayTestList: {}
	},
	genesisCoinbaseOutputAddressScripthash: null,
	historicalData: dsvFun.items,
	// Exchange rates disabled for Doriancoin
	exchangeRateData: null,
	goldExchangeRateData: null,
	blockRewardFunction:function(blockHeight, chain) {
		// Doriancoin: 840,000 block halving interval (regtest uses 150)
		let halvingBlockInterval = (chain == "regtest" ? 150 : 840000);
		let index = Math.floor(blockHeight / halvingBlockInterval);

		return blockRewardEras[index];
	}
};
