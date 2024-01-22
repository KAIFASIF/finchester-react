import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface AuthState {
  isLoggedin: boolean;
  user: string | null;
  partnerId: string | null;
  role: string | null;
  partnerName: string | null;
}

export const authAtom = atom<any>({
  key: 'auth',
  default: "kaif",
  effects_UNSTABLE: [persistAtom],
});



