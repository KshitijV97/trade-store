

export const expireTrades = (tradeStore, setTradeStore) => {
	let todayDate = new Date();
	setInterval(() => {
		let updatedTradeStore = tradeStore.map((trade) => {
			if (trade.maturityDate.getTime() <= todayDate.getTime()) {
				trade.expired = true;
			}
			return trade;
		});
	}, 60000);
};
