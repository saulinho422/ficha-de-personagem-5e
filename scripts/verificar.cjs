const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const raiz=path.resolve(__dirname,'..');const arquivos=['app.js','banco_phb.js','talentos_phb.js',...['js','dados'].flatMap(d=>fs.readdirSync(path.join(raiz,d)).filter(n=>n.endsWith('.js')).map(n=>d+'/'+n))];
for(const nome of arquivos)new vm.Script(fs.readFileSync(path.join(raiz,nome),'utf8'),{filename:nome});
const html=fs.readFileSync(path.join(raiz,'index.html'),'utf8');for(const m of html.matchAll(/(?:src|href)="([^"?#]+)(?:\?[^"#]*)?"/g)){if(!/^https?:/.test(m[1]))assert(fs.existsSync(path.join(raiz,m[1])),m[1]);}
console.log(arquivos.length+' arquivos JavaScript verificados; referências locais do HTML válidas.');
