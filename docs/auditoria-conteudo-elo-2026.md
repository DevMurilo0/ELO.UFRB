# Auditoria editorial do ELO.UFRB — 18 de outubro de 2026

## Escopo e situação anterior

Revisão do portal estático, do projeto institucional original de 18 páginas, dos JSONs, dos geradores, CSS, JavaScript e das 12 rotas existentes. A home publicada foi aberta no Chromium em 375 e 1440 px e comparada à versão local. Os materiais originais de `esboço/` foram preservados.

O portal já possuía identidade consistente e fotografias documentais. Seus problemas principais eram a agenda vencida, a repetição da campanha na home, a escolha automática do primeiro registro como destaque, a mistura entre chamada, cobertura e documento e o arquivo editorial sem filtros. A página do idealizador tinha formação e produção relevantes, mas pouca ligação narrativa entre elas. A alteração local prévia em `idealizador/index.html` era apenas uma diferença no fim do arquivo; foi examinada e uma cópia anterior preservada fora do repositório antes da geração.

## Pesquisa realizada e limites de acesso

Foram usados busca pública, Firecrawl, navegação web e requisições HTTP comuns. Consultados o perfil do ELO, `@ams.dialogos`, `@ams.2020`, permalinks fornecidos, páginas da UFRB, imprensa regional, documentos acadêmicos e o PDF original. As pesquisas incluíram buscas por título, nome, domínio, anos de 2025/2026 e cobertura posterior a 30/09. Não se usaram autenticação, endpoints privados, solução de CAPTCHA ou contorno de restrições.

O Firecrawl devolveu `INVALID_ARGUMENT` para diversas páginas do Instagram e algumas páginas institucionais. A busca indexada localizou fontes e a leitura HTTP pública recuperou os campos `description`/`og:description` de posts específicos. Isso permitiu confirmar legendas e datas sem acesso ao feed completo nem análise dos vídeos. Resposta HTTP 200 isoladamente não foi tratada como confirmação de conteúdo. A consulta aos perfis não equivale a uma varredura integral de todas as publicações.

A data da cobertura do A TARDE Educação, não visível no corpo recuperado, foi conferida no endpoint público `https://educacao.atarde.com.br/wp-json/wp/v2/posts?slug=saude-mental-e-tema-de-campanha-em-escolas-de-cachoeira`: registro 7884, publicação em 05/10/2026 e atualização no mesmo dia. A fonte efetivamente publicada é a matéria, não a API.

## Achados que alteraram a curadoria

