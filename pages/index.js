import Head from 'next/head';
import styles from '../styles/Home.module.css';
import CoinGecko from 'coingecko-api';
const coinGeckoClient = new CoinGecko();

export default function Home(props) {
	const { data } = props.result;

	const formatPercent = (number) => `${new Number(number).toFixed(2)}%`;

	const formatDollar = (number, maximumSignificantDigits) => {
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'usd',
			maximumSignificantDigits
		}).format(number);
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Coinmarketcap Clone</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1>Coinmarketcap Clone</h1>

			<table className="table">
				<thead>
					<tr>
						<th>Symbol</th>
						<br />
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{data.map((coin) => (
						<tr key={coin.id}>
							<td>
								<img src={coin.image} style={{ width: 25, height: 25, marginRight: 10 }} />
							</td>
							<td>{coin.symbol.toUppercase}</td>
							<td>
								<span className={coin.price_change_percentage_24h > 0 ? 'text-sucess' : 'text-danger'}>
									{formatPercent(coin.price_change_percentage_24h)}
								</span>
							</td>
							<td>{formatDollar(coin.current_price, 20)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
export async function getServerSideProps(context) {
	const params = {
		order: CoinGecko.ORDER.MARKET_CAP_DESC
	};
	const result = await coinGeckoClient.coins.markets({ params });
	return {
		props: {
			result
		}
	};
}
