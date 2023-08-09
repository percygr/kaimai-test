import request from 'supertest';
import { app, taskList } from '../../server/index'; 
//import { Server } from 'http';

describe('Task API', () => {
    //let server: Server; // To hold the Express server instance
    const lastAddedTaskId = taskList.getLastAddedTaskId();

    // beforeAll(() => {
    //   // Start the Express server before tests
    //   server = app.listen(3003);
    //   //console.log('### test server started at http://localhost:3003')
    // });
  
    // afterAll((done) => {
    //   // Close the server after tests
    //   server.close(done);
    //   //console.log('### test server closed')
    // });

  it(`should add task id ${lastAddedTaskId + 1}`, async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ title: 'Test Task' });
    
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(lastAddedTaskId + 1);
    expect(response.body.title).toBe('Test Task');
  });

  it(`should read tasks and check that id ${lastAddedTaskId + 1} exists`, async () => {
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    const taskExists = response.body.some((task: { id: number }) => task.id === lastAddedTaskId + 1);
    expect(taskExists).toBe(true);
  });

  it(`should delete task id ${lastAddedTaskId + 1}`, async () => {
    const deleteResponse = await request(app).delete(`/tasks/${lastAddedTaskId + 1}`);

    expect(deleteResponse.status).toBe(204);
  });

});
