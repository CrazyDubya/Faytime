const {JSDOM,VirtualConsole}=await import(process.env.FAYTIME_JSDOM_MODULE??'jsdom');
import fs from 'node:fs';
import assert from 'node:assert/strict';
const sourcePath=process.env.FAYTIME_SOURCE??new URL('../index.html',import.meta.url);
const source=fs.readFileSync(sourcePath,'utf8');
const cases=[
 {name:'holiday-after-close',iso:'2025-12-24T21:30:00Z',minutes:2460,includes:'Opens in 2 days'},
 {name:'holiday-status-unchanged',iso:'2025-12-25T15:00:00Z',holiday:true},
 {name:'open-positive',iso:'2025-12-26T15:00:00Z',open:true,minutes:360},
 {name:'ordinary-nextday',iso:'2025-12-22T21:30:00Z',minutes:1020,includes:'Opens in 17h 0m'},
 {name:'friday-weekend',iso:'2025-12-19T21:30:00Z',minutes:3900,includes:'Opens in 3 days'},
 {name:'weekend-monday-holiday',iso:'2025-01-18T15:00:00Z',minutes:4320,includes:'Weekend - Opens in 3 days'},
 {name:'year-roll-own-table',iso:'2024-12-31T21:30:00Z',minutes:2460,includes:'Opens in 2 days'},
 {name:'before-open',iso:'2025-12-22T13:30:00Z',minutes:60,includes:'Opens in 1h 0m'},
 {name:'lunch-unchanged',iso:'2025-12-22T03:00:00Z',symbol:'TSE',lunch:true},
];
const results=[];
for(const fixture of cases){
 let attempts=0;const vc=new VirtualConsole();const errors=[];vc.on('jsdomError',e=>errors.push(e.message));
 const dom=new JSDOM(source,{url:'https://local.invalid/',runScripts:'dangerously',virtualConsole:vc,beforeParse(w){
  const Native=w.Date;w.Date=class extends Native{constructor(...args){super(...(args.length?args:[fixture.iso]))}static now(){return new Native(fixture.iso).valueOf()}};
  w.fetch=()=>{attempts++;return Promise.reject(Error('Blocked synthetic background lookup'))};w.setInterval=()=>0;w.setTimeout=()=>0;
 }});
 try{
  await new Promise(r=>setImmediate(r));dom.window.updateMarkets();const symbol=fixture.symbol??'NYSE';
  const status=dom.window.eval(`getMarketStatus(markets.find(m=>m.symbol===${JSON.stringify(symbol)}))`);
  const card=[...dom.window.document.querySelectorAll('.market-card')].find(n=>n.textContent.includes(symbol));assert(card,'Actual market card exists');
  const text=card.textContent.replace(/\s+/g,' ').trim();let failure=null;
  try{
   if(fixture.minutes!==undefined)assert.equal(status.minutesUntil,fixture.minutes);
   if(fixture.includes)assert(text.includes(fixture.includes),text);
   if(fixture.open)assert.equal(status.isOpen,true);
   if(fixture.holiday)assert.equal(status.isHoliday,true);
   if(fixture.lunch)assert.equal(status.isLunchBreak,true);
  }catch(e){failure=e.message;}
  results.push({name:fixture.name,iso:fixture.iso,symbol,status,card:text,blocked_background_fetches:attempts,failure,script_errors:errors});
 }finally{dom.window.close()}
}
console.log(JSON.stringify({source:String(sourcePath),passed:results.filter(x=>!x.failure).length,total:results.length,results},null,2));
process.exitCode=results.some(x=>x.failure)?1:0;
