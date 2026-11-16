# Kasa e Cia – Purificadores Everest

Nova landing page estática (substitui a página WordPress atual em kasaecia.com). Visual inspirado em softgyn.com.br, com as cores do logo da Kasa e Cia.

## Arquivos

- `index.html`: estrutura e texto (topo com faixa, hero, diferenciais, vitrine de modelos, como funciona, troca de refil, outras linhas, CTA e rodapé).
- `styles.css`: layout responsivo e animações.
- `script.js`: links do WhatsApp com mensagem pronta (número em `WHATSAPP`), menu mobile, revelação ao rolar, vitrine de modelos (miniaturas, teclado e deslizar no celular) e troca de cor.
- `assets/img/`: logo nova (novembro de 2026), recortada do arquivo enviado pela cliente: `logo-kasa-e-cia.png` (horizontal, sem "purificadores", usada no topo e no rodapé sobre cartão branco), `favicon-32.png`, `apple-touch-icon.png` e `logo-kasa-e-cia-512.png` (versão empilhada, para ícones e JSON-LD).
- `assets/img/purificadores/`: foto de cada modelo e cor, do site oficial da Everest (compraeverest.com.br, outubro de 2026), recortada e convertida para WebP. Os PNGs vinham com fundo transparente; os do Foz eram JPG com fundo branco e tiveram o fundo removido.
- Especificações e textos dos cards seguem a ficha técnica oficial de cada modelo. O Fit aparece com 4 cores (branco, prata, preto e cereja), como no catálogo da Everest, embora a ficha dele cite só 3.

## Pendências com a cliente

- Linhas confirmadas pelo Instagram e Google: purificadores, bebedouros (Knox), climatizadores (Ventisol e Ultra Ar) e manutenção/troca de refil. Há também um destaque "Eletrodoméstico" no Instagram (não está no site).
- Endereço, horário, telefone, nota e avaliações vêm do perfil do Google (outubro de 2026); 12x sem juros vem da bio do Instagram. CNPJ 04.556.802/0001-33 no rodapé.
- Se ela trabalha com os 5 modelos (Foz, Star, Slim, Fit, Baby) e todas as cores.
- Se a revenda pode usar as fotos oficiais da Everest (revendas autorizadas normalmente podem).

## Bebedouros e climatizadores

- `assets/img/bebedouros/`: bebedouros Knox 25, 50, 100 e 200 L (no site usamos só a vista frontal, `-1`; os outros ângulos ficam guardados). O site da Knox está com as fotos quebradas (outubro de 2026), então as imagens vieram do softgyn.com.br, a pedido do Alex; textos e capacidades seguem knoxrefrigeradores.com.br.
- `assets/img/climatizadores/ventisol-familia.webp`: família Ventisol, do softgyn.com.br.
- `assets/img/climatizadores/ultraar-familia.webp`: recortada do banner do site da Ultra Ar (fundo ciano, pedestal, texto e ícone removidos). Modelos listados conforme ultraar.com.br; o site não publica ficha técnica.

## Publicação (kasaecia.com)

O domínio está na Hostinger (hPanel, servidor LiteSpeed). Antes deste site, rodava um WordPress (tema Neve + Elementor) em `public_html`.

Arquivos que vão para `public_html`:

- `index.html`, `styles.css`, `script.js`, `.htaccess`, `robots.txt`, `sitemap.xml`
- a pasta `assets/` inteira (com as subpastas `img/purificadores`, `img/bebedouros` e `img/climatizadores`)

Não enviar `README.md`, `.gitignore`, `.nojekyll`, `.claude/` nem `.git/`.

`.htaccess` faz `index.html` ser a página inicial, redireciona http/www para https://kasaecia.com, manda endereços antigos do WordPress (`/wp-admin`, `/wp-content`…) para a home e guarda imagens em cache por 30 dias. Ao trocar uma imagem, use um nome de arquivo novo.

A prévia em https://alexjrborchert.github.io/kasa-e-cia/ continua no ar com `canonical` apontando para kasaecia.com.
