export const addTrade = (
	trade,
	tradeStore,
	rejectedTrades,
	setRejectedTrades,
	setTradeStore
) => {
	let todayDate = new Date();

	// Check maturity date
	if (trade.maturityDate.getTime() < todayDate.getTime()) {
		console.log(
			`Trade ${trade.tradeId} rejected as Maturity date is less than today's date`
		);
		alert(
			`Trade ${trade.tradeId} rejected as Maturity date is less than today's date`
		);
		// Set trade in rejected store
		setRejectedTrades([...rejectedTrades, trade]);
		return;
	}

	for (let i = 0; i < tradeStore.length; i++) {
		// Try to find if trade with given trade ID already exists
		if (tradeStore[i].tradeId === trade.tradeId) {
			// If trade version of new trade is equal or more than original trade then replace it
			if (tradeStore[i].version > trade.version) {
				console.log(
					`Trade ${trade.tradeId} rejected as version is older than the one that exists in store`
				);
				alert(
					`Trade ${trade.tradeId} rejected as version is older than the one that exists in store`
				);
				setRejectedTrades([...rejectedTrades, trade]);
				return;
			}
			if (tradeStore[i].version <= trade.version) {
				setTradeStore([
					...tradeStore.slice(0, i),
					trade,
					...tradeStore.slice(i + 1),
				]);
			}
			console.log('Trade store updated with new trade', trade);
			return;
		}
	}
	setTradeStore([...tradeStore, trade]);
	console.log('Added trade at end', trade);
};
