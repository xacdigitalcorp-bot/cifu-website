export const STORAGE_KEY='cifu.records.v1';
export const emptyState=()=>({version:1,lamps:[],fortunes:[]});
export const utcDay=(date=new Date())=>date.toISOString().slice(0,10);
export const utcYear=(date=new Date())=>date.getUTCFullYear();
const textLength=s=>[...s].length;
function cleanText(value,label,min,max){
 if(typeof value!=='string')throw Error(`${label}格式不正確`);
 const result=value.trim();
 if(textLength(result)<min||textLength(result)>max||/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(result))throw Error(`${label}請填寫 ${min}–${max} 字`);
 return result;
}
export function validateState(value){
 const fail=()=>{throw Error('紀錄或備份格式不正確，請保留原檔並重新確認');};
 if(!value||value.version!==1||!Array.isArray(value.lamps)||!Array.isArray(value.fortunes)||value.lamps.length>1000||value.fortunes.length>20000)fail();
 const years=new Set(),days=new Set();
 const validTime=time=>typeof time==='string'&&Number.isFinite(Date.parse(time))&&new Date(time).toISOString()===time;
 const lamps=value.lamps.map(l=>{
  if(!l||!Number.isInteger(l.year)||l.year<2000||l.year>9999||years.has(l.year)||!Number.isInteger(l.slot)||l.slot<7||l.slot>100||!validTime(l.time)||utcYear(new Date(l.time))!==l.year)fail();
  years.add(l.year);
  try{return {year:l.year,slot:l.slot,name:cleanText(l.name,'稱呼',1,20),wish:cleanText(l.wish,'願望',1,200),time:l.time};}catch{fail();}
 });
 const fortunes=value.fortunes.map(f=>{
  if(!f||!validTime(f.time)||f.day!==utcDay(new Date(f.time))||days.has(f.day)||!Number.isInteger(f.index)||f.index<0||f.index>=12||(f.opened!==undefined&&typeof f.opened!=='boolean'))fail();
  days.add(f.day);
  try{return {day:f.day,index:f.index,name:cleanText(f.name,'稱呼',0,20),time:f.time,opened:f.opened??true};}catch{fail();}
 });
 return {version:1,lamps,fortunes};
}
export function loadState(storage){
 try{const raw=storage.getItem(STORAGE_KEY);return {state:raw===null?emptyState():validateState(JSON.parse(raw)),error:null};}
 catch{return {state:emptyState(),error:'暫時無法讀取參拜紀錄。可能是瀏覽器限制或紀錄損壞；原紀錄尚未覆寫。您仍可閱讀本站。'};}
}
export function saveState(storage,state){
 try{const checked=validateState(state);storage.setItem(STORAGE_KEY,JSON.stringify(checked));return {ok:true,error:null};}
 catch{return {ok:false,error:'瀏覽器無法保存紀錄，可能已停用儲存或空間不足。此次操作尚未完成，請保留輸入並調整瀏覽器設定後再試。'};}
}
export const lampForYear=(state,date=new Date())=>state.lamps.find(l=>l.year===utcYear(date))??null;
export const fortuneForDay=(state,date=new Date())=>state.fortunes.find(f=>f.day===utcDay(date))??null;
export function lightLamp(state,input,date=new Date()){
 if(!Number.isInteger(input.slot)||input.slot<7||input.slot>100)throw Error('此燈位無法敬獻，請選擇第 7–100 號空燈位');
 if(lampForYear(state,date))throw Error('您今年已敬獻慈光燈，請回看您的燈位');
 const lamp={year:utcYear(date),slot:input.slot,name:cleanText(input.name,'稱呼',1,20),wish:cleanText(input.wish,'願望',1,200),time:date.toISOString()};
 return validateState({...state,lamps:[...state.lamps,lamp]});
}
export function drawFortune(state,date=new Date(),index=0,name=''){
 if(fortuneForDay(state,date))return state;
 if(!Number.isInteger(index)||index<0||index>=12)throw Error('籤號不正確');
 const fortune={day:utcDay(date),index,name:cleanText(name,'稱呼',0,20),time:date.toISOString(),opened:false};
 return validateState({...state,fortunes:[...state.fortunes,fortune]});
}
export function openFortune(state,day=utcDay()){
 if(!state.fortunes.some(f=>f.day===day))throw Error('尚未取得這一天的慈籤');
 return validateState({...state,fortunes:state.fortunes.map(f=>f.day===day?{...f,opened:true}:f)});
}
