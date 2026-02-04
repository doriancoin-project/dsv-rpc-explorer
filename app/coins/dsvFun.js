"use strict";

// Doriancoin historical/fun data
// This can be populated with interesting Doriancoin transactions and blocks

module.exports = {
	items: [
		// mainnet
		{
			type: "blockheight",
			date: "2014-03-09",
			chain: "main",
			blockHeight: 0,
			blockHash: "d21da25e277bd20b7456087d69c5fee2ebc6091b410271b5cb0623c7d1e7d1b9",
			summary: "Doriancoin Genesis Block",
			alertBodyHtml: "This is the first block in the Doriancoin blockchain, known as the <b>Genesis Block</b>. The coinbase contains the message: <b>\"LA Times 08/Mar/2014 For Dorian Nakamoto, bitcoin article brings denials, intrigue\"</b> - a reference to the infamous Newsweek article that incorrectly identified Dorian Nakamoto as Bitcoin's creator.",
			referenceUrl: "https://www.newsweek.com/2014/03/14/face-behind-bitcoin-247957.html"
		},
		{
			type: "tx",
			date: "2014-03-09",
			chain: "main",
			txid: "a27b7d0a286e46fae3cb7e5b1eae6001fc1b15afee2f6a147291e7eb19746d5d",
			blockHeight: 0,
			summary: "Coinbase transaction of the Genesis Block",
			alertBodyHtml: "This is the <b>coinbase transaction</b> of the <a href='./block/d21da25e277bd20b7456087d69c5fee2ebc6091b410271b5cb0623c7d1e7d1b9'>Doriancoin Genesis Block</a>. Like Bitcoin's genesis coinbase, this transaction is unspendable due to a quirk in how the genesis block is handled in the code.",
			referenceUrl: ""
		},
		{
			type: "blockheight",
			date: "2014-03-12",
			chain: "main",
			blockHeight: 4900,
			blockHash: "ff5165317faf575f2a6ecfefb7ec53b250b91b7a88a211511f4d15db2411d87b",
			summary: "First block containing a non-coinbase transaction",
			alertBodyHtml: "This is the first block to contain a transfer of Doriancoin. Before this block, all blocks contained only coinbase transactions, which mint new coins.",
			referenceUrl: ""
		},
		{
			type: "tx",
			date: "2014-03-12",
			chain: "main",
			txid: "dd9fa5bb55575b231df567c79bac00cc8884aa0763fc8dd54946aa719a80ffc3",
			blockHeight: 4900,
			summary: "First transfer of Doriancoin",
			alertBodyHtml: "This transaction represents the first ever transfer of Doriancoin from one person to another.",
			referenceUrl: ""
		},
		{
			type: "blockheight",
			date: "2021-06-14",
			chain: "main",
			blockHeight: 840000,
			blockHash: "ddf1835008491e69b53abc59a042f7fede9d09efe465f28d1aae8511b823eeb9",
			summary: "First halving - Block subsidy reduced to 25 DSV",
			alertBodyHtml: "This block marks the first <b>halving</b> event in Doriancoin's history. The block subsidy was reduced from 50 DSV to 25 DSV per block, following the 840,000 block halving interval inherited from Litecoin.",
			referenceUrl: ""
		},
		{
			type: "blockheight",
			date: "2026-01-30",
			chain: "main",
			blockHeight: 1246000,
			blockHash: "90524c89fca9ecc9c8a4343610a77bfa8bb88adf8c3edb270a8e34b466191da4",
			summary: "ASERT Difficulty Adjustment Activation",
			alertBodyHtml: "This block marks the activation of <b>ASERT</b> (Absolutely Scheduled Exponentially Rising Targets) difficulty adjustment algorithm, replacing the previous LWMA algorithm. ASERT provides smoother difficulty adjustments with a 1-hour half-life.",
			referenceUrl: ""
		},
		{
			type: "blockheight",
			date: "2021-06-20",
			chain: "main",
			blockHeight: 843203,
			blockHash: "eeb21c4048c39a51cddec6a5eea76c4fff9b716e9f449398f60391ca2779d5d3",
			summary: "Block with the most transactions (576)",
			alertBodyHtml: "This block contains <b>576 transactions</b>, the most of any block in Doriancoin's history.",
			referenceUrl: ""
		},
		{
			type: "blockheight",
			date: "2026-02-03",
			chain: "main",
			blockHeight: 1248268,
			blockHash: "92157b0a60479ef716cc4770b5183d48caf3deab4747b8bebb24a271fcc54fd1",
			summary: "Largest block by size (995,494 bytes)",
			alertBodyHtml: "At <b>995,494 bytes</b>, this is the largest block ever mined on the Doriancoin network, nearly filling the 1MB block size limit.",
			referenceUrl: ""
		},
		{
			type: "tx",
			date: "2021-06-26",
			chain: "main",
			txid: "b5b3e762442b070c5d173f5341e073f1efd88e336cbb276e633c173056948eca",
			blockHeight: 848871,
			summary: "Largest transaction by value (~38.5 million DSV)",
			alertBodyHtml: "This transaction moved approximately <b>38,500,000 DSV</b> (38.5 million), making it the largest transaction by value in Doriancoin's history.",
			referenceUrl: ""
		},
		{
			type: "tx",
			date: "2021-01-11",
			chain: "main",
			txid: "5767195a368af9ea2f6097bb7fa4b74d3502e18c7f1ac9c0b5d68c2871c85f9e",
			blockHeight: 787101,
			summary: "Highest transaction fee (0.72573 DSV)",
			alertBodyHtml: "This transaction paid a fee of <b>0.72573 DSV</b>, the highest fee ever paid for a single transaction on the Doriancoin network.",
			referenceUrl: ""
		}
	]
};
