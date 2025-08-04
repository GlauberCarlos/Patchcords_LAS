# 🧩 Projeto: Configurador de Patchcords  
Ferramenta web interativa para seleção e visualização de componentes técnicos personalizados.

---

## 📌 Status  
Projeto funcional com valores fictícios. Responsividade e UX ainda em desenvolvimento.   
🛠️ Melhorias previstas:
- Responsividade para dispositivos móveis
- UX refinado
- Transição futura para backend (Node.js, Python ou similar)

🔗 **Visualizar online:** [Configurador de Patchcords](https://glaubercarlos.github.io/Configurador_Patchcords/)

---

## 🔍 Resumo  
Aplicação web desenvolvida em **HTML, CSS e JavaScript** puro, que permite ao usuário configurar visualmente um produto (patchcord), gerando uma imagem final baseada nas opções selecionadas.

---

## 🎯 Funcionalidades  
- Interface com menus interativos (`<select>`) cujas opções são carregadas dinamicamente a partir de arquivos `.txt`  
- Integração com **Google Sheets via CSV** para recuperar dados externos sem backend  
- Geração de uma imagem final usando **canvas HTML5**, combinando imagens e textos com base nas seleções do usuário  
- Cálculo e exibição de preço final e descrição dinâmica conforme as escolhas  
- Possibilidade de **download da imagem gerada** com um único clique  

---

## ⚙️ Recursos técnicos aplicados  
- `fetch()` e `.then()` para leitura de arquivos `.txt`  
- Manipulação do DOM com `getElementById`, `createElement`, `addEventListener`, entre outros  
- Uso de **objetos em JavaScript** para validações e substituições dinâmicas de nomes  
- **Canvas API**: uso de `ctx.font`, `ctx.fillStyle`, `ctx.fillText`, `ctx.strokeStyle`, `ctx.beginPath`, etc.  
- Leitura de **CSV remoto (Google Sheets)** como alternativa temporária ao backend
- As imagens usadas foram todas renderizadas no Blender  
- Os ícones nas listas foram feitos no inkscape 

| Blender |
|------------------------|
| ![Blender](blender.png)   |

| Inkscape |
|------------------------|
| ![Inkscape](inkscape.png)   |

---

---

## 💡 Objetivo  
Criar uma interface prática e funcional para uso interno em ambientes técnicos, com foco em automação de geração de imagens para fichas técnicas, catálogos e pedidos personalizados.

---

## 🖼️ Preview  
![Preview do projeto](https://github.com/GlauberCarlos/Configurador_Patchcords/blob/main/config_patchcord_preview.png?raw=true)
---


