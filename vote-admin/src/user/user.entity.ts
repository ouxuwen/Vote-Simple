import { Table, Column, Model, DataType, HasMany, BeforeFind, AfterFind, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
import { List } from '../list/list.entity';
import { Subject } from '../subject/subject.entity';
var dateFormat = require('dateformat');

const tableOptions: IDefineOptions = { timestamp: false, tableName: 'user' } as IDefineOptions;

@Table(tableOptions)
export class User extends Model<User>{
    // @ForeignKey(()=>List)
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true, field: 'uid' })
    public uid: number;

    @Column({ type: DataType.STRING(255), allowNull: false, unique: true, field: 'username' })
    public username: string;

    @Column({ type: DataType.INTEGER, allowNull: false, field: 'password' })
    public password: string;

    @Column({ type: DataType.INTEGER, allowNull: false, field: 'type' })
    public type: number;

    @Column({ type: DataType.STRING(255), allowNull: false, field: 'group' })
    public group: string;

    @Column({ type: DataType.STRING(255), allowNull: true, field: 'token' })
    public token: string;

    @Column({ type: DataType.STRING(255), allowNull: true, field: 'email' })
    public email: string;

    @Column({ type: DataType.BIGINT, allowNull: true, field: 'create_date' })
    public create_date :number 




}