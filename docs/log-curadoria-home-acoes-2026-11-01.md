# Log de alterações — curadoria da home e da página Ações

## Home — /

- **Campanha · 2026:** a 9ª Campanha Setembro Amarelo permanece como matéria principal, com fotografia, texto e link próprio.
- **ELO em movimento → Muito além de uma campanha:** nova seção imediatamente após a campanha, com três histórias visuais e links para páginas internas:
  1. Violência escolar e juventudes no Recôncavo → /acoes/pesquisa-escolas-reconcavo-2026/
  2. Saúde mental e cuidado na UFRB FM → /acoes/saude-mental-ufrb-fm-2026/
  3. Escuta e cuidado em Santiago do Iguape → /acoes/escuta-cuidado-iguape-2026/ (programação anunciada, sem execução confirmada)
- **Memória do projeto → Outras iniciativas:** lista reduzida para evitar repetir os três cards que aparecem acima.
- A antiga seção somente textual da pesquisa foi incorporada à nova seleção com imagem.

## Ações — /acoes/

- **Destaques de 2026:** deixou de repetir a campanha da home; passa a apresentar três atividades diferentes:
  1. Pesquisa sobre violência escolar no Recôncavo.
  2. Diálogos com o Colégio Candido Portinari.
  3. Entrevista sobre saúde mental na UFRB FM.
- **Outras ações no acervo:** mantém a campanha Setembro Amarelo e demais atividades, excluindo os três destaques para não duplicar os mesmos registros na própria página.

## Design e estrutura

- Foram reaproveitadas imagens reais já existentes em assets/img, com proporções e enquadramentos adequados a cartazes, capas e fotografias.
- Nova composição editorial responsiva em 3 colunas na home, e destaque assimétrico com uma história principal e duas secundárias em Ações.
- Sem inclusão de fatos ou imagens não verificados. Menu e identidade ELO INSTITUCIONAL preservados.

## Limitações de validação

- Arquivos fontes e HTMLs gerados foram alterados em conjunto. Testes automatizados do repositório devem ser executados em um ambiente com Node e acesso ao checkout: npm run build && npm run check.
