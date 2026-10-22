# Fontes incorporadas

As instruções de terceiros são cópias separadas em `.agents/skills/`, não código
do produto. Autores, paths e hashes ficam em `skills-lock.json`; não foram
adaptadas para mudar o licenciamento da aplicação.

| Material | Origem | Licença preservada |
|---|---|---|
| Ponytail | DietrichGebert/ponytail, 09c434ab73ca43761c5d8b0c5d341926c2fba710 | [MIT](LICENSE.ponytail) |
| Caveman | JuliusBrussee/caveman, bad48a0e1df55e05e3f52249afa35ecc1909ee76 | [Apache 2.0](LICENSE.caveman) |
| find-skills | vercel-labs/skills, a80e4c9d12d607631249d4d7d059f835d4b2f13a | [MIT](LICENSE.vercel-skills) |
| web-design-guidelines e writing-guidelines | vercel-labs/agent-skills, 063bee94c3f4df8453406c830b0a7df0f2860278 | README upstream declara MIT; autor Vercel no frontmatter original |
| gh-fix-ci | openai/skills, 49f948faa9258a0c61caceaf225e179651397431 | Apache 2.0, LICENSE.txt dentro da skill |
| differential-review | Trail of Bits / trailofbits/skills, f0dd11d2b1da17a1ff8c403741fbe1f6bca0f871 | [CC BY-SA 4.0](LICENSE.trailofbits), cópia sem alterações |
| Regras locais e self-check | soumatheusgomes/vibe-coding-toolkit, 790a895304e0c08b70a5b215c9d334f1c86b816c | MIT em eslint-rules/LICENSE.toolkit |

Nenhum plugin, hook, proxy ou serviço dos repositórios de origem foi ativado
pela cópia de uma skill. Atualizações exigem revisão da fonte/licença, diff,
preservação das customizações e verificação; não atualizar tudo automaticamente.
