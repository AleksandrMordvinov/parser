import React, { useEffect, useState } from 'react'
import { arrCards } from './GetAllCards'
import { courseETH } from './ETH'
import { arrCardsG } from './GetAllCardsGods'
import { courseGODS } from './GODS'

export const GodsVSeth = () => {
	const [startt, setStartt] = useState(0)
	const [arrCardsEth, setArrCardsEth] = useState([])
	const [arrCardsGods, setArrCardsGods] = useState([])

	const getStarts = () => {
		setStartt(prev => prev + 1)
	}

	useEffect(() => {
		setArrCardsEth([])
		setArrCardsGods([])
		arrCardsG.forEach(item => {
			let us = arrCards.find(
				el => el.name === item.name && el.quality === item.quality
			)
			if (us === undefined) return

			let currentPriceETH = us.price * courseETH
			let currentPriceGODS = item.price * courseGODS

			if (
				currentPriceETH > currentPriceGODS + currentPriceGODS * 0.2 &&
				currentPriceGODS < 6
			) {
				setArrCardsEth(prev => [
					...prev,
					{
						proto: item.proto,
						quality: item.quality,
						rarity: item.rarity,
						set: item.set,
						currentPriceETH,
						currentPriceGODS,
						name: item.name,
						image: item.image,
					},
				])
			} else if (
				currentPriceETH < currentPriceGODS - currentPriceGODS * 0.8 &&
				currentPriceETH < 6
			) {
				setArrCardsGods(prev => [
					...prev,
					{
						proto: item.proto,
						quality: item.quality,
						rarity: item.rarity,
						set: item.set,
						currentPriceETH,
						currentPriceGODS,
						name: item.name,
						image: item.image,
					},
				])
			}
		})
	}, [startt])
	console.log(arrCardsEth)
	return (
		<div className='ml-[200px]'>
			<button
				onClick={getStarts}
				className='bg-green-500 hover:bg-green-700 px-4 py-2 text-white font-bold rounded m-[20px]'
			>
				START_ETH_VS_GODS
			</button>
			<h1 className='bg-red-500'>--------ETH > GODS-------------</h1>
			{arrCardsEth.map((item, index) => (
				<div key={index} className='flex items-center'>
					<div>{index + 1}</div>
					<img className='cover w-[200px]' src={item.image} />
					<div>{item.name}</div>
					<div className='ml-[50px]'>
						<div>{item.currentPriceETH.toFixed(2)} $ ETH</div>
						<div>{item.currentPriceGODS.toFixed(2)} $ GODS</div>
					</div>
				</div>
			))}
			<h1 className='bg-red-500'>--------GODS > ETH-------------</h1>
			{arrCardsGods.map((item, index) => (
				<div key={index} className='flex items-center'>
					<div>{index + 1}</div>
					<img className='cover w-[200px]' src={item.image} />
					<div>{item.name}</div>
					<div className='ml-[50px]'>
						<div>{item.currentPriceETH.toFixed(2)} $ ETH</div>
						<div>{item.currentPriceGODS.toFixed(2)} $ GODS</div>
					</div>
				</div>
			))}
		</div>
	)
}
