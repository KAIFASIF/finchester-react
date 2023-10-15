import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const authAtom = atom<any>({
  key: 'auth',
  default: null,
  effects_UNSTABLE: [persistAtom],
});



