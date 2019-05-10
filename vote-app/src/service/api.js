import * as AI from './http';
export const login = (data, vm) => AI.post("/share_vote/login", data, vm);
export const listUser = (vm) => AI.get("/share_vote/user/find", {}, vm);
export const addUser = (data, vm) => AI.post("/share_vote/user", data, vm);
export const deleteUser = (id, vm) => AI.deletes(`/share_vote/user/${id}`, {}, vm);
export const updateUser = (id, data, vm) => AI.patch(`/share_vote/user/${id}`, data, vm);
export const updatePassword = (id, data, vm) => AI.patch(`/share_vote/user/psd/${id}`, data, vm);

export const listPhase = (vm) => AI.get("/share_vote/phase", {}, vm);
export const listUserPhase = (id,vm) => AI.get(`/share_vote/list/user/${id}`, {}, vm);
export const addPhase = (data, vm) => AI.post("/share_vote/phase/multiCreate", data, vm);
export const deletePhase = (id, vm) => AI.deletes(`/share_vote/phase/${id}`, {}, vm);

export const listSubject = (data, vm) => AI.post("/share_vote/subject/find", data, vm);
export const addSubject = (data, vm) => AI.post("/share_vote/subject", data, vm);
export const deleteSubject = (id, vm) => AI.deletes(`/share_vote/subject/${id}`, {}, vm);
export const updateSubject = (data, vm) => AI.patch(`/share_vote/subject/${data.sid}`,data, vm);

export const addVote = (data, vm) => AI.post("/share_vote/vote", data, vm);









