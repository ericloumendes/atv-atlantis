import { Sequelize } from 'sequelize-typescript';
import { Cliente } from '../models/cliente';
import { Telefone } from '../models/telefone';
import { Endereco } from '../models/endereco';
import { Documento } from '../models/documento';
import { Acomodacao } from '../models/acomodacoes';
import { ClienteHospedagem, Hospedagem } from '../models/hospedagem';

const sequelize = new Sequelize({
    database: "tecii_atvv",
    username: "root",
    password: "root", // mudar senha
    host: "localhost", // colocar domínio
    port: 3306, // colocar porta
    dialect: 'mysql',
    models: [Cliente, Telefone, Endereco, Documento, Acomodacao, Hospedagem, ClienteHospedagem], // Adiciona os modelos aqui
  });
  
  export default sequelize;