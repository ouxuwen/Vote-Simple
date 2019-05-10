import { Table, Column, Model, DataType, ForeignKey, HasMany } from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
import { User } from '../user/user.entity';
import { Phase } from '../phase/phase.entity';
import { List } from '../list/list.entity';
import { Vote } from '../vote/vote.entity';

const tableOptions: IDefineOptions = { timestamp: false, tableName: 'subject' } as IDefineOptions;

@Table(tableOptions)
export class Subject extends Model<Subject>{

    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true, field: 'sid' })
    public sid: number;

    @ForeignKey(()=>List)
    @Column({ type: DataType.INTEGER, allowNull: false, field: 'lid' })
    public lid: number;

    @ForeignKey(()=>User)
    @Column({ type: DataType.INTEGER, allowNull: false, field: 'uid' })
    public uid: number;

    @ForeignKey(()=>Phase)
    @Column({ type: DataType.INTEGER, allowNull: false, field: 'pid' })
    public pid: number;

    @Column({ type: DataType.STRING(255), allowNull: false,unique: true, field: 'subject' })
    public subject: string;

    @Column({ type: DataType.TEXT, allowNull: true, field: 'introduction' })
    public introduction: string;

    @Column({ type: DataType.INTEGER, allowNull: true, field: 'status' })
    public status: number;

    @Column({ type: DataType.BIGINT, allowNull: false, field: 'create_date' })
    public create_date: number;

    @HasMany(()=>Vote,'sid')
    votes:Vote[]



    
}