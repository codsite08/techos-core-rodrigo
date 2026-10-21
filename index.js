// ESTRUTURA BASE DE CLASSES (POO)
class Usuario {
  constructor(id, nome, email) {
    if (this.constructor === Usuario) {
      throw new Error("Classe abstrata.");
    }
    this.id = id;
    this.nome = nome;
    this.email = email;
  }
}

class Cliente extends Usuario {
  constructor(id, nome, email, telefone) {
    super(id, nome, email);
    this.telefone = telefone;
  }
}

class Tecnico extends Usuario {
  constructor(id, nome, email, especialidade) {
    super(id, nome, email);
    this.especialidade = especialidade;
  }
}

class OrdemServico {
  constructor(id, cliente, tecnico, descricao) {
    this.id = id;
    this.cliente = cliente;
    this.tecnico = tecnico;
    this.descricao = descricao;
    this.status = "ABERTA";
  }
}

// PADRÃO FACTORY METHOD
class UsuarioFactory {
  static criarUsuario(tipo, dados) {
    if (tipo.toUpperCase() === "CLIENTE") {
      console.log(`[FACTORY] Criando Usuário Tipo: CLIENTE... -> Objeto 'Cliente' criado (ID: ${dados.id}, Nome: ${dados.nome}).`);
      return new Cliente(dados.id, dados.nome, dados.email, dados.telefone);
    } else if (tipo.toUpperCase() === "TECNICO") {
      console.log(`[FACTORY] Criando Usuário Tipo: TECNICO... -> Objeto 'Tecnico' criado (ID: ${dados.id}, Nome: ${dados.nome}).`);
      return new Tecnico(dados.id, dados.nome, dados.email, dados.especialidade);
    }
  }
}

// PADRÃO SINGLETON
class GerenciadorOS {
  constructor() {
    if (GerenciadorOS.instancia) {
      return GerenciadorOS.instancia;
    }
    this.ordensServico = [];
    GerenciadorOS.instancia = this;
    console.log("[SINGLETON] Instância única do GerenciadorOS inicializada.");
  }

  static getInstancia() {
    if (!GerenciadorOS.instancia) {
      GerenciadorOS.instancia = new GerenciadorOS();
    }
    return GerenciadorOS.instancia;
  }

  adicionarOS(os) {
    this.ordensServico.push(os);
    console.log(`[SISTEMA] Ordem de Serviço #${os.id} registrada com sucesso!`);
  }

  listarOS() {
    return this.ordensServico.map(os => ({
      id: os.id,
      cliente: os.cliente.nome,
      tecnico: os.tecnico.nome,
      status: os.status,
      descricao: os.descricao
    }));
  }
}

// EXECUÇÃO DO SISTEMA
console.log("===================================================================");
console.log("⚙️  SAÍDA DA APLICAÇÃO (Console)");
console.log("===================================================================");

const gerenciador = GerenciadorOS.getInstancia();

const clienteAna = UsuarioFactory.criarUsuario("CLIENTE", {
  id: 101,
  nome: "Ana",
  email: "ana@email.com",
  telefone: "11999999999"
});

const tecnicoCarlos = UsuarioFactory.criarUsuario("TECNICO", {
  id: 202,
  nome: "Carlos",
  email: "carlos@techos.com",
  especialidade: "Manutenção"
});

const os1 = new OrdemServico(1, clienteAna, tecnicoCarlos, "Troca de Tela");
gerenciador.adicionarOS(os1);

console.log("[SISTEMA] Lista de OS ativas:");
console.log(gerenciador.listarOS());