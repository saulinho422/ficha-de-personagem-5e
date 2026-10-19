const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const raiz=path.resolve(__dirname,'..');
const R=require('../js/regras.js'),F=require('../js/campanha.js'),E=require('../js/estado.js');
const banco=vm.runInNewContext(fs.readFileSync(path.join(raiz,'banco_phb.js'),'utf8')+';bancoDnD;');
require('../js/catalogo.js').preparar(banco,require('../dados/opcoes.js'),require('../dados/classes.js'),require('../dados/aventura.js'));
const magias=fs.readdirSync(path.join(raiz,'dados')).filter(x=>/^magias-\d+\.js$/.test(x)).flatMap(x=>require('../dados/'+x));
function ficha(over={}){return {schemaVersion:3,ruleset:'ldj-2014-patrulheiro-revisado',nome:'Lia',nivel:1,raca:'Elfo',subraca:'Elfo da Floresta',classe:'Mago',subclasse:'',alinhamento:'Neutro e Bom',antecedente:'Sábio',atributos:{for:8,des:14,con:13,int:15,sab:10,car:12},tracos:[],progressosResolvidos:[],periciasClasse:['Arcanismo','Investigação'],periciasManuais:{},especializacoes:[],proficienciasAdicionais:[],percepcaoSituacao:'normal',inventario:[],ataques:[],recursos:{pvAtual:null,pvTemporarios:0},equipamento:{armadura:null,escudo:null},detalhes:F.novo(),tracosAutomaticosExpandidos:[],fichaGerada:true,...over};}
class Storage{constructor(dados={}){this.dados=new Map(Object.entries(dados));this.falhar=null;}getItem(k){return this.dados.has(k)?this.dados.get(k):null;}setItem(k,v){if(this.falhar?.(k,v))throw Error('QuotaExceededError');this.dados.set(k,String(v));}removeItem(k){this.dados.delete(k);}}
async function interfaceFicha(estado){const {JSDOM,VirtualConsole}=require('jsdom');const erros=[];const vc=new VirtualConsole();vc.on('jsdomError',e=>erros.push(e));const dom=new JSDOM(fs.readFileSync(path.join(raiz,'index.html'),'utf8'),{url:'http://localhost/',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc});const w=dom.window;w.CSS={escape:s=>String(s).replace(/[^a-zA-Z0-9_-]/g,x=>'\\'+x)};w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};w.URL.createObjectURL=()=> 'blob:test';w.URL.revokeObjectURL=()=>{};
 if(estado)w.localStorage.setItem(E.CHAVE,JSON.stringify(estado));
 for(const script of [...w.document.querySelectorAll('script[src]')])vm.runInContext(fs.readFileSync(path.join(raiz,script.getAttribute('src').split('?')[0]),'utf8'),dom.getInternalVMContext(),{filename:script.getAttribute('src')});
 await new Promise(resolve=>w.addEventListener('load',resolve,{once:true}));
 return {dom,w,erros,eval:codigo=>w.eval(codigo),fechar:()=>dom.window.close()};}
module.exports={raiz,R,F,E,banco,magias,ficha,Storage,interfaceFicha};
