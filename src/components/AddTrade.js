import React, { useEffect, useState } from 'react';
import { addTrade } from '../functions/addTrade';

function AddTrade({
	tradeStore,
	setTradeStore,
	rejectedTrades,
	setRejectedTrades,
}) {
	const [trade, setTrade] = useState({
		tradeId: '',
		version: '',
		counterPartyId: '',
		bookId: '',
		maturityDate: '',
		createdDate: '',
		expired: false,
	});

	const formatToDate = (input) => {
		const day = input.slice(8, 11);
		console.log('Day is', day);
		const month = input.slice(5, 7);
		console.log('Month is', month);
		const year = input.slice(0, 4);
		console.log('Year is', year);
		console.log('Formatted date is', new Date(year, month -1, day));
		return new Date(year, month - 1, day);
	};

	const addNewTrade = () => {
		if (trade.tradeId.trim() === '') {
			alert('Trade ID cannot be empty');
			return;
		}
		if (trade.version.trim() === '') {
			alert('Version cannot be empty');
			return;
		}
		if (trade.counterPartyId.trim() === '') {
			alert('Counter party ID cannot be empty');
			return;
		}
		// if (trade.maturityDate.trim() === '') {
		// 	alert('Maurity date cannot be empty');
		// 	return;
		// }
		const formattedMaturityDate = formatToDate(trade.maturityDate);
		const createdDate = new Date();

		// if (createdDate.getTime() >= formattedMaturityDate.getTime()) {
		// 	alert('Maturity date should be after created Date');
		// 	return;
		// }
		// This is handled in addTrade()

		trade.maturityDate = formattedMaturityDate;
		trade.createdDate = createdDate;
		addTrade(
			trade,
			tradeStore,
			rejectedTrades,
			setRejectedTrades,
			setTradeStore
		);
	};

	const reset = () => {
		setTrade({
			tradeId: '',
			version: '',
			counterPartyId: '',
			bookId: '',
			maturityDate: '',
			createdDate: '',
			expired: false,
		});
	};

	useEffect(() => {
		console.log('LOGS | Logging user entered data from form', trade);
	}, [trade]);

	return (
		<div style={{ width: '100vw' }}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					maxWidth: '30%',
					margin: '0.5em',
				}}
			>
				<label>Trade ID</label>
				<input
					type='text'
					value={trade.tradeId}
					onChange={(event) =>
						setTrade({ ...trade, tradeId: event.target.value })
					}
				/>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					maxWidth: '30%',
					margin: '0.5em',
				}}
			>
				<label>Version</label>
				<input
					type='text'
					value={trade.version}
					onChange={(event) =>
						setTrade({ ...trade, version: event.target.value })
					}
				/>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					maxWidth: '30%',
					margin: '0.5em',
				}}
			>
				<label>Counter party ID</label>
				<input
					type='text'
					value={trade.counterPartyId}
					onChange={(event) =>
						setTrade({
							...trade,
							counterPartyId: event.target.value,
						})
					}
				/>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					maxWidth: '30%',
					margin: '0.5em',
				}}
			>
				<label>Book ID</label>{' '}
				<input
					type='text'
					value={trade.bookId}
					onChange={(event) =>
						setTrade({ ...trade, bookId: event.target.value })
					}
				/>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					maxWidth: '30%',
					margin: '0.5em',
				}}
			>
				<label>Maturity date</label>
				<input
					type='date'
					value={trade.maturityDate}
					onChange={(event) =>
						setTrade({ ...trade, maturityDate: event.target.value })
					}
				/>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row-reverse',
					maxWidth: '30%',
					margin: '0.5em',
				}}
			>
				<div style={{ marginLeft: '0.5em' }}>
					<button onClick={addNewTrade}>Create</button>
				</div>
				<div>
					<button onClick={reset}>Reset</button>
				</div>
			</div>
		</div>
	);
}

export default AddTrade;
