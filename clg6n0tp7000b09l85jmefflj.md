---
title: "SOLID e seus princípios"
datePublished: Fri Apr 07 2023 14:23:50 GMT+0000 (Coordinated Universal Time)
cuid: clg6n0tp7000b09l85jmefflj
slug: solid-e-seus-principios
tags: solid-principles, principios-solid

---

SOLID é um acrônimo que representa cinco princípios fundamentais da programação orientada a objetos. Esses princípios foram introduzidos por Robert C. Martin, também conhecido como *Uncle* Bob, e são amplamente considerados como as melhores práticas para escrever um código limpo e sustentável.

Neste texto, vai ser exposto os 5 princípios do SOLID e como eles podem ser aplicados em seu código.

### **Single Responsibility Principle (Princípio da Responsabilidade Única)**

O Princípio da Responsabilidade Única (SRP) estabelece que uma classe deve ter apenas uma responsabilidade. Podemos aplicar também esse princípio no caso de funções. Ou seja, uma classe deve ser responsável por fazer uma coisa somente deve fazê-la da melhor maneira possível. Se uma classe (ou função) tiver várias responsabilidades, ela se torna mais difícil de entender, testar e manter.

Pensemos em um caso prático: imagine que você tem uma classe que é responsável por ler dados de um arquivo e também por processar esses dados. De acordo com o SRP, seria melhor ter duas classes separadas - uma para lidar com a leitura de arquivos e outra para processar os dados.

### **Open-Closed Principle (Princípio Aberto-Fechado)**

O Princípio Aberto-Fechado (OCP) estabelece que uma classe deve estar aberta para extensão, mas fechada para modificação. Em outras palavras, você deve ser capaz de estender o comportamento de uma classe sem precisar modificar sua estrutura.

Um exemplo seria a de uma classe que realiza um cálculo matemático complexo. Se você precisar adicionar um novo tipo de cálculo, você deve ser capaz de criar uma nova classe que estenda a classe existente, em vez de modificar a classe original.

### **Liskov Substitution Principle (Princípio da Substituição de Liskov)**

O Princípio da Substituição de Liskov (LSP) estabelece que uma classe deve ser substituível por suas subclasses sem afetar o comportamento do programa. Portanto, se uma classe A é um subtipo de uma classe B, então os objetos da classe A devem ser capazes de substituir os objetos da classe B sem causar problemas.

Considerando que você crie uma classe Animal e uma classe Cachorro que herda da classe Animal, a partir do momento que você tiver um método que aceita um Animal como parâmetro, ele deve ser capaz de aceitar um Cachorro como parâmetro sem causar conflitos.

### **Interface Segregation Principle (Princípio da Segregação de Interfaces)**

O Princípio da Segregação de Interfaces (ISP) estabelece que uma classe não deve depender de interfaces que não usa. Em outras palavras, as interfaces de uma classe devem ser segregadas para que cada classe use apenas as interfaces necessárias para seu funcionamento.

Por exemplo, imagine que você tem uma classe que precisa se comunicar com um banco de dados e enviar e-mails. Em vez de criar uma única interface para ambas as funcionalidades, você deve criar duas interfaces separadas - uma para a comunicação com o banco de dados e outra para o envio de e-mails.

### **Dependency Inversion Principle (Princípio da Inversão de Dependência)**

O Princípio da Inversão de Dependência (DIP) estabelece que uma classe deve depender de abstrações, não de implementações concretas.

Segundo esse princípio, as classes devem depender de interfaces ou classes abstratas em vez de classes concretas. Isso permite que o código seja mais flexível e fácil de manter, pois as mudanças em uma implementação concreta não afetam outras partes do código.

Exemplo: se você tiver uma classe que precisa se comunicar com um banco de dados, em vez de criar uma instância da classe concreta do banco de dados dentro da classe, você deve criar uma interface que define as operações que a classe precisa executar no banco de dados. Em seguida, você pode criar uma classe que implementa essa interface e injetá-la na classe que precisa se comunicar com o banco de dados.

### **Conclusão**

Os princípios do SOLID são uma ferramenta importante para desenvolvedores que desejam escrever um código limpo, testável e de fácil manutenção.