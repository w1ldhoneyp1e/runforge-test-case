import type {RunDto} from './dto'
import type {Run} from '../model/types'

const mapRunDto = (dto: RunDto): Run => ({
	...dto,
	createdAt: new Date(dto.createdAt),
})

export {
	mapRunDto,
}
