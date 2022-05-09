import React, { useEffect, useState, useRef } from 'react';
import { initialTrades } from '../constants/initialTrades';
import AddTrade from './AddTrade';
import BasicTable from './Table/BasicTable';
import { COLUMNS } from '../constants/tableColumns';

function TradeApp() {
	const [tradeStore, setTradeStore] = useState([]);
	const [rejectedTrades, setRejectedTrades] = useState([]);
	const tradeStoreRef = useRef([]);
	tradeStoreRef.current = tradeStore;

	// To initialize the trade store at App start
	useEffect(() => {
		setTradeStore(initialTrades);
	}, []);

	useEffect(() => {
		console.log('Rejected trades are', rejectedTrades);
	}, [rejectedTrades]);

	// To update the expiry flag
	// Ideally this should be a job on SpringBoot side, Using a scheduler like Quartz
	useEffect(() => {
		let interval;
		let todayDate = new Date();
		if (tradeStore) {
			interval = setInterval(() => {
				console.log(
					'LOGS | Logging tradestore from setInterval before updating',
					tradeStoreRef.current
				);
				let updatedTradeStore = tradeStoreRef.current.map((trade) => {
					if (trade.maturityDate.getTime() <= todayDate.getTime()) {
						trade.expired = true;
					}
					return trade;
				});
				console.log(
					'LOGS | Logging updatedTradeStore from setInterval after updating',
					updatedTradeStore
				);
				setTradeStore(updatedTradeStore);
			}, 60000);
		} else {
			clearInterval(interval);
		}
	}, [tradeStore]);

	return (
		<div>
			<AddTrade
				tradeStore={tradeStore}
				setTradeStore={setTradeStore}
				rejectedTrades={rejectedTrades}
				setRejectedTrades={setRejectedTrades}
			/>
			<h2 style={{ fontSize: '1.5rem' }}>Accepted trades</h2>
			<BasicTable
				data={tradeStore.map((trade) => {
					return {
						...trade,
						maturityDate: trade.maturityDate
							.toISOString()
							.substring(0, 10),
						createdDate: trade.createdDate
							.toISOString()
							.substring(0, 10),
						expired: trade.expired ? 'EXPIRED' : 'ACTIVE',
					};
				})}
				columns={COLUMNS}
				
			/>
			<h2 style={{ fontSize: '1.5rem' }}>Rejected trades</h2>
			<BasicTable
				data={rejectedTrades.map((trade) => {
					return {
						...trade,
						maturityDate: trade.maturityDate
							.toISOString()
							.substring(0, 10),
						createdDate: trade.createdDate
							.toISOString()
							.substring(0, 10),
					};
				})}
				columns={COLUMNS}
			/>
		</div>
	);
}

export default TradeApp;

/**
 * {
 * tradeId: '',
 * version: '',
 * counterPartyId: '',
 * bookId:''
 * maturityDate: ''
 * createdDate: ''
 * expired
 * }
 */

/**
 * Check if 1st Trade is added.
Check if Version is high the list will be updated.
Check if Version is same the list will be updated.
Check if Version is low the trade will be rejected.
Check if maturity Date is greater than todays date the trade is added.
Check if maturity Date is lower than todays date the Trade will not be added.
Check if Version is Same and date is lower the trade is not updated.
Check if Maturity Date is Same as Todays Date the list will be added.
Check if version is high but maturity date is low the trade will be rejected.
Check If Maturity Date is Expired it will update the Expired Flag
Check with T1 1 CP-1 B1 20/05/2020 N
Check With T2 2 CP-2 B1 20/05/2021 N
Check With T2 1 CP-1 B1 20/05/2021 14/03/2015 N
Check Expired T3 3 CP-3 B2 20/05/2014 Y
 */
