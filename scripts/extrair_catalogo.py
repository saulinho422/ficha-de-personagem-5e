"""Extrai metadados e regras do PDF fornecido, sem dependência de rede.
Uso: python scripts/extrair_catalogo.py /caminho/livro.pdf
O PDF não é distribuído no repositório.
"""
import fitz, re, json, unicodedata, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def chave(s):
 return re.sub(r'[^a-z0-9]+','-',unicodedata.normalize('NFD',s).encode('ascii','ignore').decode().lower()).strip('-')
def linhas_colunas(doc,n,colunas=2):
 p=doc[n];w=p.rect.width;h=p.rect.height
 origens=[35.4,215.09,394.63] if colunas==3 else [35.4,310]
 grupos=[[] for _ in origens]
 for b in p.get_text('dict')['blocks']:
  for l in b.get('lines',[]):
   x,y,_,_=l['bbox'];s=''.join(z['text'] for z in l['spans']).replace('\uf0b7','•').strip()
   if not s or re.fullmatch(r'[–—−-]+',s) or re.fullmatch(r'\d+',s) or y<22 or y>h-22 or (colunas==3 and n==209 and y<200):continue
   i=min(range(colunas),key=lambda i:abs(x-origens[i]));grupos[i].append((y,s))
 for grupo in grupos:yield [s for _,s in sorted(grupo,key=lambda x:x[0])]
def extrair(doc):
 linhas=[]
 for n in range(215,291):
  for col in linhas_colunas(doc,n): linhas += [(x,n) for x in col]
 cab=[]
 for i,(s,n) in enumerate(linhas[:-1]):
  prox=linhas[i+1][0]
  if s==s.upper() and re.match(r'(?:[1-9][°ºo]?\s*nível|Truque de)',prox,re.I): cab.append(i)
 magias=[]
 for k,i in enumerate(cab):
  fim=cab[k+1] if k+1<len(cab) else len(linhas)
  parte=linhas[i:fim];nome=parte[0][0].title();texto='\n'.join(x for x,_ in parte[1:])
  escola=re.search(r'(?:nível de |Truque de )(\w+)',texto,re.I)
  def campo(inicio,fim):
   m=re.search(inicio+r'\s*:\s*(.*?)(?='+fim+r'|$)',texto,re.S|re.I);return re.sub(r'\s+',' ',m[1]).strip() if m else ''
  nivel=0 if texto.lower().startswith('truque') else int(re.match(r'\d',texto)[0])
  tempo=campo('Tempo de Conjuração','Alcance:');alcance=campo('Alcance','Componentes:');componentes=campo('Componentes','Duração:')
  m=re.search(r'Duração:\s*(.+)',texto);duracao=m[1] if m else ''
  # A duração pode quebrar de linha após "Concentração,".
  if duracao.rstrip().endswith(',') and m: duracao+=' '+texto[m.end():].lstrip().split('\n')[0]
  descricao=texto.split('Duração:',1)[-1];descricao=descricao.split('\n',1)[-1].strip()
  if duracao.startswith('Concentração,') and descricao.startswith('até '):descricao=descricao.split('\n',1)[-1]
  superior=re.search(r'Em Níveis Superiores\.(.*)',descricao,re.S)
  magias.append(dict(id='magia-'+chave(nome),nome=nome,nivel=nivel,escola=escola[1].lower() if escola else '',tempo=tempo,alcance=alcance,componentes=componentes,duracao=duracao,ritual='(ritual)' in parte[1][0].lower(),concentracao='concentração' in duracao.lower(),materialCusto=bool(re.search(r'\d[\d.,]*\s*p[opcl e]',componentes,re.I)),materialConsumido=bool(re.search(r'consum|gasta',componentes,re.I)),descricao=descricao,escalonamento=superior[1].strip() if superior else '',classes=[],referencia={'livro':'LDJ fornecido','pagina':parte[0][1]}))
 # Errata do próprio PDF: lista 209/211/214 identifica Falar com Plantas no 3º círculo.
 for magia in magias:
  if magia['id']=='magia-falar-com-plantas':
   magia.update(nivel=3,escola='transmutação',ritual=False)
   magia['errata']='PDF p.246 repete metadados de Falar com Animais; reconciliado com listas p.209/211/214 e SRD 5.1.'
 # Listas são três colunas; o estado de classe/círculo continua entre colunas/páginas.
 listas=[];classe=None;nivel=0;pendente=''
 for n in range(209,215):
  for col in linhas_colunas(doc,n,3):
   for s in col:
    m=re.fullmatch(r'MAGIAS DE (BARDO|BRUXO|CLÉRIGO|DRUIDA|FEITICEIRO|MAGO|PALADINO|PATRULHEIRO)',s)
    if m:classe=m[1].title();pendente='';continue
    if not classe:continue
    m=re.match(r'(?:TRUQUES|([1-9])[°º]? NÍVEL)',s)
    if m:nivel=int(m[1] or 0);pendente='';continue
    if '(' in s and ')' in s:
     nome=(pendente+' '+s.split('(')[0]).strip();listas.append((classe,nivel,nome,n));pendente=''
    elif s=='(ritual)':pendente=''
    else:pendente=(pendente+' '+s).strip()
 norm=lambda s:chave(s).replace('continua','continua').replace('magnifica','magnifica')
 lookup={norm(m['nome']):m for m in magias}
 aliases={'enfraquecer-o-intelecto':'enfraquecer-intelecto','banquete-dos-herois':'banquete-de-herois','infringir-ferimentos':'infligir-ferimentos','confusao-menor':'confusao','invocar-familiar':'convocar-familiar','protecao-contra-o-bem-e-o-mal':'protecao-contra-o-bem-e-mal','aura-de-vida':'aura-de-vida'}
 erros=[]
 for classe,nivel,nome,n in listas:
  id=aliases.get(norm(nome),norm(nome));m=lookup.get(id)
  if m and m['nivel']==nivel:
   if classe not in m['classes']:m['classes'].append(classe)
  else:erros.append([classe,nivel,nome,n])
 return magias,erros,listas
if __name__=='__main__':
 doc=fitz.open(sys.argv[1]);magias,erros,listas=extrair(doc)
 (ROOT/'dados').mkdir(exist_ok=True)
 for i in range(0,len(magias),70):
  dados=json.dumps(magias[i:i+70],ensure_ascii=False,indent=2)
  (ROOT/'dados'/f'magias-{i//70+1}.js').write_text('(function(r){const dados='+dados+'; if(typeof module!=="undefined"&&module.exports)module.exports=dados;else (r.ForjaMagias||(r.ForjaMagias=[])).push(...dados);})(globalThis);\n')
 (ROOT/'docs'/'conferencia-magias.json').write_text(json.dumps({'total':len(magias),'entradasListas':len(listas),'divergenciasExtracao':erros,'semLista':[m['nome'] for m in magias if not m['classes']]},ensure_ascii=False,indent=2))
 print(json.dumps({'total':len(magias),'listas':len(listas),'divergencias':erros,'semLista':[m['nome'] for m in magias if not m['classes']]},ensure_ascii=False))
