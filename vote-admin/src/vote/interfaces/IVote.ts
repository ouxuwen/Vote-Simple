export interface IVote {
    readonly vid: number;
    readonly pid: number;
    readonly uid: number;
    readonly sid: number;
    readonly comment: string;
    readonly author_id: number;
    readonly create_date: number;
}