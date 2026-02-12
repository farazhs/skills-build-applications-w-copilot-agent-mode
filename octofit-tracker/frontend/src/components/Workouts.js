import React, { useEffect, useState } from 'react';
import { Table, Button, Card } from 'react-bootstrap';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Fetching Workouts from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Fetched Workouts:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) return <div>Loading Workouts...</div>;

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Workouts</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, idx) => (
              <tr key={workout.id || idx}>
                <td>{workout.name || '-'}</td>
                <td>{workout.type || '-'}</td>
                <td>{workout.duration || '-'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary">Add Workout</Button>
      </Card.Body>
    </Card>
  );
};

export default Workouts;
