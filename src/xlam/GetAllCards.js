import React, { useEffect, useState } from 'react'
import axios from 'axios'

export let arrCards = []

const writeLocalStorage = () => {
	localStorage.setItem('card_ETH', JSON.stringify(arrCards))
}

export const GetAllCards = () => {
	const [boolean, setBoolean] = useState(false)
	const [newArr, setNewArr] = useState([])

	const getAllCards = () => {
		let json = []
		let newAr = []
		console.log('date get')
		axios
			.get(
				'https://marketplace-api.immutable.com/v1/stacked-assets/0xacb3c6a43d15b907e8433077b6d38ae40936fe2c/search?direction=asc&order_by=buy_quantity_with_fees&page_size=5000&token_type=ETH'
			)
			.then(response => {
				// setTimeout(() => {
				json.push(response.data.result)
				arrCards.length = 0
				console.log('date received')
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
				console.log(newArr, 'timeout')
				// }, 0)
			})
	}

	useEffect(() => {
		console.log(newArr, 'new ar')
		newArr.length > 1 && setBoolean(prev => !prev)
		arrCards = newArr
	}, [newArr])

	return (
		<div className='ml-[200px] flex'>
			<div className='flex items-center'>
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-[20px]'
					onClick={getAllCards}
				>
					Calculation
				</button>
			</div>
			{boolean && <h1 className='items-center'>Read</h1>}
			<button
				className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-[20px]'
				onClick={writeLocalStorage}
			>
				Write-ETH-LocalStorage
			</button>
		</div>
	)
}
