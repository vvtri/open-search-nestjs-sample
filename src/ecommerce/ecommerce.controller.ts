import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common'
import { EcommerceService } from './ecommerce.service'
import { CreateEcommerceDto } from './dto/create-ecommerce.dto'
import { UpdateEcommerceDto } from './dto/update-ecommerce.dto'

@Controller('ecommerce')
export class EcommerceController {
	constructor(private readonly ecommerceService: EcommerceService) {}

	@Get('star')
	searchMulCrit() {
		return this.ecommerceService.searchMulCrit()
	}

	@Get('fuzzy')
	fuzzy() {
		return this.ecommerceService.searchFuzzy()
	}

	@Get('partial')
	partial() {
		return this.ecommerceService.searchPartial()
	}

	@Get('wildcard')
	wildcard() {
		return this.ecommerceService.searchWildcard()
	}

	@Get('aggs')
	aggs() {
		return this.ecommerceService.aggs()
	}

	@Get('regex')
	regex() {
		return this.ecommerceService.searchRegex()
	}
}
