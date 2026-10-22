(function(r){
'use strict';
const ferramentas = [
['Ferramentas de alquimista',50,4,'artesao'],['Ferramentas de cervejeiro',20,4.5,'artesao'],['Ferramentas de calígrafo',10,2.5,'artesao'],['Ferramentas de carpinteiro',8,3,'artesao'],['Ferramentas de cartógrafo',15,3,'artesao'],['Ferramentas de sapateiro',5,2.5,'artesao'],['Ferramentas de cozinheiro',1,4,'artesao'],['Ferramentas de vidreiro',30,2.5,'artesao'],['Ferramentas de joalheiro',25,1,'artesao'],['Ferramentas de coureiro',5,2.5,'artesao'],['Ferramentas de pedreiro',10,4,'artesao'],['Ferramentas de pintor',10,2.5,'artesao'],['Ferramentas de oleiro',10,1.5,'artesao'],['Ferramentas de ferreiro',20,4,'artesao'],['Ferramentas de funileiro',50,5,'artesao'],['Ferramentas de tecelão',1,2.5,'artesao'],['Ferramentas de entalhador',1,2.5,'artesao'],
['Kit de disfarce',25,1.5,'kit'],['Kit de falsificação',15,2.5,'kit'],['Kit de herbalismo',5,1.5,'kit'],['Kit de venenos',50,1,'kit'],['Ferramentas de ladrão',25,0.5,'kit'],['Conjunto de dados',0.1,0,'jogo'],['Baralho de cartas',0.5,0,'jogo'],['Conjunto de xadrez de dragão',1,0.25,'jogo'],['Conjunto de três-dragões',1,0,'jogo'],
['Gaita de foles',30,3,'instrumento'],['Tambor',6,1.5,'instrumento'],['Dulcimer',25,5,'instrumento'],['Flauta',2,0.5,'instrumento'],['Alaúde',35,1,'instrumento'],['Lira',30,1,'instrumento'],['Berrante',3,1,'instrumento'],['Flauta de pã',12,1,'instrumento'],['Oboé',2,0.5,'instrumento'],['Violino',30,0.5,'instrumento']
].map(([nome,po,peso,grupo])=>({nome,preco:po+' po',peso:peso+' kg',grupo}));
const veiculos=[['Camelo',50,0,15,240],['Burro ou mula',8,0,12,210],['Elefante',200,0,12,660],['Cavalo de tração',50,0,12,270],['Cavalo de montaria',75,0,18,220],['Mastim',25,0,12,100],['Pônei',30,0,12,115],['Cavalo de guerra',400,0,18,270],['Carroça',15,100],['Carruagem',100,300],['Carruagem de guerra',250,50],['Trenó',20,150],['Carro de duas rodas',50,200],['Barco a remo',50,0,0,45],['Galera',30000,0],['Quilha',3000,0],['Dracar',10000,0],['Veleiro',10000,0],['Navio de guerra',25000,0]].map(([nome,po,peso,deslocamento=0,capacidade=0])=>({nome,preco:po+' po',peso:peso+' kg',deslocamento,capacidade,grupo:'veiculo'}));
const pacotes={
'Pacote de Explorador':[['Mochila',1],['Saco de dormir',1],['Kit de refeição',1],['Caixa de Fogo',1],['Tocha',10],['Rações de viagem (1 dia)',10],['Cantil',1],['Corda de cânhamo (15 metros)',1]],
'Pacote de Aventureiro':[['Mochila',1],['Pé de cabra',1],['Martelo',1],['Píton',10],['Tocha',10],['Caixa de Fogo',1],['Rações de viagem (1 dia)',10],['Cantil',1],['Corda de cânhamo (15 metros)',1]],
'Pacote de Artista':[['Mochila',1],['Saco de dormir',1],['Roupas de entretenimento',2],['Vela',5],['Rações de viagem (1 dia)',5],['Cantil',1],['Kit de disfarce',1]],
'Pacote de Assaltante':[['Mochila',1],['Esferas (sacola com 1.000)',1],['Linha (3 metros)',1],['Sino',1],['Vela',5],['Pé de cabra',1],['Martelo',1],['Píton',10],['Lanterna coberta',1],['Óleo (frasco)',2],['Rações de viagem (1 dia)',5],['Caixa de Fogo',1],['Cantil',1],['Corda de cânhamo (15 metros)',1]],
'Pacote de Diplomata':[['Baú',1],['Porta mapas ou pergaminhos',2],['Roupas finas',1],['Tinta (frasco de 30ml)',1],['Caneta tinteiro',1],['Lâmpada',1],['Óleo (frasco)',2],['Papel (uma folha)',5],['Perfume (frasco)',1],['Parafina',1],['Sabão',1]],
'Pacote de Estudioso':[['Mochila',1],['Livro',1],['Tinta (frasco de 30ml)',1],['Caneta tinteiro',1],['Pergaminho (uma folha)',10],['Saquinho de areia',1],['Pequena faca',1]],
'Pacote de Sacerdote':[['Mochila',1],['Cobertor de inverno',1],['Vela',10],['Caixa de Fogo',1],['Caixa de esmolas',1],['Bloco de incenso',2],['Incensário',1],['Robes',1],['Rações de viagem (1 dia)',2],['Cantil',1]]
};
const extras=[['Kit de refeição',0.2,0.5],['Linha (3 metros)',0.01,0],['Saquinho de areia',0,0],['Pequena faca',0,0.1],['Caixa de esmolas',0,0.5],['Bloco de incenso',0,0],['Incensário',0,0.5],['Suprimentos de cervejeiro',20,4.5],['Flecha',0.05,0.025],['Virote',0.05,0.0375]].map(([nome,po,peso])=>({nome,preco:po+' po',peso:peso+' kg'}));
const dragoes={Azul:['elétrico','linha 1,5 × 9 m','des'],Branco:['frio','cone 4,5 m','con'],Bronze:['elétrico','linha 1,5 × 9 m','des'],Cobre:['ácido','linha 1,5 × 9 m','des'],Latão:['fogo','linha 1,5 × 9 m','des'],Negro:['ácido','linha 1,5 × 9 m','des'],Ouro:['fogo','cone 4,5 m','des'],Prata:['frio','cone 4,5 m','con'],Verde:['veneno','cone 4,5 m','con'],Vermelho:['fogo','cone 4,5 m','des']};
const prioridades={'Bárbaro':['for','con','des','sab','car','int'],'Bardo':['car','des','con','sab','int','for'],'Bruxo':['car','con','des','sab','int','for'],'Clérigo':['sab','con','for','des','car','int'],'Druida':['sab','con','des','int','car','for'],'Feiticeiro':['car','con','des','sab','int','for'],'Guerreiro':['for','con','des','sab','int','car'],'Ladino':['des','int','con','sab','car','for'],'Mago':['int','con','des','sab','car','for'],'Monge':['des','sab','con','for','int','car'],'Paladino':['for','car','con','sab','des','int'],'Patrulheiro':['des','sab','con','for','int','car']};
const estilos=['Arquearia','Combate com Duas Armas','Defesa','Duelismo','Combate com Armas Grandes','Proteção'];
const manobras=['Aparar','Ataque Ameaçador','Ataque de Empurrão','Ataque de Finta','Ataque de Manobra','Ataque de Precisão','Ataque de Varredura','Ataque Derrubador','Ataque Desarmante','Ataque Estendido','Ataque Provocante','Contra-atacar','Golpe Distrativo','Golpe do Comandante','Investida','Presença Comandante','Reunir'];
const metamagias=['Magia Acelerada','Magia Aumentada','Magia Cuidadosa','Magia Distante','Magia Duplicada','Magia Estendida','Magia Potencializada','Magia Sutil'];
const disciplinas=['Sintonia Elemental','Punho dos Quatro Trovões','Punho do Ar Ininterrupto','Chicote de Água','Presas da Serpente de Fogo','Garras do Vento Norte','Postura da Névoa','Cavalgar o Vento','Defesa da Montanha Eterna','Onda da Terra Corrente','Rio da Chama Faminta','Sopro do Inverno','Chamas da Fênix','Punho da Montanha','Esfera de Equilíbrio Elemental','Chamas do Vulcão','Forma do Rio Fluente'];
const xp=[0,300,900,2700,6500,14000,23000,34000,48000,64000,85000,100000,120000,140000,165000,195000,225000,265000,305000,355000];
const condicoes={Agarrado:'Deslocamento 0; termina se quem agarra ficar incapacitado ou se o efeito separar as criaturas.',Amedrontado:'Desvantagem em testes e ataques enquanto a fonte do medo estiver visível; não pode se aproximar voluntariamente.',Atordoado:'Incapacitado, não pode se mover, fala vacilante; falha em FOR/DES; ataques contra você têm vantagem.',Caído:'Só rasteja até se levantar; ataques próprios têm desvantagem; ataques a 1,5 m têm vantagem, demais desvantagem.',Cego:'Falha em testes que exigem visão. Ataques próprios com desvantagem; ataques contra você com vantagem.',Enfeitiçado:'Não pode atacar o encantador; ele tem vantagem social contra você.',Envenenado:'Desvantagem em ataques e testes de habilidade.',Impedido:'Deslocamento 0; ataques próprios e salvaguardas de DES com desvantagem; ataques contra você com vantagem.',Incapacitado:'Não pode realizar ações nem reações; perde concentração.',Inconsciente:'Incapacitado, caído, larga o que segura; falha em FOR/DES; ataques têm vantagem e acertos a 1,5 m são críticos.',Invisível:'Pode tentar esconder-se; ataques com vantagem e ataques contra você com desvantagem, se não houver meios de ver você.',Paralisado:'Incapacitado e imóvel e sem fala; falha em FOR/DES; ataques com vantagem; acertos a 1,5 m são críticos.',Petrificado:'Incapacitado e imóvel; resistência a todos os danos, imunidade a veneno e doença; peso ×10; falha FOR/DES.',Surdo:'Falha em testes que exijam audição.'};
const descricoesClasses={
'Bárbaro':'Combatente feroz guiado pela fúria primal e resistência implacável no campo de batalha.',
'Bardo':'Artista e conjurador versátil que tece música, eloquência e magia para inspirar aliados.',
'Bruxo':'Conjurador que firmou um pacto místico com uma entidade extraplanar em troca de segredos arcanos.',
'Clérigo':'Campeão sacerdotal que canaliza milagres divinos para proteger aliados e punir inimigos.',
'Druida':'Guardião das forças da natureza capaz de invocar magias elementais e assumir formas de feras.',
'Feiticeiro':'Conjurador cuja magia flui diretamente do sangue, de uma linhagem exótica ou de forças caóticas.',
'Guerreiro':'Mestre absoluto das armas, armaduras e táticas de combate em qualquer estilo marcial.',
'Ladino':'Especialista furtivo em precisão, infiltração, perícias técnicas e golpes certeiros nos pontos fracos.',
'Mago':'Estudioso supremo das artes arcanas que registra e domina feitiços em seu grimório.',
'Monge':'Artista marcial disciplinado que canaliza a energia mística do Ki através do próprio corpo.',
'Paladino':'Cavaleiro sagrado vinculado a um juramento solene de justiça, proteção e destruição do mal.',
'Patrulheiro':'Caçador e batedor implacável das fronteiras selvagens, mestre em rastreamento e combate tático.'
};
const descricoesSubracas={
'Anão da Colina':'Dotados de percepção aguçada, profunda intuição e extraordinária tenacidade física.',
'Anão da Montanha':'Fortes e robustos, acostumados à vida rigorosa nos picos e ao combate com armaduras.',
'Alto Elfo':'Linhagem élfica erudita com afinidade natural pelas artes arcanas e pelos idiomas antigos.',
'Elfo da Floresta':'Ágeis e furtivos guardiões das matas, em perfeita harmonia com o ambiente selvagem.',
'Drow (Elfo Negro)':'Herdeiros do Subterrâneo adaptados à escuridão profunda e à magia inata das sombras.',
'Pés-Leves':'Mestres em passar despercebidos, ágeis e sociáveis ao viajar ao lado de outros povos.',
'Robusto':'Mais resistentes que os demais halflings, com sangue forte capaz de suportar venenos.',
'Gnomo da Floresta':'Reservados e engenhosos, com talento nato para ilusões e comunicação com pequenos animais.',
'Gnomo das Rochas':'Inventores curiosos, artesãos incansáveis e especialistas em mecanismos e engenhocas.'
};
const descricoesSubclasses={
'Caminho do Furioso':'Transforma a fúria em violência implacável e ataques frenéticos sem trégua.',
'Caminho do Guerreiro Totêmico':'Forja um elo espiritual com feras totêmicas para guiar e proteger sua fúria.',
'Colégio do Conhecimento':'Reúne segredos, saberes acadêmicos e magias de todas as tradições.',
'Colégio da Bravura':'Inspira feitos heroicos na linha de frente, unindo aço e magia bardica.',
'A Arquifada':'Pacto firmado com um senhor ou dama feérica de encanto, ilusão e mistério.',
'O Corruptor':'Pacto forjado com habitantes dos Planos Inferiores, focado em destruição e resiliência.',
'O Grande Antigo':'Pacto com uma entidade ancestral insondável, dominando telepatia e loucura.',
'Domínio do Conhecimento':'Valoriza a erudição, a revelação de segredos e a maestria intelectual.',
'Domínio da Enganação':'Emprega ilusões, furtividade e subterfúgio como bênçãos divinas.',
'Domínio da Guerra':'Canaliza o vigor marcial divino para liderar ataques decisivos em combate.',
'Domínio da Luz':'Empunha o fogo sagrado e a radiância solar para dissipar as trevas.',
'Domínio da Natureza':'Une a devoção divina ao poder das matas, feras e elementos naturais.',
'Domínio da Tempestade':'Desfere a fúria dos raios, trovões e vendavais em nome das divindades.',
'Domínio da Vida':'Dedica-se à cura suprema, restauração e preservação da vitalidade.',
'Círculo da Terra':'Guardiões dos antigos ritos ligados a terrenos sagrados e à recuperação arcana.',
'Círculo da Lua':'Mestres metamorfos que assumem formas selvagens ferozes e elementais em combate.',
'Linhagem Dracônica':'Herda a resistência das escamas e o poder elemental dos dragões ancestrais.',
'Magia Selvagem':'Canaliza o caos puro da criação em surtos mágicos imprevisíveis e poderosos.',
'Campeão':'Aprimora o vigor físico puro e a precisão mortal de seus golpes críticos.',
'Cavaleiro Arcano':'Une a maestria marcial às magias de abjuração e evocação em batalha.',
'Mestre de Batalha':'Domina o combate tático através de manobras superiores e leitura do inimigo.',
'Assassino':'Especialista em infiltração, disfarces e golpes letais contra alvos surpreendidos.',
'Ladrão':'Acrobata ágil, mestre em mãos rápidas, escalada e uso versátil de objetos.',
'Trapaceiro Arcano':'Potencializa a furtividade ladina com ilusões e encantamentos arcanos.',
'Escola de Abjuração':'Especializa-se em barreiras protetoras, banimentos e anulação de feitiços.',
'Escola de Adivinhação':'Desvenda os fios do destino, presságios e segredos ocultos no tempo.',
'Escola de Conjuração':'Invoca criaturas, objetos e teletransportes através do espaço planar.',
'Escola de Encantamento':'Subjuga e cativa a mente de aliados e adversários com charme arcano.',
'Escola de Evocação':'Canaliza energia elemental bruta em explosões devastadoras e esculpidas.',
'Escola de Ilusão':'Engana os sentidos com miragens complexas, sombras e duplos ilusórios.',
'Escola de Necromancia':'Manipula as forças da vida, da morte e das reservas vitais.',
'Escola de Transmutação':'Altera a matéria, a energia e as propriedades físicas das criaturas.',
'Caminho da Mão Aberta':'Mestre supremo do combate desarmado, controle de impacto e cura pelo Ki.',
'Caminho da Sombra':'Arte ninja furtiva que utiliza as sombras para teletransporte e emboscadas.',
'Caminho dos Quatro Elementos':'Moldador de Ki que desencadeia fogo, água, ar e terra em combate.',
'Juramento de Devoção':'O ideal do cavaleiro radiante: honra, verdade, dever e proteção dos fracos.',
'Juramento dos Anciões':'Defensor da luz primordial, da alegria e da beleza natural contra a escuridão.',
'Juramento de Vingança':'Punição implacável contra os grandes males, sem piedade para os inimigos.',
'Caçador':'Mestre em técnicas letais para abater gigantes, hordas ou predadores colossais.',
'Mestre das Feras':'Atua em perfeita sintonia tática com um companheiro animal leal.',
'Conclave do Caçador':'Patrulheiro Revisado focado em abater presas colossais e hordas com precisão letal.',
'Conclave da Besta':'Patrulheiro Revisado que compartilha um vínculo espiritual profundo com uma fera companheira.',
'Conclave do Perseguidor Subterrâneo':'Patrulheiro Revisado especialista em emboscadas nas profundezas e escuridão.'
};
const imagensOrigem={
 racas:{'Anão':'','Elfo':'','Halfling':'','Humano':'','Humano Variante':'','Draconato':'','Gnomo':'','Meio-Elfo':'','Meio-Orc':'','Tiefling':''},
 subracas:{'Anão da Colina':'','Anão da Montanha':'','Alto Elfo':'','Elfo da Floresta':'','Drow (Elfo Negro)':'','Pés-Leves':'','Robusto':'','Gnomo da Floresta':'','Gnomo das Rochas':''},
 classes:{'Bárbaro':'','Bardo':'','Bruxo':'','Clérigo':'','Druida':'','Feiticeiro':'','Guerreiro':'','Ladino':'','Mago':'','Monge':'','Paladino':'','Patrulheiro':''},
 subclasses:{}
};
const dados={ferramentas,veiculos,pacotes,extras,dragoes,prioridades,estilos,manobras,metamagias,disciplinas,xp,condicoes,descricoesClasses,descricoesSubracas,descricoesSubclasses,imagensOrigem};
if(typeof module!=='undefined'&&module.exports)module.exports=dados;else r.ForjaOpcoes=dados;
})(globalThis);
