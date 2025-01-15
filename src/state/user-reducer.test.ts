import { userReducer } from './user-reducer';

test('user reducer should increment only age', () => {
  const startState = { age: 20, chldrenCount: 2, name: 'Andrii' };

  const endState = userReducer(startState, { type: 'INCREMENT-AGE' });

  expect(endState.age).toBe(21);
  expect(endState.chldrenCount).toBe(2);
});

test('user reducer should increment only chldrenCount', () => {
  const startState = { age: 20, chldrenCount: 2, name: 'Andrii' };

  const endState = userReducer(startState, {
    type: 'INCREMENT-CHILDREN-COUNT',
  });

  expect(endState.age).toBe(20);
  expect(endState.chldrenCount).toBe(3);
});

test('user reducer should change name of user', () => {
  const startState = { age: 20, chldrenCount: 2, name: 'Andrii' };
  const newName = 'Viktor';

  const endState = userReducer(startState, {
    type: 'CHANGE-NAME',
    newName: newName,
  });

  expect(endState.name).toBe(newName);
});
