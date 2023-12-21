import china from '@/views/screen/json/中华人民共和国.json';
import beiJing from '@/views/screen/json/北京市.json';
import tianJin from '@/views/screen/json/天津市.json';
import shangHai from '@/views/screen/json/上海市.json';
import chongQing from '@/views/screen/json/重庆市.json';
import heBei from '@/views/screen/json/河北省.json';
import heNan from '@/views/screen/json/河南省.json';
import yunNan from '@/views/screen/json/云南省.json';
import liaoNing from '@/views/screen/json/辽宁省.json';
import heiLongJiang from '@/views/screen/json/黑龙江省.json';
import huNan from '@/views/screen/json/湖南省.json';
import anHui from '@/views/screen/json/安徽省.json';
import shanDong from '@/views/screen/json/山东省.json';
import jiangSu from '@/views/screen/json/江苏省.json';
import zheJiang from '@/views/screen/json/浙江省.json';
import jiangXi from '@/views/screen/json/江西省.json';
import huBei from '@/views/screen/json/湖北省.json';
import ganSu from '@/views/screen/json/甘肃省.json';
import shanXi from '@/views/screen/json/山西省.json';
import shanXi1 from '@/views/screen/json/陕西省.json';
import jiLin from '@/views/screen/json/吉林省.json';
import fuJian from '@/views/screen/json/福建省.json';
import guiZhou from '@/views/screen/json/贵州省.json';
import guangDong from '@/views/screen/json/广东省.json';
import qingHai from '@/views/screen/json/青海省.json';
import siChuan from '@/views/screen/json/四川省.json';
import haiNan from '@/views/screen/json/海南省.json';
import taiWan from '@/views/screen/json/台湾省.json';
import xinJiang from '@/views/screen/json/新疆维吾尔自治区.json';
import xiZang from '@/views/screen/json/西藏自治区.json';
import neiMengGu from '@/views/screen/json/内蒙古自治区.json';
import ningXia from '@/views/screen/json/宁夏回族自治区.json';
import guangXi from '@/views/screen/json/广西壮族自治区.json';
import xiangGang from '@/views/screen/json/香港特别行政区.json';
import aoMeng from '@/views/screen/json/澳门特别行政区.json';

export const dataList = ref<Record<string, string | number>[]>([
    { name: '中华人民共和国', code: 100000, json: china },
    { name: '北京市', code: 110000, json: beiJing },
    { name: '天津市', code: 120000, json: tianJin },
    { name: '上海市', code: 310000, json: shangHai },
    { name: '重庆市', code: 500000, json: chongQing },
    { name: '河北省', code: 130000, json: heBei },
    { name: '河南省', code: 410000, json: heNan },
    { name: '云南省', code: 530000, json: yunNan },
    { name: '辽宁省', code: 210000, json: liaoNing },
    { name: '黑龙江省', code: 230000, json: heiLongJiang },
    { name: '湖南省', code: 430000, json: huNan },
    { name: '安徽省', code: 340000, json: anHui },
    { name: '山东省', code: 370000, json: shanDong },
    { name: '江苏省', code: 320000, json: jiangSu },
    { name: '浙江省', code: 330000, json: zheJiang },
    { name: '江西省', code: 360000, json: jiangXi },
    { name: '湖北省', code: 420000, json: huBei },
    { name: '甘肃省', code: 620000, json: ganSu },
    { name: '山西省', code: 140000, json: shanXi },
    { name: '陕西省', code: 610000, json: shanXi1 },
    { name: '吉林省', code: 220000, json: jiLin },
    { name: '福建省', code: 350000, json: fuJian },
    { name: '贵州省', code: 520000, json: guiZhou },
    { name: '广东省', code: 440000, json: guangDong },
    { name: '青海省', code: 630000, json: qingHai },
    { name: '四川省', code: 510000, json: siChuan },
    { name: '海南省', code: 460000, json: haiNan },
    { name: '台湾省', code: 710000, json: taiWan },
    { name: '新疆维吾尔自治区', code: 650000, json: xinJiang },
    { name: '西藏自治区', code: 540000, json: xiZang },
    { name: '内蒙古自治区', code: 150000, json: neiMengGu },
    { name: '宁夏回族自治区', code: 640000, json: ningXia },
    { name: '广西壮族自治区', code: 450000, json: guangXi },
    { name: '香港特别行政区', code: 810000, json: xiangGang },
    { name: '澳门特别行政区', code: 820000, json: aoMeng },
]);
