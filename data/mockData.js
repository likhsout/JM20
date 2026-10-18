// Live v1 state migrated — 18 Oct 2026 v7
export const settings = {
  schoolName: "Purbadhala Jagatmani Government Pilot High School",
  address: "Purbadhala, Netrakona",
  pdfBatchName: "JM 2K20 (SCIENCE)",
  monthlyAmount: 50,
  goal: 15000,
  collected: 1550,
  months: [
    {key:"m_mul7nkmy5bdkb7", en:"April", bn:"এপ্রিল"},
    {key:"m_mu8w9rguzskpc0", en:"May", bn:"মে"},
    {key:"m_mu8wanbhpoaw31", en:"June", bn:"জুন"},
    {key:"m_mu8wb5m4fom43e", en:"July", bn:"জুলাই"},
    {key:"m_mu8wbp6y1xjz8e", en:"August", bn:"আগস্ট"},
    {key:"m_mu8wc9859oje8k", en:"September", bn:"সেপ্টেম্বর"},
    {key:"m_mu8wd0qbk24j3l", en:"October", bn:"অক্টোবর"},
    {key:"m_mu8wdixhnbnqib", en:"November", bn:"নভেম্বর"},
    {key:"m_mu8we24a391jl5", en:"December", bn:"ডিসেম্বর"},
    {key:"m_mu8wek5pozd5q5", en:"January", bn:"জানুয়ারি"},
    {key:"m_mu8wf1ycj5k2n1", en:"February", bn:"ফেব্রুয়ারি"},
    {key:"m_mul7w4gzf4rj30", en:"March", bn:"মার্চ"},
  ],
  paymentMethods: [
    {type:"bKash", number:"01638820094", color:"#E2136E"},
    {type:"Nagad", number:"01638820094", color:"#F6921E"},
    {type:"Cash", number:"ROFY / SHUHADA", color:"#2D6A4F"},
    {type:"Rocket", number:"019943288692", color:"#8E3294"},
    {type:"Bank", number:"2411050645291", note:"DBBL — AFJAL HASAN, NETRAKONA", color:"#16233A"},
  ],
  notices: [{en:"MONTHLY  -  50 TAKA", date:"2026-10-17"}],
  admins: [
    {name:"ROFY", phone:"+880 1994-328869", wa:"8801994328869"},
    {name:"SHUHADA", phone:"+8801638820094", wa:"8801638820094"},
  ]
};

export const members = [
  {id:"mem_mul8awe319eum2", firstName:"Sayadush", lastName:"Shuhada", phones:["01638820094"], total:400, paid:8, status:"partial"},
  {id:"mem_mumph0yy9bpoqy", firstName:"Hasan", lastName:"Rofy", phones:["01994328869","01571580137"], total:600, paid:12, status:"full"},
  {id:"mem_mumq4khbavrwcw", firstName:"Mohammad", lastName:"Rahat", phones:["01960012929"], total:100, paid:2, status:"partial"},
  {id:"mem_mumq4...", firstName:"Tansen Thamid", lastName:"Siam", phones:["01997732503"], total:0, paid:0, status:"unpaid", rejected:1},
  {id:"mem_tanvir", firstName:"Tanvir", lastName:"Ahmed", phones:[], total:0, paid:0, status:"unpaid"},
  {id:"mem_rizwan", firstName:"MD Rizwan Sakline Khan Ratul", lastName:"", phones:["01976389630"], total:0, paid:0, status:"unpaid", rejected:1},
  {id:"mem_foysal", firstName:"Foysal", lastName:"Ahmed", phones:["01906739467"], total:0, paid:0, status:"unpaid"},
  {id:"mem_mvcfgpofdlikmb", firstName:"Abdullah Al", lastName:"Fahad", phones:["01876215132"], total:300, paid:6, status:"partial"},
  {id:"mem_mvdfu54n9jn04h", firstName:"Shuaib", lastName:"Tushib", phones:["01934359270"], total:100, paid:2, status:"partial"},
  {id:"mem_mvdjrpq87in688", firstName:"Raisul Islam", lastName:"Likhon", phones:["01756898630"], total:50, paid:1, status:"partial"},
];

export const transactions = [
  {id:"tx_mule958zq4hof2", name:"Sayadush Shuhada", months:"Apr–Jul", amount:200, method:"Cash", txnId:"ROFY", status:"approved", date:"28 Sep", receipt:"R-Q4HOF2", by:"ROFY"},
  {id:"tx_mumpnnhkljke05", name:"Hasan Rofy", months:"Apr–Mar (12)", amount:600, method:"Cash", txnId:"ROFY", status:"approved", date:"29 Sep", receipt:"R-LJKE05", by:"ROFY"},
  {id:"tx_mumq4khg6d054q", name:"Mohammad Rahat", months:"Apr–May", amount:100, method:"bKash", txnId:"DIT84TPYVU", status:"approved", date:"29 Sep", receipt:"R-6D054Q", by:"SHUHADA"},
  {id:"tx_muvspm50d0l3lp", name:"Tansen Thamid Siam", months:"Apr", amount:50, method:"Cash", txnId:"ROFY", status:"rejected", date:"05 Oct", receipt:"—"},
  {id:"tx_muzpsrbsbld322", name:"MD Rizwan", months:"Apr", amount:50, method:"Cash", txnId:"SHUHADA", status:"rejected", date:"08 Oct", receipt:"—"},
  {id:"tx_mvcdgrxzpb02pj", name:"Sayadush Shuhada", months:"Aug–Nov", amount:200, method:"Rocket", txnId:"7063210135", status:"approved", date:"17 Oct", receipt:"R-PB02PJ", by:"Rofy"},
  {id:"tx_mvcfgpogkywqnr", name:"Abdullah Al Fahad", months:"Apr", amount:50, method:"bKash", txnId:"DJH55G509F", status:"approved", date:"17 Oct", receipt:"R-KYWQNR", by:"Shuhada"},
  {id:"tx_mvcfn7fzsqxk8g", name:"Abdullah Al Fahad", months:"May–Sep", amount:250, method:"bKash", txnId:"DJH95GGKJ3", status:"approved", date:"17 Oct", receipt:"R-SQXK8G", by:"Shuhada"},
  {id:"tx_mvdfu54odzo8c1", name:"Shuaib Tushib", months:"Apr–May", amount:100, method:"bKash", txnId:"DJI96H03N5", status:"approved", date:"18 Oct", receipt:"R-DZO8C1", by:"Shuhada"},
  {id:"tx_mvdjrpq83q843v", name:"Raisul Islam Likhon", months:"Apr", amount:50, method:"Nagad", txnId:"765TWAEY", status:"approved", date:"18 Oct", receipt:"R-3Q843V", by:"Shuhada"},
];
