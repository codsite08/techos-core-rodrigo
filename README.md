# 🛠️ TechOS Core - Documentação de Requisitos e Modelagem

## 1. USER STORIES (INVEST)
* **US01:** "Como técnico, quero abrir uma Ordem de Serviço para registrar um conserto."
  - **C.A.01:** Deve validar o ID do cliente.
  - **C.A.02:** O status inicial da OS deve ser sempre 'ABERTA'.
* **US02:** "Como cliente, quero visualizar o status do meu equipamento."

## 2. REQUISITOS NÃO-FUNCIONAIS (RNF)
* **RNF01 (Segurança):** Sanitización de inputs contra XSS/OWASP no cadastro.
* **RNF02 (Desempenho):** Tempo de resposta na criação de chamados < 2s.

## 3. DIAGRAMA DE CLASSES
```mermaid
classDiagram
    class Usuario {
        <<Abstrata>>
        - int id
        - string nome
        - string email
        + getId()
        + getNome()
        + getEmail()
    }

    class Cliente {
        - string telefone
    }

    class Tecnico {
        - string especialidade
    }

    class OrdemServico {
        - int id
        - Cliente cliente
        - string status
    }

    Usuario <|-- Cliente
    Usuario <|-- Tecnico
    OrdemServico --> Cliente
    