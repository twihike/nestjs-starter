import * as pluralize from 'pluralize';
import { DefaultNamingStrategy } from 'typeorm/naming-strategy/DefaultNamingStrategy';
import { NamingStrategyInterface } from 'typeorm/naming-strategy/NamingStrategyInterface';
import { snakeCase } from 'typeorm/util/StringUtils';

/* eslint-disable class-methods-use-this */
export class TypeOrmNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName || pluralize(snakeCase(targetName));
  }

  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[],
  ): string {
    const n = [...embeddedPrefixes, customName || propertyName].join('_');
    return snakeCase(n);
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    const n = snakeCase(`${relationName}_${referencedColumnName}`);
    return n;
  }

  joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
    secondPropertyName: string,
  ): string {
    const t1 = pluralize(firstTableName);
    const t2 = pluralize(secondTableName);
    const n = snakeCase(`${t1}_${t2}`);
    const p1 = firstPropertyName.replace(/\./gi, '_');
    const p2 = secondPropertyName.replace(/\./gi, '_');
    [p1, p2].join('unused');
    return n;
  }

  joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName?: string,
  ): string {
    const t = pluralize.singular(tableName);
    const n = snakeCase(`${t}_${columnName || propertyName}`);
    return n;
  }

  joinTableInverseColumnName(
    tableName: string,
    propertyName: string,
    columnName?: string,
  ): string {
    return this.joinTableColumnName(tableName, propertyName, columnName);
  }
}
/* eslint-enable class-methods-use-this */
