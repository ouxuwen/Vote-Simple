import { Table, Column, Model, DataType,ForeignKey,BelongsTo ,HasMany} from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
import { User } from '../user/user.entity';
import { Phase } from '../phase/phase.entity';
import { Subject } from '../subject/subject.entity';

const tableOptions: IDefineOptions = { timestamp: false, tableName: 'list' } as IDefineOptions;

@Table(tableOptions)
export class List extends Model<List>{

    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true, field: 'lid' })
    public lid: number;

    @ForeignKey(()=>User)
    @Column({ type: DataType.INTEGER, allowNull: false, field: 'uid'})
    public  uid: number;

    @ForeignKey(()=>Phase)
    @Column({ type: DataType.INTEGER, allowNull: false,field:'pid' })
    public  pid: number;

    @Column({ type: DataType.BIGINT, allowNull: false,field:'share_date' })
    public share_date: number;

    @Column({ type: DataType.BIGINT, allowNull: false,field:'create_date' })
    public create_date: number;

    @BelongsTo(() => User,'uid')
    user: User;

    @BelongsTo(() => Phase,'pid')
    phase: Phase;

    @HasMany(()=>Subject,'lid')
    subjects:Subject[]

    



}