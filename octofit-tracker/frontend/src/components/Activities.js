import React, { useEffect, useState } from 'react';
import { Table, Button, Card } from 'react-bootstrap';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Fetching Activities from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched Activities:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) return <div>Loading Activities...</div>;

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Activities</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, idx) => (
              <tr key={activity.id || idx}>
                <td>{activity.date || '-'}</td>
                <td>{activity.type || '-'}</td>
                <td>{activity.duration || '-'}</td>
                <td>{activity.calories || '-'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary">Add Activity</Button>
      </Card.Body>
    </Card>
  );
};

export default Activities;
