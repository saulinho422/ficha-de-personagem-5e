import js from '@eslint/js';
import globals from 'globals';
import quality from './eslint-rules/index.cjs';

// Scripts clássicos compartilham estes bindings na ordem registrada em index.html.
const compartilhados = Object.fromEntries([
  'bancoDnD', 'talentos', 'ForjaRegras', 'ForjaCampanha', 'ForjaEstado',
  'ForjaColecao', 'ForjaCatalogo', 'ForjaInterface', 'ForjaSessao', 'ForjaCriaturas',
  'ForjaOpcoes', 'ForjaAventura', 'ForjaClasses', 'ForjaAuxiliares', 'ForjaKits',
  'ForjaMagias', 'ForjaMagiasOrigem', 'ForjaCriacaoRegras', 'ForjaCriacao',
  'ForjaMidia', 'ForjaHistoria', 'ForjaVitais', 'ForjaSeletores', 'ForjaTransicoes',
].map(nome => [nome, 'readonly']));

export default [
  { ignores: ['node_modules/**', '.agents/**', '.codex/**', 'playwright-report/**', 'test-results/**', 'graphify-out/**'] },
  {
    files: ['**/*.{js,cjs,mjs}'],
    ...js.configs.recommended,
    plugins: { quality },
    rules: {
      ...js.configs.recommended.rules,
      // Dívida legada medida; o plano posterior extrai responsabilidades, sem reformatar a aplicação.
      'no-unused-vars': ['warn', { vars: 'local', args: 'none', caughtErrors: 'none' }],
      'quality/max-lines': ['warn', { max: 350, includeTests: true }],
      complexity: ['warn', 12],
      'max-depth': ['warn', 4],
      'max-params': ['warn', 4],
      // Não há servidor de aplicação, logger ou banco SQL que justifique essas regras locais.
    },
  },
  {
    files: ['*.js', 'js/**/*.js', 'dados/**/*.js'],
    languageOptions: { sourceType: 'script', globals: { ...globals.browser, ...globals.commonjs, ...compartilhados } },
    rules: { 'no-redeclare': ['error', { builtinGlobals: false }] },
  },
  {
    files: ['sw.js'],
    languageOptions: { sourceType: 'script', globals: globals.serviceworker },
  },
  {
    files: ['**/*.cjs', '**/*.mjs'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['app.js', 'js/interface.js'],
    languageOptions: { globals: { mostrarToast: 'readonly', fecharToast: 'readonly' } },
  },
  {
    files: ['js/interface.js'],
    languageOptions: {
      globals: {
        ...Object.fromEntries([
          'abrirModalProgressao', 'alternarEquipamento', 'BONUS_ATRIBUTOS_TALENTOS',
          'calcularDadosAtaque', 'capturarEstado', 'configuracaoPericiasClasse',
          'contextoDaFicha', 'equipamentoAtivo', 'formatarBonus', 'iniciarPersonagem',
          'listarArmasBanco', 'localizarArmadura', 'mostrarEtapa',
          'novoId', 'obterIncrementosPendentes', 'recalcularFicha', 'salvarEstado',
          'atualizarDisplayPV', 'abrirModalEquipamentos', 'mudarCategoriaModal',
        ].map(nome => [nome, 'readonly'])),
        ...Object.fromEntries([
          'ataquesPersonagem', 'detalhesFicha', 'equipamentoPersonagem',
          'inventarioPersonagem', 'progressosResolvidos', 'recursosPersonagem',
          'salvamentoBloqueado', 'tracosPersonagem',
        ].map(nome => [nome, 'writable'])),
      },
    },
  },
  {
    files: ['tests/navegador/**/*.cjs'],
    // evaluate/addInitScript executam callbacks no navegador, o restante no Node.
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['banco_phb.js'],
    // 1 chave duplicada preexistente; corrigir com regressão na entrega de domínio.
    rules: { 'no-dupe-keys': 'warn' },
  },
  {
    files: ['scripts/servidor.cjs', 'tests/servidor.test.cjs', 'js/notificacoes.js', 'tests/notificacoes.test.cjs',
      'js/criacao-regras.js', 'js/criacao.js', 'js/midia.js', 'js/historia.js', 'js/vitais.js', 'js/seletores.js', 'js/transicoes.js',
      'tests/criacao-regras.test.cjs', 'tests/historia.test.cjs', 'tests/seletores.test.cjs', 'tests/transicoes.test.cjs'],
    // Ferramentas novas não herdam o período de adoção da dívida da aplicação.
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrors: 'none' }],
      'quality/max-lines': ['error', { max: 350, includeTests: true }],
      complexity: ['error', 12],
      'max-depth': ['error', 4],
      'max-params': ['error', 4],
    },
  },
  {
    files: ['js/notificacoes.js', 'js/criacao.js', 'js/midia.js', 'js/historia.js', 'js/vitais.js', 'js/seletores.js', 'js/transicoes.js'],
    // Funções globais são consumidas pelos demais scripts clássicos.
    rules: { 'no-unused-vars': ['error', { vars: 'local', argsIgnorePattern: '^_', caughtErrors: 'none' }] },
  },
  {
    files: ['js/criacao.js', 'js/midia.js', 'js/vitais.js'],
    languageOptions: { globals: { mostrarToast: 'readonly' } },
  },
];
