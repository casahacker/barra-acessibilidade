=== Casa Hacker — Barra de Acessibilidade ===
Contributors: casahacker
Tags: accessibility, a11y, wcag, vlibras, libras, acessibilidade
Requires at least: 6.0
Tested up to: 6.6
Requires PHP: 7.4
Stable tag: 0.1.0
License: Casa Hacker License
License URI: https://github.com/casahacker/barra-acessibilidade/blob/main/LICENSE

Barra fixa com 12 features de acessibilidade (WCAG-aligned) + integração VLibras. Sem dependências externas, ~15KB gzip.

== Description ==

Adiciona uma barra fixa no topo de qualquer página WordPress com 12 controles de acessibilidade:

* Tema claro / escuro / alto contraste
* Tamanho da fonte (A− / A / A+)
* Fonte para dislexia (Atkinson Hyperlegible)
* Régua de leitura (acompanha o cursor)
* Modo foco (escurece áreas auxiliares)
* Cursor ampliado
* **Libras** — abre o widget oficial VLibras do governo brasileiro
* Sem animação (pausa transitions)
* Foco realçado (outline laranja forte)
* Alvos maiores (WCAG 2.5.8, 44×44px)
* Sublinhar links

Preferências persistem em localStorage. Funciona em qualquer tema WordPress.

= Sobre o VLibras =

O widget VLibras é mantido pela Secretaria de Governo Digital (Brasil) e Universidade Federal da Paraíba. Licença: LGPL v3. Carregado on-demand apenas quando o usuário clica em Libras.

= Sobre a Casa Hacker =

Doação da Casa Hacker (NGO brasileira) ao ecossistema de acessibilidade web. Código aberto em https://github.com/casahacker/barra-acessibilidade.

== Installation ==

1. Faça upload do plugin ou instale via WordPress.org.
2. Ative o plugin no menu Plugins.
3. Configure em Configurações → Acessibilidade.

== Frequently Asked Questions ==

= O VLibras é carregado em todas as páginas? =

Não. O script do VLibras (~500KB) só é carregado quando o usuário clica no botão Libras pela primeira vez.

= A barra conflita com meu tema? =

A barra usa prefixo `ch-a11y-` e `position: fixed` no topo. Se seu tema tem uma barra fixa no mesmo lugar, adicione `padding-top: 32px` ao seu `body`.

= Posso customizar o estilo da barra? =

Sim. Edite o CSS via Customizer ou plugin de Custom CSS sobrescrevendo as classes `.ch-a11y-*`.

== Changelog ==

= 0.1.0 =
* Release inicial.
* 11 features WCAG + integração VLibras.

== Upgrade Notice ==

= 0.1.0 =
Release inicial.
