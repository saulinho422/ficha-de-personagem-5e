#!/usr/bin/env python3
"""Extrai a tabela de bugigangas e reúne tabelas de aventura do LDJ fornecido."""
from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PDF = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT.parent / "upload" / "Guia - Livro do Jogador(1).pdf"
DESTINO = ROOT / "dados" / "aventura.js"


def bugigangas() -> list[str]:
    texto = subprocess.check_output(
        ["pdftotext", "-f", "163", "-l", "164", "-raw", str(PDF), "-"], text=True
    )
    itens: dict[int, str] = {}
    atual = None
    for linha in texto.splitlines():
        achado = re.match(r"^(\d{2,3})\s+(.+)$", linha.strip())
        if achado:
            numero = int(achado.group(1))
            if 1 <= numero <= 100:
                atual = numero
                itens[numero] = achado.group(2).strip()
                continue
        if atual and linha.strip() and not linha.startswith("d100") and linha.strip() not in {"162", "163"}:
            itens[atual] += " " + linha.strip()
    if sorted(itens) != list(range(1, 101)):
        raise RuntimeError(f"Tabela incompleta: {len(itens)} resultados")
    return [itens[n] for n in range(1, 101)]


dados = {
    "bugigangas": bugigangas(),
    "bens": [
        ["Trigo", "1 pc", "0,5 kg"], ["Farinha", "2 pc", "0,5 kg"], ["Galinha", "2 pc", "1 animal"],
        ["Sal", "5 pc", "0,5 kg"], ["Ferro", "1 pp", "0,5 kg"], ["Lona", "1 pp", "1 m²"],
        ["Cobre", "5 pp", "0,5 kg"], ["Tecido de algodão", "5 pp", "1 m²"],
        ["Gengibre", "1 po", "0,5 kg"], ["Cabra", "1 po", "1 animal"],
        ["Canela", "2 po", "0,5 kg"], ["Pimenta", "2 po", "0,5 kg"], ["Ovelha", "2 po", "1 animal"],
        ["Cravos", "3 po", "0,5 kg"], ["Porco", "3 po", "1 animal"],
        ["Prata", "5 po", "0,5 kg"], ["Linho", "5 po", "1 m²"],
        ["Seda", "10 po", "1 m²"], ["Vaca", "10 po", "1 animal"],
        ["Açafrão", "15 po", "0,5 kg"], ["Boi", "15 po", "1 animal"],
        ["Ouro", "50 po", "0,5 kg"], ["Platina", "500 po", "0,5 kg"],
    ],
    "arreios": [
        ["Armadura de montaria", "×4 da armadura", "×2 da armadura"],
        ["Alforje", "4 po", "4 kg"], ["Estábulo (por dia)", "5 pp", "—"],
        ["Freio e rédea", "2 po", "0,5 kg"], ["Ração (1 dia)", "5 pc", "5 kg"],
        ["Sela compacta", "5 po", "7,5 kg"], ["Sela exótica", "60 po", "20 kg"],
        ["Sela militar", "20 po", "15 kg"], ["Sela de viagem", "10 po", "12,5 kg"],
    ],
    "estilosVida": [
        ["Miserável", 0], ["Esquálido", 10], ["Pobre", 20], ["Modesto", 100],
        ["Confortável", 200], ["Rico", 400], ["Aristocrático", 1000],
    ],
    "servicos": [
        ["Condutor dentro da cidade", "1 pc"], ["Condutor entre cidades", "2 pc por km"],
        ["Mensageiro", "1 pc por km"], ["Passagem de navio", "6 pc por km"],
        ["Pedágio", "1 pc"], ["Serviçal destreinado", "2 pp por dia"],
        ["Serviçal treinado", "2 po por dia"],
    ],
}

js = "(function(r){const dados=" + json.dumps(dados, ensure_ascii=False, separators=(",", ":")) + ";if(typeof module!=='undefined'&&module.exports)module.exports=dados;else r.ForjaAventura=dados;})(globalThis);\n"
DESTINO.write_text(js, encoding="utf-8")
print(f"{DESTINO}: {len(dados['bugigangas'])} bugigangas, {len(dados['bens'])} bens")
