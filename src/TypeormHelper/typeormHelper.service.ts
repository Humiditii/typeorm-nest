import { SelectQueryBuilder } from 'typeorm';
import { FilterI, PaginationOptionsI, SortI } from './interfaces/typeormHelper.interface';
import { Injectable } from '@nestjs/common';


@Injectable()
export class TypeormHelperService {
    applyPagination<T>(query: SelectQueryBuilder<T>, options: PaginationOptionsI): SelectQueryBuilder<T> {
        const { page, limit } = options;
        query.skip(page * limit).take(limit);
        return query;
    }

    applyFilters<T>(query: SelectQueryBuilder<T>, filters: FilterI[]): SelectQueryBuilder<T> {
        filters.forEach(filter => {
            switch (filter.operator) {
                case 'equals':
                    query.andWhere(`${filter.field} = :value`, { value: filter.value });
                    break;
                case 'not':
                    query.andWhere(`${filter.field} != :value`, { value: filter.value });
                    break;
                case 'gt':
                    query.andWhere(`${filter.field} > :value`, { value: filter.value });
                    break;
                case 'gte':
                    query.andWhere(`${filter.field} >= :value`, { value: filter.value });
                    break;
                case 'lt':
                    query.andWhere(`${filter.field} < :value`, { value: filter.value });
                    break;
                case 'lte':
                    query.andWhere(`${filter.field} <= :value`, { value: filter.value });
                    break;
                case 'like':
                    query.andWhere(`${filter.field} LIKE :value`, { value: `%${filter.value}%` });
                    break;
                case 'in':
                    query.andWhere(`${filter.field} IN (:...value)`, { value: filter.value });
                    break;
                case 'notIn':
                    query.andWhere(`${filter.field} NOT IN (:...value)`, { value: filter.value });
                    break;
                case 'isNull':
                    query.andWhere(`${filter.field} IS NULL`);
                    break;
                case 'isNotNull':
                    query.andWhere(`${filter.field} IS NOT NULL`);
                    break;
                default:
                    break;
            }
        });
        return query;
    }

    applySorting<T>(query: SelectQueryBuilder<T>, sort: SortI[]): 
    SelectQueryBuilder<T> {
        sort.forEach(s => {
            query.addOrderBy(s.field == 'userId' ? 'id' : s.field, s.order);
        });
        return query; 
    }
}
 