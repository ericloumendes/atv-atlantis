import router from "./routes";
import sequelize from "./config/connection";
import { Acomodacao } from "./models/acomodacoes";

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

const PORT = process.env.PORT || 5000;

sequelize.sync({ force: false })  // Altere para `true` se quiser recriar as tabelas durante o desenvolvimento
  .then(async () => {

    const acomodacoes = await Acomodacao.findAll();
    if (acomodacoes.length === 0) {
      await Acomodacao.create({
        nomeAcomadacao: 'Acomodação simples para solteiro(a)',
        camaCasal: 0,
        camaSolteiro: 1,
        climatizacao: true,
        garagem: 0,
        suite: 1,
    });
    await Acomodacao.create(    {
        nomeAcomadacao: 'Acomodação com garagem para solteiro(a)',
        camaCasal: 1,
        camaSolteiro: 0,
        climatizacao: true,
        garagem: 1, 
        suite: 1,
    });
    await Acomodacao.create({
        nomeAcomadacao: 'Acomodação simples para casal',
        camaCasal: 1,
        camaSolteiro: 0,
        climatizacao: true,
        garagem: 1,
        suite: 1
    });
    await Acomodacao.create({
        nomeAcomadacao: 'Acomodação para família com até duas crianças',
        camaCasal: 1,
        camaSolteiro: 2,
        climatizacao: true,
        garagem: 1,
        suite: 1
    });
    await Acomodacao.create(    {
        nomeAcomadacao: 'Acomodação para até duas familias, casal e três crianças cada',
        camaCasal: 2,
        camaSolteiro: 6,
        climatizacao: true,
        garagem: 2,
        suite: 3
    });
    await Acomodacao.create({
        nomeAcomadacao: 'Acomodação para família com até cinco crianças',
        camaCasal: 1,
        camaSolteiro: 5,
        climatizacao: true,
        garagem: 2,
        suite: 2
    });
  }

    console.log('Database synchronized');
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch((error) => {
    console.error('Error syncing the database:', error);
  });