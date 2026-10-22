# Regras locais

Copiadas de `soumatheusgomes/vibe-coding-toolkit`, revisão
`790a895304e0c08b70a5b215c9d334f1c86b816c`, em 21/10/2026:
`templates/eslint/eslint-rules/{index,core-rules,utils}.cjs`.
Licença MIT em [LICENSE.toolkit](LICENSE.toolkit).

O self-check da mesma revisão fica em `scripts/verify-quality-rules.mjs`.
Execute `yarn check:rules` a partir da raiz. Ele também exercita as regras de
console e acesso SQL, preservadas como parte do módulo; essas duas regras não
estão habilitadas na aplicação, que não possui logger ou banco SQL.

Ao atualizar, compare os três módulos e o self-check da mesma revisão,
preserve as adaptações em `eslint.config.mjs` e execute lint e testes.
