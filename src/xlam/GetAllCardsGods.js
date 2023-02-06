import React, { useEffect, useState } from 'react'
import axios from 'axios'

export let arrCardsG = []

const writeLocalStorage = () => {
	localStorage.setItem('card_GODS', JSON.stringify(arrCardsG))
	console.log('write')
}

export const GetAllCardsGods = () => {
	const [boolean, setBoolean] = useState(false)
	const [newArr, setNewArr] = useState([])

	const getAllCards = () => {
		let json = []
		let newAr = []
		axios
			.get(
				'https://marketplace-api.immutable.com/v1/stacked-assets/0xacb3c6a43d15b907e8433077b6d38ae40936fe2c/search?direction=desc&order_by=buy_quantity_with_fees&page_size=4200&token_address=0xccc8cb5229b0ac8069c51fd58367fd1e622afd97&token_type=ERC20'
			)
			.then(response => {
				// setTimeout(() => {
				json.push(response.data.result)
				arrCardsG.length = 0

				json[0].forEach(element => {
					let user = {
						proto: element.asset_stack_properties.proto,
						quality: element.asset_stack_properties.quality,
						rarity: element.asset_stack_search_properties.rarity,
						set: element.asset_stack_search_properties.set,
						price:
							Number(element.assets_floor_price.quantity_with_fees) *
							0.000000000000000001,
						name: element.name,
						image: element.image_url,
					}
					newAr.push(user)
				})
				setNewArr([...newAr])
				//console.log(newArr, 'timeout')
				// }, 0)
			})
	}

	useEffect(() => {
		console.log(newArr, 'new ar')
		newArr.length > 1 && setBoolean(prev => !prev)
		arrCardsG = newArr
	}, [newArr])

	return (
		<div className='ml-[200px] flex'>
			<button
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-[20px]'
				onClick={getAllCards}
			>
				Calculation
			</button>
			{boolean && <h1 className='items-center'>Ready</h1>}
			<button
				className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-[20px]'
				onClick={writeLocalStorage}
			>
				Write-GODS-LocalStorage
			</button>
		</div>
	)
}
