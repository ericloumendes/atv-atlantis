import React, { useState, useEffect } from 'react';
import { Table, Card } from 'react-bootstrap';
import NavbarComponent from '../components/navbar';
import { fetchAcomodacoes } from '../services/acomodacoesService';
import Acomodacao from '../interfaces/acomodacoes';

const AcomodacoesPage: React.FC = () => {
    const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([]);

    // Fetch all acomodacoes when the component mounts
    useEffect(() => {
        const fetchedAcomodacoes = fetchAcomodacoes();
        setAcomodacoes(fetchedAcomodacoes);
    }, []);

    return (
        <div>
            <NavbarComponent />
            <div className="container mt-4">
                <h3>Acomodações</h3>
                <Card className="shadow-sm">
                    <Card.Body>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome Acomodação</th>
                                    <th>Camas Solteiro</th>
                                    <th>Camas Casal</th>
                                    <th>Suítes</th>
                                    <th>Climatização</th>
                                    <th>Garagem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {acomodacoes.map((acomodacao) => (
                                    <tr key={acomodacao.id}>
                                        <td>{acomodacao.id}</td>
                                        <td>{acomodacao.nomeAcomadacao}</td>
                                        <td>{acomodacao.camaSolteiro.toString()}</td>
                                        <td>{acomodacao.camaCasal.toString()}</td>
                                        <td>{acomodacao.suite.toString()}</td>
                                        <td>{acomodacao.climatizacao ? 'Sim' : 'Não'}</td>
                                        <td>{acomodacao.garagem.toString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default AcomodacoesPage;
