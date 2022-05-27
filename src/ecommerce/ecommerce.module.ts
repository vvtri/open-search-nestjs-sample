import { Module } from '@nestjs/common'
import { EcommerceService } from './ecommerce.service'
import { EcommerceController } from './ecommerce.controller'
import { OpensearchModule } from 'nestjs-opensearch'

@Module({
	imports: [
		// https://npm.io/package/nestjs-opensearch
		OpensearchModule.forRoot({
			node: 'http://localhost:9200',
		}),
		EcommerceModule,
	],
	controllers: [EcommerceController],
	providers: [
		EcommerceService,
		{
			provide: 'index',
			useValue: 'opensearch_dashboards_sample_data_ecommerce',
		},
	],
})
export class EcommerceModule {}
