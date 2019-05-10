export interface ISubject {
    readonly sid: number;
    readonly lid: number;
    readonly uid: number;
    readonly pid: number;
    readonly subject: string;
    readonly introduction: string;
    readonly status: number;
    readonly create_date: number;
}