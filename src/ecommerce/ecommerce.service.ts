import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { OpensearchClient } from 'nestjs-opensearch'
import { async } from 'rxjs'

@Injectable()
export class EcommerceService implements OnModuleInit {
	constructor(
		private searchClient: OpensearchClient,
		@Inject('index') private index: string
	) {}

	async searchMulCrit() {
		return this.searchClient.search({
			index: this.index,
			from: 0,
			size: 2,
			body: {
				query: {
					bool: {
						must: [
							{
								match_phrase: {
									customer_full_name: {
										query: 'Underwood Eddie',
										slop: 2,
									},
								},
							},
							{
								match: {
									manufacturer: {
										query: 'Elitelligence',
									},
								},
							},
						],
						must_not: {
							match: {
								currency: 'TEXT',
							},
						},
						filter: {
							range: {
								order_id: {
									gt: 500000,
									lte: 600000,
								},
							},
						},
					},
				},
				sort: [
					{
						customer_id: {
							order: 'asc',
						},
					},
				],
			},
		})
	}

	async searchFuzzy() {
		return this.searchClient.search({
			index: this.index,
			size: 200,
			body: {
				query: {
					fuzzy: {
						category: {
							value: "Men'",
							fuzziness: 2,
						},
					},
				},
			},
		})
	}

	async searchPartial() {
		return this.searchClient.search({
			index: this.index,
			body: {
				query: {
					prefix: {
						['manufacturer.keyword']: 'El',
					},
				},
			},
		})
	}

	async searchWildcard() {
		return this.searchClient.search({
			index: this.index,
			body: {
				query: {
					wildcard: {
						customer_gender: 'MA*',
					},
				},
			},
		})
	}

	async searchRegex() {
		return this.searchClient.search({
			index: this.index,
			body: {
				query: {
					regexp: {
						title: {
							value: 'su.*',
							case_insensitive: true,
						},
					},
				},
			},
		})
	}

	async aggs() {
		return this.searchClient.search({
			size: 0,
			index: this.index,
			body: {
				aggs: {
					whole_year: {
						histogram: {
							field: 'total_quantity',
							interval: 1,
						},
					},
				},
			},
		})
	}

	async onModuleInit() {
		const { body: isExistIndex } = await this.searchClient.indices.exists({
			index: this.index,
		})
		// Create whatever setting we want

		// if (!isExistIndex) {
		// 	await this.searchClient.indices.create({
		// 		index: this.index,
		// 		body: {
		// 			mappings: {
		// 				properties: {
		// 					title: {
		// 						type: 'text',
		// 						fields: {
		// 							raw: {
		// 								type: 'keyword',
		// 							},
		// 						},
		// 					},
		// 				},
		// 			},
		// 		},
		// 	})
		// }
	}
}
