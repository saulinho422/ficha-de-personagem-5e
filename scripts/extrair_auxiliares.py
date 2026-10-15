import fitz,json,re,sys
from pathlib import Path
from extrair_catalogo import chave,linhas_colunas
ROOT=Path(__file__).resolve().parents[1];doc=fitz.open(sys.argv[1]);nomes=['Acólito','Artesão de Guilda','Artista','Charlatão','Criminoso','Eremita','Forasteiro','Herói do Povo','Marinheiro','Nobre','Órfão','Sábio','Soldado'];norm={chave(x):('Artesão da Guilda' if x=='Artesão de Guilda' else x) for x in nomes};bg={x:{'tracos':[],'ideais':[],'vinculos':[],'defeitos':[],'equipamento':''} for x in norm.values()};atual=None;grupo=None;numero=None;buffer=[]
def guardar():
 global buffer
 if atual and grupo and numero is not None and buffer:bg[atual][grupo].append(' '.join(buffer))
 buffer=[]
for n in range(129,144):
 linhas=[x.strip() for x in doc[n].get_text().splitlines() if x.strip()]
 for i,s in enumerate(linhas):
  if chave(s) in norm and s==s.upper():guardar();atual=norm[chave(s)];grupo=None;numero=None
  if not atual:continue
  if s.startswith('Equipamento:'):
   pedacos=[s.split(':',1)[1]]
   for prox in linhas[i+1:]:
    if prox==prox.upper() and len(prox)>4:break
    pedacos.append(prox)
   bg[atual]['equipamento']=' '.join(pedacos)
  rotulos={'Traço de Personalidade':'tracos','Ideal':'ideais','Vínculo':'vinculos','Defeito':'defeitos'}
  candidato=next((v for k,v in rotulos.items() if s==k or re.fullmatch(r'd[68]\s+'+k,s)),None)
  if candidato:guardar();grupo=candidato;numero=None;continue
  if re.fullmatch(r'd\d+',s):guardar();grupo=None;numero=None;continue
  if grupo:
   if re.fullmatch(r'[1-8]',s):guardar();numero=int(s);continue
   if re.fullmatch(r'\d+',s):continue
   if s==s.upper() and len(s)>4:guardar();grupo=None;numero=None;continue
   if numero:buffer.append(s)
guardar()
criaturas=[];linhas=[]
for n in range(305,313):
 for col in linhas_colunas(doc,n):linhas += [(s,n) for s in col]
cab=[i for i,(s,n)in enumerate(linhas[:-1])if s==s.upper() and len(s)>2 and re.match(r'(Besta|Celestial|Corruptor|Constructo|Dragão|Elemental|Fada|Humanoide|Monstruosidade|Morto-vivo)',linhas[i+1][0],re.I)]
for j,i in enumerate(cab):
 fim=cab[j+1]if j+1<len(cab)else len(linhas);nome=linhas[i][0].title();texto='\n'.join(s for s,_ in linhas[i+1:fim]);nd=re.search(r'Nível de Desafio\s+(\d+(?:/\d+)?)',texto);ca=re.search(r'Classe de Armadura\s+(\d+)',texto);pv=re.search(r'Pontos de Vida\s+(\d+)',texto);des=re.search(r'Deslocamento\s+([^\n]+)',texto)
 if not all([nd,ca,pv,des]):continue
 valor=nd[1];val=float(valor)if'/'not in valor else int(valor.split('/')[0])/int(valor.split('/')[1]);criaturas.append({'id':'criatura-'+chave(nome),'nome':nome,'tipo':texto.splitlines()[0],'nd':val,'ca':int(ca[1]),'pv':int(pv[1]),'deslocamento':des[1],'voo':'voo' in des[1],'natacao':'natação' in des[1],'descricao':texto,'referencia':{'livro':'LDJ fornecido','pagina':linhas[i][1]}})
(ROOT/'dados/auxiliares.js').write_text('(function(r){const dados='+json.dumps({'antecedentes':bg,'criaturas':criaturas},ensure_ascii=False,indent=2)+';if(typeof module!=="undefined"&&module.exports)module.exports=dados;else r.ForjaAuxiliares=dados;})(globalThis);\n')
print(json.dumps({'tabelas':{x:{k:len(v)for k,v in d.items()if isinstance(v,list)}for x,d in bg.items()},'criaturas':len(criaturas)},ensure_ascii=False))
