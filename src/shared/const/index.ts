import { BsMusicNoteBeamed } from "react-icons/bs";
import { CgTikcode } from "react-icons/cg";
import { SiApplemusic, SiCircle } from "react-icons/si";

export const apiLink = 'http://localhost:4000';

export const personalMenu = [
  {
    key: "tong_quan",
    value: "TỔNG QUAN"
  },
  {
    key: "bai_hat",
    value: "BÀI HÁT"
  },
  {
    key: "play_list",
    value: "PLAYLIST"
  }
]

export const sidebarList = [
  {
    href: '/',
    name: 'Home',
    icon: null
  },
  {
    href: '/my-music',
    name: 'Cá Nhân',
    icon: SiApplemusic
  },
  {
    href: '/kham-pha',
    name: 'Khám Phá',
    icon: SiCircle
  },
  {
    href: '/moi-phat-hanh',
    name: 'Nhạc mới',
    icon: BsMusicNoteBeamed
  },
  {
    href: '/category',
    name: 'Thể loại',
    icon: CgTikcode
  }
]