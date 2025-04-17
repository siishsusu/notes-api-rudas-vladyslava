import request from 'supertest';

const port = process.env.PORT || 3000;
const baseUrl = `http://localhost:${port}`;

describe('BONUS TASK:: create custom unit tests', () => {
  const uniqueTestValue = `test-${Date.now()}`;

  const notes: { [key: number]: string } = {};

  it('GET /notes - get all notes from db (plus notes contain titles and content)', async () => {
    const response = await request(baseUrl)
      .get('/notes')
      .expect(200);

    expect(Array.isArray(response.body.items)).toBeTruthy();
    expect(response.body.items[0]).toHaveProperty('title');
    expect(response.body.items[0]).toHaveProperty('content');
  });

  it('POST /notes - create 100 notes', async () => {
    for (let i = 1; i <= 100; i++) {
      const response = await request(baseUrl)
        .post('/notes')
        .send({ title: `${i}: Note ${uniqueTestValue}`, content: `${i}: Content ${uniqueTestValue}` })
        .expect(201);
      expect(response.body.title).toContain(`${i}: Note ${uniqueTestValue}`);
      expect(response.body.content).toContain(`${i}: Content ${uniqueTestValue}`);

      notes[i] = response.body.id;
    }
    expect(Object.keys(notes).length).toBeGreaterThanOrEqual(100);
  });

  it('GET /notes/:id - get notes by created ids', async () => {
    for (const note_key in notes) {
      const response = await request(baseUrl)
        .get(`/notes/${notes[note_key]}`)
        .expect(200);

      expect(response.body.id).toBe(notes[note_key]);
      expect(response.body.title).toContain(`${note_key}: Note`);
      expect(response.body.content).toContain(`${note_key}: Content`);
    }
  });

  it('UPDATE /notes/:id - update all notes by created ids', async () => {
    for (const note_key in notes) {
      const response = await request(baseUrl)
        .put(`/notes/${notes[note_key]}`)
        .send({ title: `${note_key} Updated title ${uniqueTestValue}`, content: `${note_key} Updated content ${uniqueTestValue}` })
        .expect(200);

      expect(response.body.id).toBe(notes[note_key]);
      expect(response.body.title).toContain(`${note_key} Updated title ${uniqueTestValue}`);
      expect(response.body.content).toContain(`${note_key} Updated content ${uniqueTestValue}`);
    }
  });

  it('DELETE /notes/:id - delete all notes by created ids', async () => {
    for (const note_key in notes) {
      const response = await request(baseUrl)
        .delete(`/notes/${notes[note_key]}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      await request(baseUrl).get(`/notes/${notes[note_key]}`).expect(404);
    }
  });

  it('UPDATE /notes/:id - update all deleted beforehand notes by created ids', async () => {
    for (const note_key in notes) {
      await request(baseUrl)
        .put(`/notes/${notes[note_key]}`)
        .expect(404);
    }
  });

  it('GET /notes/:id - get all deleted beforehand notes by created ids', async () => {
    for (const note_key in notes) {
      await request(baseUrl)
        .get(`/notes/${notes[note_key]}`)
        .expect(404);
    }
  });

  it('DELETE /notes/:id - delete all deleted beforehand notes by created ids', async () => {
    for (const note_key in notes) {
      await request(baseUrl)
        .delete(`/notes/${notes[note_key]}`)
        .expect(404);
    }
  });
});
