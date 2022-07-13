# Visual Studio Code Clone

Technology used for building this website

- client
  - React (Typescript)
  - styled component

- server
  - node.js (express)
  - MongoDB (for saving user data and files data)

--- 
History of Visual Studio Code Clone is kind of complicated. While learning vim bindings I was looking for some interactive practice environment, couldn't find a good one. While build one I thought of creating a text editor for more support than just some basic vim bindings. While struggling with syntax highlighting started delving into ASTs and tokenizers. Then I was interested in the idea of executing files and showing the result. At a certain point occured to me that all those separates things adds up to a possible code editor. So I decided to recreate as manu Visual Studio Code functionality using React and Node.js as possible for a solo developer. 

I realize it's impossible to completely recreate Visual Studio Code by a solo developer. The VSCode project has a massive support from Microsoft and millions of contributions by tens of thousands of developers all over the world. However current goal is to build VSCode Clone project up to the level where it can be a viable code editor.  

--- 
### Future Plans

- [ ] add docker for running environment for multi file code running support
- [ ] rewrite core code in wasm and split functionalities into seperate threads
- [ ] add code execution support for more file types than just javascript
- [ ] add all VSCode vim bindings
- [ ] add custom settings support for UI
- [ ] add custom styling support for UI and for syntax 
- [ ] add multi user file editing support