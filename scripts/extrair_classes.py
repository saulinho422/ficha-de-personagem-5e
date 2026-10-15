"""Catálogo de progressões e descrições, extraído do PDF e níveis conferidos nas tabelas."""
import fitz,json,re,sys,unicodedata
from pathlib import Path
from extrair_catalogo import chave
ROOT=Path(__file__).resolve().parents[1]
# nível:nome (o calendário de incrementos é calculado separadamente).
MAPAS={
'Bárbaro':'1:Fúria|1:Defesa sem Armadura|2:Ataque Descuidado|2:Sentido de Perigo|3:Caminho Primitivo|5:Ataque Extra|5:Movimento Rápido|7:Instinto Selvagem|9:Crítico Brutal|11:Fúria Implacável|15:Fúria Persistente|18:Força Indomável|20:Campeão Primitivo',
'Bardo':'1:Conjuração|1:Inspiração de Bardo|2:Versatilidade|2:Canção de Descanso|3:Colégio de Bardo|3:Especialização|5:Fonte de Inspiração|6:Canção de Proteção|10:Segredos Mágicos|20:Inspiração Superior',
'Bruxo':'1:Patrono Transcendental|1:Magia de Pacto|2:Invocações Místicas|3:Dádiva do Pacto|11:Arcano Místico|20:Mestre Místico',
'Clérigo':'1:Conjuração|1:Domínio Divino|2:Canalizar Divindade|5:Destruir Mortos-Vivos|10:Intervenção Divina',
'Druida':'1:Druídico|1:Conjuração|2:Forma Selvagem|2:Círculo Druídico|18:Corpo Atemporal|18:Magias da Besta|20:Arquidruida',
'Feiticeiro':'1:Conjuração|1:Origem de Feitiçaria|2:Fonte de Magia|3:Metamagia|20:Restauração Mística',
'Guerreiro':'1:Estilo de Luta|1:Retomar o Fôlego|2:Surto de Ação|3:Arquétipo Marcial|5:Ataque Extra|9:Indomável',
'Ladino':'1:Especialização|1:Ataque Furtivo|1:Gíria de Ladrão|2:Ação Ardilosa|3:Arquétipo de Ladino|5:Esquiva Sobrenatural|7:Evasão|11:Talento Confiável|14:Sentido Cego|15:Mente Escorregadia|18:Elusivo|20:Golpe de Sorte',
'Mago':'1:Conjuração|1:Recuperação Arcana|2:Tradição Arcana|18:Dominar Magia|20:Assinatura Mágica',
'Monge':'1:Defesa sem Armadura|1:Artes Marciais|2:Chi|2:Movimento sem Armadura|3:Tradição Monástica|3:Defletir Projéteis|4:Queda Lenta|5:Ataque Extra|5:Ataque Atordoante|6:Golpes de Chi|7:Evasão|7:Mente Tranquila|10:Pureza Corporal|13:Idiomas do Sol e da Lua|14:Alma de Diamante|15:Corpo Atemporal|18:Corpo Vazio|20:Autoaperfeiçoamento',
'Paladino':'1:Sentido Divino|1:Cura pelas Mãos|2:Estilo de Luta|2:Conjuração|2:Destruição Divina|3:Saúde Divina|3:Juramento Sagrado|5:Ataque Extra|6:Aura de Proteção|10:Aura de Coragem|11:Destruição Divina Aprimorada|14:Toque Purificador',
'Patrulheiro':'1:Inimigo Favorito|1:Explorador Natural|2:Estilo de Luta|2:Conjuração|3:Conclave de Patrulheiro|3:Consciência Primitiva|6:Inimigo Favorito Maior|8:Pés Rápidos|10:Mimetismo|14:Desaparecer|18:Sentidos Selvagens|20:Matador de Inimigos'
}
PAGINAS={'Bárbaro':(46,50),'Bardo':(51,55),'Bruxo':(56,62),'Clérigo':(63,70),'Druida':(71,76),'Feiticeiro':(77,82),'Guerreiro':(83,88),'Ladino':(89,93),'Mago':(94,101),'Monge':(102,107),'Paladino':(108,114),'Patrulheiro':(115,121)}
# Palavras no arquivo antigo diferem da tradução do PDF.
ALIASES={'especializacao':['especializacao','aptidao'],'arcano-mistico':['arcana-mistica','arcano-mistico'],'metamagia':['metamagica','metamagia'],'autoaperfeicoamento':['auto-aperfeicoamento','autoaperfeicoamento'],'versatilidade':['jack-of-all-trades','generalista','versatilidade'],'inspiracao-de-bardo':['inspiracao-de-bardo','inspiracao-bardica'],'chi':['chi','ki'],'golpes-de-chi':['golpes-de-chi','golpes-de-ki'],'defletir-projeteis':['defletir-projeteis','desviar-projeteis']}
def bloco_linhas(doc,n):
 p=doc[n];grupos=[[],[]]
 for b in p.get_text('dict')['blocks']:
  for l in b.get('lines',[]):
   x,y,_,_=l['bbox'];s=''.join(z['text'] for z in l['spans']).strip();f=max(z['size'] for z in l['spans'])
   if s and not re.fullmatch(r'\d+',s) and 25<y<p.rect.height-25:grupos[int(x>275)].append((y,s,f,n))
 return [a for g in grupos for a in sorted(g)]
