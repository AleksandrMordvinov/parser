import React, { useEffect, useState } from 'react'
import { arrCardsG } from './GetAllCardsGods'

const allOrders = JSON.parse(localStorage.getItem('card_GODS'))
export let courseGODS = 0

const getPrice = async () => {
	const resp = await fetch(
		'https://api.coingecko.com/api/v3/simple/price?ids=immutable-x%2Cethereum%2Cgods-unchained%2Cguild-of-guardians%2Cusd-coin%2Cecomi%2Capecoin&vs_currencies=usd'
	)
	const json = await resp.json()
	courseGODS = Object.values(json)[5].usd
	//console.log(Object.values(json)[5].usd)
}

export const GODS = () => {
	const [toggle, setToggle] = useState(0)
	const [godsPriceDown, setGodsPriseDown] = useState([])
	const [godsPriceUp, setGodsPriseUp] = useState([])

	useEffect(() => {
		if (toggle >= 1) {
			getPrice()
			setGodsPriseDown([])
			setGodsPriseUp([])
			allOrders.forEach(items => {
				let temp = arrCardsG.find(
					element =>
						items.name === element.name && items.quality === element.quality
				)
				if (temp === undefined) return
				if (items.price > temp.price + temp.price * 0.2) {
					if (items.price > temp.price + temp.price * 0.6) {
						setGodsPriseDown(prev => [
							...prev,
							{
								proto: items.proto,
								quality: items.quality,
								rarity: items.rarity,
								set: items.set,
								old_price: items.price,
								new_price: temp.price,
								name: items.name,
								image: items.image,
								procent: '60%',
							},
						])
					} else {
						setGodsPriseDown(prev => [
							...prev,
							{
								proto: items.proto,
								quality: items.quality,
								rarity: items.rarity,
								set: items.set,
								old_price: items.price,
								new_price: temp.price,
								name: items.name,
								image: items.image,
								procent: '30%',
							},
						])
					}
				}
				if (items.price < temp.price - temp.price * 0.2) {
					if (items.price < temp.price - temp.price * 0.6) {
						setGodsPriseUp(prev => [
							...prev,
							{
								proto: items.proto,
								quality: items.quality,
								rarity: items.rarity,
								set: items.set,
								old_price: items.price,
								new_price: temp.price,
								name: items.name,
								image: items.image,
								procent: '60%',
							},
						])
					} else {
						setGodsPriseUp(prev => [
							...prev,
							{
								proto: items.proto,
								quality: items.quality,
								rarity: items.rarity,
								set: items.set,
								old_price: items.price,
								new_price: temp.price,
								name: items.name,
								image: items.image,
								procent: '30%',
							},
						])
					}
				}
			})
			// console.log(godsPriceDown, 'godsPriceDown')
			// console.log(godsPriceUp, 'godsPriceUp')
			// console.log(allOrders, 'all')
			// console.log(arrCardsG, 'card')
		}
	}, [toggle])

	return (
		<div className='ml-[200px] mt-[50px] mb-[30px]'>
			<button
				onClick={() => setToggle(prev => prev + 1)}
				className='bg-green-500 hover:bg-green-700 px-4 py-2 rounded text-white'
			>
				Start GODS
			</button>
			<p>{toggle}</p>
			<h1>УМЕНЬШИЛАСЬ -----{courseGODS}</h1>
			{godsPriceDown.map(
				(item, index) =>
					item.procent === '60%' && (
						<div key={index} className='flex items-center'>
							<div>{index + 1}</div>
							<img className='cover w-[200px]' src={item.image} />
							<div>{item.name}</div>
							<div className='ml-[50px]'>
								<div>{(item.old_price * courseGODS).toFixed(2)} $</div>
								<div>{(item.new_price * courseGODS).toFixed(2)} $</div>
								<div>{item.procent}</div>
							</div>
						</div>
					)
			)}
			{godsPriceDown.map(
				(item, index) =>
					item.procent === '30%' && (
						<div key={index} className='flex items-center'>
							<div>{index + 1}</div>
							<img className='cover w-[200px]' src={item.image} />
							<div>{item.name}</div>
							<div className='ml-[50px]'>
								<div>{(item.old_price * courseGODS).toFixed(2)} $</div>
								<div>{(item.new_price * courseGODS).toFixed(2)} $</div>
								<div>{item.procent}</div>
							</div>
						</div>
					)
			)}
			<h1 className='mt-[50px] mb-[50px] bg-red-500'>
				////////////////-----УВЕЛИЧЕЛАСЬ------//////////////
			</h1>
			{godsPriceUp.map(
				(item, index) =>
					item.procent === '60%' && (
						<div key={index} className='flex items-center'>
							<div>{index + 1}</div>
							<img className='cover w-[200px]' src={item.image} />
							<div>{item.name}</div>
							<div className='ml-[50px]'>
								<div>{(item.old_price * courseGODS).toFixed(2)} $</div>
								<div>{(item.new_price * courseGODS).toFixed(2)} $</div>
								<div>{item.procent}</div>
							</div>
						</div>
					)
			)}
			{godsPriceUp.map(
				(item, index) =>
					item.procent === '30%' && (
						<div key={index} className='flex items-center'>
							<div>{index + 1}</div>
							<img className='cover w-[200px]' src={item.image} />
							<div>{item.name}</div>
							<div className='ml-[50px]'>
								<div>{(item.old_price * courseGODS).toFixed(2)} $</div>
								<div>{(item.new_price * courseGODS).toFixed(2)} $</div>
								<div>{item.procent}</div>
							</div>
						</div>
					)
			)}
		</div>
	)
}
