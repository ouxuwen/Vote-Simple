export interface IUser {
    readonly uid: number;
    readonly username: string;
    readonly password: string;
    readonly type: number;
    readonly email: string;
    readonly token: string;
    readonly group: string;
    readonly create_date: number;
}