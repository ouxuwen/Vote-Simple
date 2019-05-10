import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
import { Subject } from '../subject/subject.entity';
import { User } from '../user/user.entity';

const tableOptions: IDefineOptions = { timestamp: false, tableName: 'vote' } as IDefineOptions;

@Table(tableOptions)
export class Vote extends Model<Vote>{

    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true, field: 'vid' })
    public vid: number;

    @Column({ type: DataType.INTEGER, allowNull: false, field: 'pid'})
    public  pid: number;

    // @ForeignKey(()=>User)
    @Column({ type: DataType.INTEGER, allowNull: false, field: 'uid'})
    public  uid: number;

    @ForeignKey(()=>Subject)
    @Column({ type: DataType.INTEGER, allowNull: false,field:'sid' })
    public  sid: number;

    // @ForeignKey(()=>User)
    @Column({ type: DataType.INTEGER, allowNull: false,field:'author_id' })
    public  author_id: number;

    @Column({ type: DataType.TEXT, allowNull: true,field:'comment' })
    public  comment: string;

    @Column({ type: DataType.BIGINT, allowNull: false,field:'create_date' })
    public create_date: number;

    @BelongsTo(()=>Subject)
    subject:Subject

    @BelongsTo(()=>User,'uid')
    user:User

    @BelongsTo(()=>User,'author_id')
    author:User
}