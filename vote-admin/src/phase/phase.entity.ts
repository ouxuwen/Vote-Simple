import { Table, Column, Model, DataType ,HasMany ,HasOne, BelongsTo} from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
import { List } from '../list/list.entity';
import { Subject } from '../subject/subject.entity';

const tableOptions: IDefineOptions = { timestamp: false, tableName: 'phase' } as IDefineOptions;

@Table(tableOptions)
export class Phase extends Model<Phase>{

    
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true, field: 'pid' })
    public pid: number;

    @Column({ type: DataType.STRING(255), allowNull: false, field: 'name' })
    public name: string;

    @Column({ type: DataType.BIGINT, allowNull: false, field: 'create_date' })
    public create_date: number;

    @HasMany(()=>List,'pid')
    public lists:List[];

    @HasMany(()=>Subject,'pid')
    public subjects:Subject[];
}