import React, { useEffect, useState } from 'react'
import { arrCards } from './GetAllCards'

// let arrCards = {
// 	image: 'https://card.godsunchained.com/?id=87067&q=4',
// 	name: 'Illuminate',
// 	price: 0.000010692,
// 	proto: 87067,
// 	quality: 'Meteorite',
// 	rarity: 'common',
// 	set: 'welcome',
// }

export let courseETH = 0

const getPrice = async () => {
	const resp = await fetch(
		'https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=ethereum%2Cgods-unchained'
	)
	const json = await resp.json()
	courseETH = json.ethereum.usd
	//console.log(json.ethereum.usd)
}

const allOrders = JSON.parse(localStorage.getItem('card_ETH'))

export const ETH = () => {
	const [start, setStart] = useState(0)
	const [ethPriseUp, setEthPriseUp] = useState([])
	const [ethPriseDown, setEthPriseDown] = useState([])

	const getStart = () => {
		setStart(prev => prev + 1)
	}

	useEffect(() => {
		if (start >= 1) {
			console.log(arrCards, 'arrCards')
			getPrice()
			setEthPriseDown([])
			setEthPriseUp([])

			let count = 0

			allOrders.forEach(item => {
				let us = arrCards.find(
					el => el.name === item.name && el.quality === item.quality
				)
				if (us === undefined) return
				if (item.price > us.price + us.price * 0.3 && us.price) {
					if (item.price > us.price + us.price * 0.6 && us.price) {
						setEthPriseDown(prev => [
							...prev,
							{
								proto: item.proto,
								quality: item.quality,
								rarity: item.rarity,
								set: item.set,
								old_price: item.price,
								new_price: us.price,
								name: item.name,
								image: item.image,
								procent: '60%',
							},
						])
					} else {
						setEthPriseDown(prev => [
							...prev,
							{
								proto: item.proto,
								quality: item.quality,
								rarity: item.rarity,
								set: item.set,
								old_price: item.price,
								new_price: us.price,
								name: item.name,
								image: item.image,
								procent: '30%',
							},
						])
					}
				}

				if (item.price < us.price - us.price * 0.3 && us.price) {
					if (item.price < us.price - us.price * 0.6 && us.price) {
						setEthPriseUp(prev => [
							...prev,
							{
								proto: item.proto,
								quality: item.quality,
								rarity: item.rarity,
								set: item.set,
								old_price: item.price,
								new_price: us.price,
								name: item.name,
								image: item.image,
								procent: '60%',
							},
						])
					} else {
						setEthPriseUp(prev => [
							...prev,
							{
								proto: item.proto,
								quality: item.quality,
								rarity: item.rarity,
								set: item.set,
								old_price: item.price,
								new_price: us.price,
								name: item.name,
								image: item.image,
								procent: '30%',
							},
						])
					}
				}
			})
			console.log(ethPriseDown, 'eth_down')
			console.log(ethPriseUp, 'eth_up')
			//console.log(arrCards, 'arr')
			//console.log(allOrders, 'all')
		}
	}, [start])

	return (
		<div className='ml-[200px]'>
			<button
				onClick={getStart}
				className='bg-green-500 hover:bg-green-700 px-4 py-2 text-white font-bold rounded m-[20px]'
			>
				START_ETH
			</button>

			<h1>УМЕНЬШИЛАСЬ ------{courseETH}</h1>
			{ethPriseDown.map(
				(item, index) =>
					item.procent === '60%' && (
						<div key={index} className='flex items-center'>
							<div>{index + 1}</div>
							<img className='cover w-[200px]' src={item.image} />
							<div>{item.name}</div>
							<div className='ml-[50px]'>
								<div>{(item.old_price * courseETH).toFixed(2)} $</div>
								<div>{(item.new_price * courseETH).toFixed(2)} $</div>
								<div>{item.procent}</div>
							</div>
						</div>
					)
			)}
			{ethPriseDown.map(
				(item, index) =>
					item.procent === '30%' && (
						<div key={index} className='flex items-center'>
							<div>{index + 1}</div>
							<img className='cover w-[200px]' src={item.image} />
							<div>{item.name}</div>
							<div className='ml-[50px]'>
								<div>{(item.old_price * courseETH).toFixed(2)} $</div>
								<div>{(item.new_price * courseETH).toFixed(2)} $</div>
								<div>{item.procent}</div>
							</div>
						</div>
					)
			)}
			<h1 className='mt-[50px] mb-[50px] bg-red-500'>
				////////////////-----УВЕЛИЧЕЛАСЬ------//////////////
			</h1>
			{ethPriseUp.map(
				(item, index) =>
					item.procent === '60%' && (
						<div key={index} className='flex items-center'>
							<div>{index + 1}</div>
							<img className='cover w-[200px]' src={item.image} />
							<div>{item.name}</div>
							<div className='ml-[50px]'>
								<div>{(item.old_price * courseETH).toFixed(2)} $</div>
								<div>{(item.new_price * courseETH).toFixed(2)} $</div>
								<div>{item.procent}</div>
							</div>
						</div>
					)
			)}
			{ethPriseUp.map(
				(item, index) =>
					item.procent === '30%' && (
						<div key={index} className='flex items-center'>
							<div>{index + 1}</div>
							<img className='cover w-[200px]' src={item.image} />
							<div>{item.name}</div>
							<div className='ml-[50px]'>
								<div>{(item.old_price * courseETH).toFixed(2)} $</div>
								<div>{(item.new_price * courseETH).toFixed(2)} $</div>
								<div>{item.procent}</div>
							</div>
						</div>
					)
			)}
		</div>
	)
}
