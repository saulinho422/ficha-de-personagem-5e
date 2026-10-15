import fitz,json,re,sys,subprocess
from pathlib import Path
from extrair_classes import bloco_linhas
from extrair_catalogo import chave
ROOT=Path(__file__).resolve().parents[1]
doc=fitz.open(sys.argv[1]);linhas=[x for n in range(167,173) for x in bloco_linhas(doc,n)]
cab=[i for i,(_,s,f,_) in enumerate(linhas) if s==s.upper() and any(c.isalpha() for c in s) and 10.8<=f<14 and len(s)>=3]
nomes=json.loads(subprocess.check_output(['node','-e',"console.log(JSON.stringify(Object.keys(require('./talentos_phb.js'))))"],cwd=ROOT).decode())
lookup={chave(x.split(' (')[0]):x for x in nomes}
lookup.update({'ator':'Ator (Actor)','mestre-de-escudo':'Mestre de Escudos (Shield Master)','maestria-em-armadura-pesada':'Maestria em Armadura Pesada (Heavy Armor Master)','mestre-de-armas-pesadas':'Maestria em Armadura Pesada (Heavy Armor Master)','combatente-montado':'Combatente Montado (Mounted Combatant)','maestria-em-armadura-media':'Maestria em Armadura Média (Medium Armor Master)'})
saida={};outros=[]
for j,i in enumerate(cab):
 nome=linhas[i][1];id=chave(nome);key=lookup.get(id);fim=cab[j+1] if j+1<len(cab) else len(linhas)
 if not key:outros.append(nome);continue
 texto='\n'.join(x[1] for x in linhas[i+1:fim]);pre=''
 if texto.startswith('Pré-requisito:'):
  l=texto.splitlines();pre=l.pop(0).split(':',1)[1].strip()
  while l and l[0] and l[0][0].islower():pre+=' '+l.pop(0)
  texto='\n'.join(l)
 english=key.split('(')[-1].rstrip(')');saida[key]={'id':chave(english),'preRequisitos':pre,'beneficios':texto,'referencia':{'livro':'LDJ fornecido','pagina':linhas[i][3]}}
print('Total',len(saida),'sem correspondencia',outros)
(ROOT/'talentos_phb.js').write_text('// Talentos do perfil 2014, com descrições conferidas no PDF fornecido.\nconst talentos = '+json.dumps(saida,ensure_ascii=False,indent=2)+';\nif(typeof module!=="undefined"&&module.exports)module.exports=talentos;\n')
