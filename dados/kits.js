(function(r){const g=(...alternativas)=>alternativas;
const dados={
'Bárbaro':{grupos:[g('Machado Grande','@marcial-corpo'),g('Machadinha*2','@simples')],fixos:'Pacote de Explorador|Azagaia*4',riqueza:[2,10]},
'Bardo':{grupos:[g('Rapieira','Espada Longa','@simples'),g('Pacote de Diplomata','Pacote de Artista'),g('Alaúde','@instrumento')],fixos:'Couro|Adaga',riqueza:[5,10]},
'Bruxo':{grupos:[g('Besta Leve|Virote*20','@simples'),g('Bolsa de componentes','@foco'),g('Pacote de Estudioso','Pacote de Aventureiro'),g('@simples')],fixos:'Couro|Adaga*2',riqueza:[4,10]},
'Clérigo':{grupos:[g('Maça','Martelo de Guerra'),g('Brunea','Couro','Cota de malha'),g('Besta Leve|Virote*20','@simples'),g('Pacote de Sacerdote','Pacote de Explorador')],fixos:'Escudo|Amuleto',riqueza:[5,10]},
'Druida':{grupos:[g('Escudo','@simples'),g('Cimitarra','@simples-corpo')],fixos:'Couro|Pacote de Explorador|Ramo de visco',riqueza:[2,10]},
'Feiticeiro':{grupos:[g('Besta Leve|Virote*20','@simples'),g('Bolsa de componentes','@foco'),g('Pacote de Aventureiro','Pacote de Explorador')],fixos:'Adaga*2',riqueza:[3,10]},
'Guerreiro':{grupos:[g('Cota de malha','Couro|Arco Longo|Flecha*20'),g('@marcial|Escudo','@marcial|@marcial'),g('Besta Leve|Virote*20','Machadinha*2'),g('Pacote de Aventureiro','Pacote de Explorador')],fixos:'',riqueza:[5,10]},
'Ladino':{grupos:[g('Rapieira','Espada Curta'),g('Arco Curto|Flecha*20','Espada Curta'),g('Pacote de Assaltante','Pacote de Aventureiro','Pacote de Explorador')],fixos:'Couro|Adaga*2|Ferramentas de ladrão',riqueza:[4,10]},
'Mago':{grupos:[g('Bordão','Adaga'),g('Bolsa de componentes','@foco'),g('Pacote de Estudioso','Pacote de Explorador')],fixos:'Grimório',riqueza:[4,10]},
'Monge':{grupos:[g('Espada Curta','@simples'),g('Pacote de Aventureiro','Pacote de Explorador')],fixos:'Dardo*10',riqueza:[5,1]},
'Paladino':{grupos:[g('@marcial|Escudo','@marcial|@marcial'),g('Azagaia*5','@simples-corpo'),g('Pacote de Sacerdote','Pacote de Explorador')],fixos:'Cota de malha|Amuleto',riqueza:[5,10]},
'Patrulheiro':{grupos:[g('Brunea','Couro'),g('Espada Curta*2','@simples-corpo|@simples-corpo'),g('Pacote de Explorador','Pacote de Aventureiro')],fixos:'Arco Longo|Aljava|Flecha*20',riqueza:[5,10]}
};if(typeof module!=='undefined'&&module.exports)module.exports=dados;else r.ForjaKits=dados;})(globalThis);