def dados(doc,banco):
 saida={};extra=[]
 for classe,(ini,fim) in PAGINAS.items():
  linhas=[x for n in range(ini,fim+1) for x in bloco_linhas(doc,n)]
  cab=[i for i,(_,s,f,_) in enumerate(linhas) if s==s.upper() and any(c.isalpha() for c in s) and f>=10.8]
  blocos=[]
  for j,i in enumerate(cab):
   nome=linhas[i][1].title();texto='\n'.join(x[1] for x in linhas[i+1:cab[j+1] if j+1<len(cab) else len(linhas)])
   blocos.append({'nome':nome,'descricao':texto,'pagina':linhas[i][3],'tamanho':linhas[i][2]})
  # Reconstrói um cabeçalho de duas linhas no conclave revisado.
  for i,b in enumerate(blocos[:-1]):
   if chave(b['nome'])=='conclave-do-rastreador' and chave(blocos[i+1]['nome'])=='subterraneo':
    b['nome']='Conclave do Rastreador Subterrâneo';b['descricao']=blocos[i+1]['descricao'];blocos[i+1]['nome']='(continuação)'
  subclasses=banco['classes'][classe]['subclasses']
  if classe=='Patrulheiro':subclasses=['Conclave da Besta','Conclave do Caçador','Conclave do Rastreador Subterrâneo']
  estado={'id':'classe-'+chave(classe),'nome':classe,'pagina':ini,'caracteristicas':[],'subclasses':{s:[] for s in subclasses}}
  for declaracao in MAPAS[classe].split('|'):
   nivel,nome=declaracao.split(':',1);id=chave(nome);possiveis=ALIASES.get(id,[id])
   candidatos=[b for b in blocos if chave(b['nome']) in possiveis]
   b=next((b for b in candidatos if b['descricao']),candidatos[0] if candidatos else {'descricao':'','pagina':ini})
   estado['caracteristicas'].append({'id':estado['id']+'-'+id,'nome':nome,'nivel':int(nivel),'descricao':b['descricao'],'referencia':{'livro':'LDJ fornecido','pagina':b['pagina']}})
  atual=None;em_invocacoes=False
  for b in blocos:
   if b['tamanho']>=13:
    atual=None
    if classe=='Bruxo' and chave(b['nome'])=='invocacoes-misticas':em_invocacoes=True
   for s in subclasses:
    if chave(s)==chave(b['nome']):atual=s;break
   else:
    if atual and 10.8<=b['tamanho']<11.8 and b['descricao']:
     m=re.search(r'(?:[Nn][oãa]o?\s+|[Nn][oíi]vel\s+|alcança o\s+|atinge o\s+|partir do\s+|no\s+)(\d{1,2})\s*[°ºo]?(?:\s*nível)?',b['descricao'][:650])
     nivel=int(m[1]) if m and int(m[1])<=20 else (1 if classe in ['Clérigo','Bruxo','Feiticeiro'] else 2 if classe in ['Mago','Druida'] else 3)
     if chave(b['nome'])=='conjuracao' and classe in ['Guerreiro','Ladino']:nivel=3
     if chave(b['nome'])=='formas-de-circulo':nivel=2
     if chave(b['nome'])=='protecao-natural':nivel=10
     # Cabeçalhos de tabelas e detalhamento de conjuração não são características novas.
     if chave(b['nome']) in ['magias-conhecidas-de-1-nivel-e-superiores','espacos-de-magia','truques','habilidade-de-conjuracao','aprendendo-magias-de-1-nivel-ou-superior','lista-de-magia-expandida']:continue
     estado['subclasses'][atual].append({'id':'subclasse-'+chave(atual)+'-'+chave(b['nome']),'nome':b['nome'],'nivel':nivel,'descricao':b['descricao'],'referencia':{'livro':'LDJ fornecido','pagina':b['pagina']}})
   if classe=='Bruxo' and em_invocacoes and 10.8<=b['tamanho']<11.8 and b['descricao']:
    extra.append({'id':'invocacao-'+chave(b['nome']),**b})
  saida[classe]=estado
 return saida,extra
if __name__=='__main__':
 doc=fitz.open(sys.argv[1]);import subprocess
 banco=json.loads(subprocess.check_output(['node','-e',"const fs=require('fs'),vm=require('vm');console.log(JSON.stringify(vm.runInNewContext(fs.readFileSync('banco_phb.js','utf8')+';bancoDnD')));"],cwd=ROOT).decode());classes,invocacoes=dados(doc,banco)
 (ROOT/'dados/classes.js').write_text('(function(r){const dados='+json.dumps({'classes':classes,'invocacoes':invocacoes},ensure_ascii=False,indent=2)+';if(typeof module!=="undefined"&&module.exports)module.exports=dados;else r.ForjaClasses=dados;})(globalThis);\n')
 print(json.dumps({c:{'core':len(v['caracteristicas']),'semDescricao':[x['nome'] for x in v['caracteristicas'] if not x['descricao']],'subclasses':{k:len(x) for k,x in v['subclasses'].items()}} for c,v in classes.items()},ensure_ascii=False,indent=2))
