import React, { useEffect, useState } from 'react';
import { Table, Button, Card } from 'react-bootstrap';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Fetching Teams from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Fetched Teams:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) return <div>Loading Teams...</div>;

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Teams</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Members</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr key={team.id || idx}>
                <td>{team.name || '-'}</td>
                <td>{team.members || '-'}</td>
                <td>{team.points || '-'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary">Create Team</Button>
      </Card.Body>
    </Card>
  );
};

export default Teams;