- [Parceria com a Câmara](https://www.instagram.com/p/Db_rIESqtqY/), 13/08/2026: a legenda confirma o tema e a abertura anunciada para 02/09. A fotografia da peça não é atribuída ao encerramento.
- [Educação de Cachoeira](https://www.instagram.com/p/Dd-dgPEAMBp/), 01/10/2026: a legenda afirma que o encerramento ocorreu na manhã anterior, dia 30, no CAHL. Confirma a presença da equipe da Secretaria e a homenagem a Adriana Lima. É a fonte institucional posterior que confirma a realização e o dia.
- [A TARDE Educação](https://educacao.atarde.com.br/saude-mental-e-tema-de-campanha-em-escolas-de-cachoeira/), 05/10/2026: cobertura do encontro com debates de Anamélia Rocha, Tânia Costa e Nilson Weisheimer. O veículo não explicita a data do encontro; ela vem da fonte municipal.
- [Tribuna do Recôncavo](https://tribunadoreconcavo.com/setembro-amarelo-reconcavo-cachoeira-ufrb/), 24/09/2026, e [Blog do Valente](https://blogdovalente.com.br/educacao/2026/09/ufrb-encerra-9a-edicao-do-setembro-amarelo-com-programacao-sobre-saude-mental-em-cachoeira/), 25/09/2026: anúncios com horário 8h–13h e NTE 21 previsto. Permanecem identificados como divulgação anterior.
- [Voz do Movimento](https://vozdomovimento.com/2931-2/), 28/09/2026: anuncia Edinaldo Correia Novaes e Jonas Laildo Neves, mas informa término às 12h. Divergência mantida explicitamente. Não adotados o público esperado como presença real nem a antiguidade atribuída ao ELO, incompatível com sua criação em 2022.
- [Homenagem a Aline Brandão](https://www.instagram.com/reel/DebxZcnRIG1/), 13/10/2026: registro oficial de homenagem, com interlocuções municipais, NACATEA e colaboração musical. A data é de publicação. Não há identificação explícita do dia da cerimônia nem vínculo inequívoco com o encontro de 30/09; por isso é uma publicação independente, sem duplicar a campanha como nova ação.
- [ALBA Entrevista](https://www.instagram.com/reel/DH1XwaBJlai/), postagem de 30/03/2025: referência audiovisual de Antônio Mateus sobre universidade pública e interiorização. Não se atribui à gravação a data da postagem.
- [Entrevista ao Portal Massa](https://jornalmassa.com.br/policia/agindo-como-empresas-faccoes-levam-traficantes-da-bahia-para-o-rio-1325301), 29/10/2025: matéria integral sobre crime organizado, território e desigualdades. Encontrada pela indicação do perfil de Ciências Sociais de 31/10/2025; a data do veículo prevalece. Mantida na biografia, sem atribuir a entrevista ao ELO.
- [X JUBRA](https://www.instagram.com/ams.dialogos/p/DcCLq_8h_WA/), postagem de 14/08/2026: anúncio de mediação/debate no lançamento de livro em 19/08, UFBA/Salvador. Incluído na trajetória com a condição de participação anunciada, sem converter anúncio em realização comprovada.

## Conteúdos incorporados e reorganizados

### Ações e detalhes

`/acoes/setembro-amarelo-2026/` passou a reunir contexto, encerramento confirmado, temas relatados, articulação territorial, programação histórica, divergência de horário e referências audiovisuais. Os parágrafos estão divididos por função e trazem acesso direto à fonte pertinente. A 9ª edição não é usada para datar a criação do ELO.

Criada `/acoes/pesquisa-escolas-reconcavo-2026/`, reunindo os registros de pesquisa em escolas públicas e de integração com o NTE 21. As legendas de junho e setembro foram relidas publicamente. Não se publicam amostra, escolas específicas, nomes de estudantes, resultados ou métricas ausentes das fontes. A página explica a atividade; Publicações registra sua divulgação; Parcerias contextualiza a relação com o NTE 21.

Reencôncavo 2023 e Saúde Mental e Psicoeducação 2022 continuam no arquivo. O vídeo da TV UFRB já existia como link no gerador e agora também está catalogado entre os materiais audiovisuais. A programação do Reencôncavo foi conferida novamente: painel do ELO, sala, horários, participantes e mediação constam na página institucional.

### Home

Mantidos hero, marca, círculos, fontes, fotografia geral e cores. A campanha aparece uma vez como destaque; a pesquisa escolar ganha uma composição textual própria. O bloco de memória contém 2023 e 2022, sem repetir os mesmos destaques. Institucional, idealizador, agenda, documento e canais mantêm funções distintas. A capa do documento substitui parte da representação gráfica por uma miniatura do original.

### Publicações

Quatro categorias efetivamente preenchidas: Notícias e registros; Produções e documentos; Vídeos e entrevistas; Conteúdos educativos. Busca por palavras sem acentos, filtro por tipo, contagem, estado vazio e critérios persistidos na URL. Categorias sem resultados são ocultadas durante a busca. Sem JavaScript, o arquivo inteiro e os links por categoria continuam disponíveis.

A escolha editorial da cobertura está explícita no dado `featured`, sem depender da posição inicial do JSON. Cada registro informa tipo, data de publicação quando confirmada, resumo e fonte. A notícia de outubro é cobertura; a chamada de setembro permanece chamada. Materiais sobre o idealizador ficam na biografia, sem contaminar o arquivo de atividades do projeto.

### Idealizador

A narrativa conecta cidade e habitação, violência escolar, docência e extensão. A linha do tempo incorpora a obra coletiva de 2021, a criação do ELO em 2022, a participação divulgada no debate sobre dez anos do Observatório Social da Juventude em 2023 e o anúncio no X JUBRA de 2026. A seção existente de voz pública recebeu as referências de 2025, sem criar novas seções repetitivas.

### Navegação

Menu principal: Início, O ELO, Ações, Agenda, Publicações, Idealizador, Contato. Parcerias continua em `/parceira/`, acessível no rodapé, na metodologia institucional e nas relações com ações. A rota `/conteudos/` foi preservada como orientação ao arquivo, removendo o estado vazio redundante. Não foram removidos registros históricos.

## Imagens e direito de reutilização

- Mantidas as fotografias e artes locais anteriores, com dimensões, alt e carregamento tardio. A fotografia genérica da atividade não recebe data ou identificação de evento sem fonte; a peça com a Câmara não ilustra o encerramento.
- Nova miniatura: `assets/img/documentos/projeto-2025-2027.webp` e `.avif`, 495 × 700 px, extraída da página 1 do PDF fornecido, sem mudança de composição. O PDF original permanece em `esboço/`. Proveniência em `capa-projeto-local`.
- O retrato atual mede **320 × 318 px**. Foi mantido e limitado a 320 px na biografia, evitando ampliar artificialmente a resolução.
- Candidatos localizados: fotografias do post de cobertura de `@educacachoeira`; fotografia creditada à Prefeitura na matéria do A TARDE Educação; retrato creditado a arquivo pessoal na entrevista do Massa; registro pessoal da FLICA em `@ams.2020`. Não foram reproduzidos sem autorização explícita. Fontes públicas não equivalem automaticamente a licença de reprodução.
- Não foram criados retratos artificiais, usadas imagens de banco ou expostas URLs temporárias de CDN do Instagram em HTML de produção.

## Agenda: regra temporal e manutenção estática

O build usa `calendarDay()` no fuso `America/Bahia`, sem inferir eventos a partir do período de vigência institucional. A comparação ocorre com datas civis ISO; evento com `endDate` permanece na programação até o último dia inclusive. Sem `endDate`, vale o próprio dia. A granularidade é de dia, não de horário. Cancelados e adiados não entram como próximos.

`partitionEvents()` separa datas anteriores, ordena próximos crescentemente e histórico decrescentemente e aceita lista vazia. `ELO_BUILD_DATE=AAAA-MM-DD` permite testes reproduzíveis. O build normal usa a data da execução; `editorialReferenceDate` registra a data da curadoria e não congela a agenda.

Após o deploy, `assets/js/agenda.mjs` confere novamente as datas ao carregar, a cada minuto, em `pageshow` e ao voltar à aba. Cards vencidos migram para o histórico; na home, o próximo candidato ainda válido é promovido ou aparece a mensagem de ausência de programação. A regra civil é compartilhada com o build em `assets/js/calendar.mjs`.

Um HTML estático sem JavaScript não pode saber a data da visita. Por isso o fallback usa a expressão datada “Programação a partir de [data da geração]”, mantém as datas visíveis e informa a data da consulta; ele não declara indefinidamente um evento como “próxima atividade”. A navegação permanece HTML normal. Em 18/10/2026 não há eventos futuros cadastrados: home e agenda exibem a mensagem solicitada e o acesso ao histórico.

Novos módulos `.mjs` ficam em `assets/js/` e devem ser publicados junto dos demais assets. O servidor local passou a servir `.mjs`, WebP, AVIF e WOFF2 com MIME correto.

## Proveniência e pendências

`content/sources.json` distingue `public_metadata_verified`, `third_party_verified`, `institutional_verified`, `provided_document`, `previously_documented`, `partial_indexed` e `pending`. Há data de consulta e, nos novos materiais, data de publicação quando confirmada. O booleano `verified` permanece por compatibilidade; o status e as notas detalham o que foi efetivamente conferido.

Ainda solicitar ao responsável:

1. Permalink e legenda do curso Pesquisa Social Aplicada na Educação Básica, anunciado para 22/09/2026, e comprovação posterior se houver. Mantido como anúncio histórico, sem alegar execução.
2. Legenda completa ou confirmação do registro CAHLCULTURANDO (`DdoSlCFx54f`): nesta rodada a resposta pública não forneceu descrição. Preservada a curadoria anterior e a autoria estudantil, sem ampliar as alegações.
3. Arquivos fotográficos originais do projeto e autorização de reprodução das novas imagens; retrato do idealizador em resolução superior, com crédito e permissão identificados.
4. Vídeos integrais, caso se deseje transcrição, resumos de falas ou identificação de todas as pessoas presentes. Os reels fornecidos tiveram legenda recuperada, mas não foram analisados integralmente.
5. Registro completo de execução da campanha: abertura, atividades territoriais, programação final e confirmação de convidados. Não há lista exaustiva de instituições participantes.

Pistas não publicadas como fatos novos: trabalho nos anais ENANPUR com URL hoje retornando 404; PDF de resumos do Congresso UFRB 2026 com data de capa posterior à referência da auditoria e campos “A definir”; pedido de pós-doutorado em ata da UFBA, sem comprovação de conclusão; registros pessoais da FLICA sem vínculo documentado com o ELO.

A checagem de links externos localizou restrição HTTP 429 no vídeo da TV UFRB, falha de cadeia de certificado na UFBA e 404 na pista da ANPUR. O link antigo da tese foi preservado; a nova pista da ANPUR foi retirada das leituras publicadas e mantida somente como pendência. Disponibilidade de um endereço externo não garante disponibilidade permanente nem autentica todo o seu conteúdo.

## Validação

Resultados finais e evidências estão registrados em `docs/verificacao.md`: build e check aprovados; 13 rotas, 410 referências locais, 65 combinações responsivas e 26 avaliações finais do axe sem violações detectadas. Foram testados lista vazia e envelhecimento da agenda, incluindo promoção do próximo evento válido. Nenhuma dependência foi adicionada ao runtime ou ao build; continua possível executar `npm start` sem instalação. Os HTMLs gerados acompanham as alterações nas fontes. Não houve publicação remota nem alteração no repositório GitHub durante esta revisão.

## Catálogo da pesquisa nova

As datas abaixo são de publicação, salvo indicação em contrário. A ausência de local não foi preenchida por inferência. Os resumos editoriais estão nos itens incorporados e nas notas de proveniência.

### Setembro Amarelo encerra 9ª edição com programação em Cachoeira

- Data confirmada: 2026-09-24. Categoria: Notícia de divulgação.
- Local: Cachoeira, BA. Instituições identificadas no contexto: ELO.UFRB, CAHL/UFRB, NTE 21.
- Fonte: [Tribuna do Recôncavo · Hélio Alves](https://tribunadoreconcavo.com/setembro-amarelo-reconcavo-cachoeira-ufrb/). Verificação: `third_party_verified`.
- Resumo e limites: Leitura integral. Anúncio anterior ao encerramento, 8h–13h; não comprova execução integral.
- Imagem: Imagem disponível na matéria; não reproduzida.
- Destino editorial: Referência no dossiê da campanha; registro de notícia no arquivo.

### UFRB encerra 9ª edição do Setembro Amarelo com programação sobre saúde mental em Cachoeira

- Data confirmada: 2026-09-25. Categoria: Notícia de divulgação.
- Local: Cachoeira, BA. Instituições identificadas no contexto: ELO.UFRB, CAHL/UFRB, NTE 21.
- Fonte: [Blog do Valente · Lala Freitas](https://blogdovalente.com.br/educacao/2026/09/ufrb-encerra-9a-edicao-do-setembro-amarelo-com-programacao-sobre-saude-mental-em-cachoeira/). Verificação: `third_party_verified`.
- Resumo e limites: Leitura integral por busca e navegação pública. Chamada, não cobertura. 8h–13h; NTE 21 anunciado.
- Imagem: Imagem de divulgação disponível; não reproduzida.
- Destino editorial: Fonte complementar do dossiê, sem duplicar a ação.

### 9ª Campanha Setembro Amarelo do ELO.UFRB

- Data confirmada: 2026-09-28. Categoria: Notícia de divulgação.
- Local: Cachoeira, BA. Instituições identificadas no contexto: ELO.UFRB, CAHL/UFRB, MST/BA.
- Fonte: [Voz do Movimento · Jobson Trindade; texto creditado ao ELO.UFRB](https://vozdomovimento.com/2931-2/). Verificação: `third_party_verified`.
- Resumo e limites: Anuncia Edinaldo Correia Novaes e Jonas Laildo Neves. Diverge no término (12h); confunde antiguidade do projeto com a da campanha. Não adotados números esperados nem afirmação de quase dez anos do ELO.
- Imagem: Artes de divulgação na fonte; não reproduzidas.
- Destino editorial: Referência com ressalva de horário e antiguidade do projeto.

### Saúde mental é tema de campanha em escolas de Cachoeira

- Data confirmada: 2026-10-05. Categoria: Cobertura jornalística.
- Local: CAHL/UFRB, Cachoeira, BA. Instituições identificadas no contexto: ELO.UFRB, UFRB, NAPE.
- Fonte: [A TARDE Educação](https://educacao.atarde.com.br/saude-mental-e-tema-de-campanha-em-escolas-de-cachoeira/). Verificação: `third_party_verified`.
- Resumo e limites: Cobertura posterior confirma o encontro no CAHL e participantes citados. Data de publicação confirmada pela API pública /wp-json/wp/v2/posts?slug=saude-mental-e-tema-de-campanha-em-escolas-de-cachoeira (id 7884). Não explicita a data do encontro. Foto creditada à Prefeitura de Cachoeira; reprodução não autorizada explicitamente, não baixada para uso no portal.
- Imagem: Foto creditada à Prefeitura de Cachoeira; permissão de reprodução pendente.
- Destino editorial: Dossiê da campanha e Publicações; sem página duplicada para a mesma atividade.

### ALBA Entrevista · Universidade pública e interiorização

- Data confirmada: 2025-03-30. Categoria: Entrevista.
- Local: não informado com precisão. Instituições identificadas no contexto: nenhuma relação institucional nova atribuída.
- Fonte: [Instagram · resultado indexado](https://www.instagram.com/reel/DH1XwaBJlai/). Verificação: `public_metadata_verified`.
- Resumo e limites: Publicação de Antônio Mateus em 30/03/2025, com identificação ALBA Entrevista e reflexão sobre universidade pública, interiorização e democratização do conhecimento. Data da postagem, não da gravação; vídeo integral não analisado.
- Imagem: Reel na fonte.
- Destino editorial: Seção de voz pública do idealizador.

### Homenagem do ELO.UFRB a Aline Brandão

- Data confirmada: 2026-10-13. Categoria: Homenagem.
- Local: não informado com precisão. Instituições identificadas no contexto: ELO.UFRB, NACATEA, Filarmônica Minerva, Filarmônica União Sanfelixta.
- Fonte: [Instagram oficial · resultado indexado](https://www.instagram.com/reel/DebxZcnRIG1/). Verificação: `public_metadata_verified`.
- Resumo e limites: Legenda pública confirma homenageada Aline Brandão, participação de Neta Lira e Sandra Lomba/NACATEA e colaboração musical das filarmônicas Minerva e União Sanfelixta. Data é de publicação; não atribui dia exato da cerimônia nem a vincula automaticamente ao encerramento de 30/09. Vídeo não transcrito.
- Imagem: Reel no post; não reproduzido localmente.
- Destino editorial: Apenas publicação independente; dia e local exatos da cerimônia não confirmados.

### Encerramento da 9ª Campanha Setembro Amarelo no CAHL

- Data confirmada: 2026-10-01. Categoria: Registro institucional.
- Local: CAHL/UFRB, Cachoeira, BA. Instituições identificadas no contexto: ELO.UFRB, Secretaria Municipal de Educação de Cachoeira, UFRB.
- Fonte: [Secretaria Municipal de Educação de Cachoeira · @educacachoeira](https://www.instagram.com/p/Dd-dgPEAMBp/). Verificação: `public_metadata_verified`.
- Resumo e limites: Legenda pública de 01/10 diz na manhã de ontem (30), confirmando 30/09/2026 no CAHL; equipe da Secretaria presente e Adriana Lima homenageada. Autoria e data confirmadas nos metadados. Fotografias disponíveis na publicação; sem autorização expressa de reprodução local.
- Imagem: Fotografias no post; permissão e originais pendentes.
- Destino editorial: Confirmação do encontro no dossiê; referência no arquivo.

### Convite de Willian Tito para 30/09

- Data confirmada: 2026-09-29. Categoria: Convite audiovisual.
- Local: não informado com precisão. Instituições identificadas no contexto: ELO.UFRB, UFRB.
- Fonte: [Instagram oficial · resultado indexado](https://www.instagram.com/reel/Dd5OF5pNGca/). Verificação: `public_metadata_verified`.
- Resumo e limites: Legenda lida: convite de Willian Tito (CSS/UFRB) para 30/09. Publicado 29/09; não é cobertura posterior.
- Imagem: Reel na fonte.
- Destino editorial: Referência contextual no dossiê, sem tratar como cobertura.

### Reflexão audiovisual sobre Setembro Amarelo e UFRB

- Data confirmada: 2026-10-01. Categoria: Registro audiovisual.
- Local: Cachoeira, BA. Instituições identificadas no contexto: UFRB, ELO.UFRB.
- Fonte: [Rogério Elegibo · @oluelegibo · Instagram](https://www.instagram.com/reel/Dd-pTtoINpe/). Verificação: `public_metadata_verified`.
- Resumo e limites: Legenda pública de 01/10 menciona UFRB, Setembro Amarelo, @ams.2020, @elo.ufrb.oficial e Cachoeira. Permite referência audiovisual contextual, mas não confirmação de programação, depoimento ou presença no encontro de 30/09.
- Imagem: Reel na fonte.
- Destino editorial: Referência contextual; sem resumo de vídeo integral.

### X JUBRA: lançamento e debate sobre juventudes

- Data confirmada: 2026-08-14. Categoria: Anúncio de evento acadêmico.
- Local: UFBA, Salvador, BA. Instituições identificadas no contexto: UFBA.
- Fonte: [Antônio Mateus · @ams.dialogos](https://www.instagram.com/ams.dialogos/p/DcCLq_8h_WA/). Verificação: `public_metadata_verified`.
- Resumo e limites: Legenda pública anuncia mediação e debate de Antônio Mateus e Misael França em lançamento de livro no X JUBRA, UFBA/Salvador, em 19/08/2026 às 17h. É anúncio; não há comprovação de execução nesta fonte. Atuação pessoal, não cadastrada como ação do ELO.
- Imagem: Peça na publicação; não reproduzida.
- Destino editorial: Linha do tempo do idealizador como participação anunciada.

### Agindo como empresas, facções levam traficantes da Bahia para o Rio

- Data confirmada: 2025-10-29. Categoria: Entrevista jornalística.
- Local: não informado com precisão. Instituições identificadas no contexto: nenhuma relação institucional nova atribuída.
- Fonte: [Portal Massa · Rede A TARDE](https://jornalmassa.com.br/policia/agindo-como-empresas-faccoes-levam-traficantes-da-bahia-para-o-rio-1325301). Verificação: `third_party_verified`.
- Resumo e limites: Matéria integral consultada a partir da indicação do perfil @ciso.ufrb em 31/10/2025, reel DQfGgojEWYm. Metadados do veículo informam 29/10/2025 às 20h03, atualização 30/10. Entrevista sobre organização de facções e desigualdades; não atividade do ELO. Retrato creditado Reprodução/Arquivo pessoal, sem permissão expressa para reuso; mantido apenas o link da matéria.
- Imagem: Retrato creditado a arquivo pessoal; autorização de reuso pendente.
- Destino editorial: Seção de voz pública; não é ação institucional do ELO.

### FLICA 2022 · registro pessoal

- Data confirmada: 2022-11-05. Categoria: Registro pessoal.
- Local: não informado com precisão. Instituições identificadas no contexto: nenhuma relação institucional nova atribuída.
- Fonte: [AMS · @ams.2020](https://www.instagram.com/p/Ckl98juuohE/). Verificação: `public_metadata_verified`.
- Resumo e limites: Legenda pública de encontro com conterrâneos. Não especifica atividade acadêmica nem atuação do ELO. Excluído da narrativa institucional e não reproduzido sem autorização.
- Imagem: Fotografia pública; sem autorização de reuso identificada.
- Destino editorial: Excluído da página institucional; não comprova atividade do ELO.

