import { Sequelize } from 'sequelize-typescript';
import { User } from '../user/user.entity';
import { Subject } from '../subject/subject.entity';
import { Phase } from '../phase/phase.entity';
import { Vote } from '../vote/vote.entity';
import { List } from '../list/list.entity';

//数据库配置
export const databaseProviders = [
    {
        provide: 'SequelizeInstance',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: '127.0.0.1',
                port: 3306,
                username: 'root',
                password: '123456',
                database: 'votes',
            });
            sequelize.addModels([User, Subject, Vote, List, Phase]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
